<template>
    <div class="hello" id="graphic-bar-container"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as am5 from '@amcharts/amcharts5';
import * as am5index from "@amcharts/amcharts5/index";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default defineComponent({
    props: ['dataGraphic'],
	data () {
		return {
		}
	},
	name: "graphicBar",
	components: {
	},
	methods : {
	},
    mounted() {
        /* Chart code */
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("graphic-bar-container");

       // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
        am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft:0,
        layout: root.verticalLayout
        }));


        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        // let legend = chart.children.push(am5.Legend.new(root, {
        // centerX: am5.p50,
        // x: am5.p50
        // }))

        // Data
        let data = this.dataGraphic.dataValues

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "grouper",
        renderer: am5xy.AxisRendererY.new(root, {
            inversed: true,
            cellStartLocation: 0.1,
            cellEndLocation: 0.9,
            minGridDistance: 1
            // minorGridEnabled: true
        })
        }));

        yAxis.data.setAll(data);

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
            strokeOpacity: 0.1,
            minGridDistance: 50
        }),
        min: 0
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function createSeries(name, field) {
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: field,
            categoryYField: "grouper",
            sequencedInterpolation: true,
            tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{categoryY}[/]\n{name}: {valueX}"
            })
        }));

        series.columns.template.setAll({
            height: am5.p100,
            strokeOpacity: 0
        });


        series.bullets.push(function () {
            return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
                centerY: am5.p50,
                text: "{valueX}",
                populateText: true
            })
            });
        });

        series.bullets.push(function () {
            return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
                centerX: am5.p100,
                centerY: am5.p50,
                text: "{name}",
                fill: am5.color(0xffffff),
                populateText: true
            })
            });
        });

        series.data.setAll(data);
        series.appear();

        return series;
        }

        this.dataGraphic.dataSeries.forEach(element => {
            createSeries(element.title, element.data);
        });

        // createSeries("income", "Income");
        // createSeries("expenses", "Expenses");


        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p100
        }));

        legend.data.setAll(chart.series.values);


        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomY"
        }));
        cursor.lineY.set("forceHidden", true);
        cursor.lineX.set("forceHidden", true);


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
    }
});
</script>
<style scoped>
.hello {
    width: 100%;
    min-height: 650px;
}
</style>
