<template>
    <div class="hello" id="graphic-area-container"></div>
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
	name: "graphicArea",
	components: {
	},
	methods : {
	},
    mounted() {
        /* Chart code */
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("graphic-area-container");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
        am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0
        }));


        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
        }));
        cursor.lineY.set("visible", false);

        // The data
        let data = this.dataGraphic.dataValues

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "grouper",
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
            // minorGridEnabled: true,
            minGridDistance: 1,
        }),
        tooltip: am5.Tooltip.new(root, {})
        }));

        xAxis.data.setAll(data);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
            pan: "zoom",
            minGridDistance: 50
        })
        }));

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

        function createSeries(name, field) {
        let series = chart.series.push(am5xy.LineSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            stacked: true,
            valueYField: field,
            categoryXField: "grouper",
            tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{categoryX}[/]\n{name}: {valueY}"
            })
        }));

        series.fills.template.setAll({
            fillOpacity: 0.5,
            visible: true
        });

        series.data.setAll(data);
        series.appear(1000);
        }

        this.dataGraphic.dataSeries.forEach(element => {
            createSeries(element.title, element.data);
        });

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
        }));

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
    }
});
</script>
<style scoped>
.hello {
    width: 100%;
    min-height: 450px;
}
</style>
