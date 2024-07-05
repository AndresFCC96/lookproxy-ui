<template>
    <div class="card">
        <div class="card-header bg-primary">
            <h3 class="card-title">Gráfico de burbujas de bases de datos</h3>
        </div>
        <div class="card-body">
            <div class="hello" id="graphic-databaseuse-container"></div>
        </div>
    </div>
</template>
<script lang="js">
import { defineComponent, onMounted, ref } from "vue"
import * as am5index from "@amcharts/amcharts5/index";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import ApiService from "@/core/services/ApiService";

const generateColor = () => {
    let simbolos = '0123456789ABCDEF'
    let color = "#"
    for(let i = 0; i < 6; i++){
		color += simbolos[Math.floor(Math.random() * 16)];
	}
    return color
}
const useDatabase = ref()

export default {
    props: ['selectedDate'],
    data () {
        return {
            useDatabase
        }
    },
    name: 'DatabaseUse',
    methods: {
        loadGraphic() {
            let root = am5.Root.new("graphic-databaseuse-container");
            root.setThemes([
                am5themes_Animated.new(root)
            ]);

            // Create chart
            // https://www.amcharts.com/docs/v5/charts/xy-chart/
            let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelY: "zoomXY",
            pinchZoomX:true,
            pinchZoomY:true
            }));

            // Create axes
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {}),
            tooltip: am5.Tooltip.new(root, {})
            }));

            xAxis.children.moveValue(am5.Label.new(root, {
            text: "Sesiones",
            x: am5.p50,
            centerX: am5.p50
            }), xAxis.children.length - 1);

            let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {
                inversed: false
            }),
            tooltip: am5.Tooltip.new(root, {})
            }));

            yAxis.children.moveValue(am5.Label.new(root, {
            rotation: -90,
            text: "Usuarios",
            y: am5.p50,
            centerX: am5.p50
            }), 0);


            // Create series
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
            let series = chart.series.push(am5xy.LineSeries.new(root, {
            calculateAggregates: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "y",
            valueXField: "x",
            valueField: "value",
            seriesTooltipTarget:"bullet",
            tooltip: am5.Tooltip.new(root, {
                pointerOrientation: "horizontal",
                labelText: "[bold]{title}[/]\nSesiones: {valueY}\nUsuarios: {valueX}\nConsultas: {value}"
            })
            }));

            series.strokes.template.set("visible", false);


            // Add bullet
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
            let circleTemplate = am5.Template.new({});
            circleTemplate.adapters.add("fill", function(fill, target) {
            let dataItem = target.dataItem;
            if (dataItem) {
                return am5.Color.fromString(dataItem.dataContext.color);
            }
            return fill
            });
            series.bullets.push(function() {
            let bulletCircle = am5.Circle.new(root, {
                radius: 5,
                fill: series.get("fill"),
                fillOpacity: 0.8
            }, circleTemplate);
            return am5.Bullet.new(root, {
                sprite: bulletCircle
            });
            });


            // Add heat rule
            // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
            series.set("heatRules", [{
            target: circleTemplate,
            min: 3,
            max: 60,
            dataField: "value",
            key: "radius"
            }]);

            // Set data
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
            // useDatabase.value = await getData()
            series.data.setAll(useDatabase.value);


            // Add cursor
            // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
            chart.set("cursor", am5xy.XYCursor.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            snapToSeries: [series]
            }));


            // Add scrollbars
            // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
            chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
            }));

            chart.set("scrollbarY", am5.Scrollbar.new(root, {
            orientation: "vertical"
            }));


            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear(1000);
            chart.appear(1000, 100);
        }
    },
    async mounted() {
        ApiService.setHeader()
        let payload = {
            "beginDate": this.selectedDate,
            "endDate": this.selectedDate,
            "schema": localStorage.schema,
            "table": localStorage.table
        }
        ApiService.post("api/dashboard/sessions-users-db", payload)
        .then(({ data }) => {
            let newObject = data.map( (elem) => {
                return {
                    "title" : elem.database,
                    "x" : elem.sessions,
                    "y" : elem.users,
                    "value" : elem.totalQueries,
                    "color": generateColor(),
                }
            })
            useDatabase.value = newObject
            this.loadGraphic()
        })
        .catch(({ response }) => {
            console.log(response)
        });
    }
}
</script>
<style scoped>
.hello {
    width: 100%;
    height: 450px;
}
</style>