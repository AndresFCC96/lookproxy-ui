<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>
<script lang="js">
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from "@amcharts/amcharts5/xy";
import {StateUsers} from '@/views/usersReport/_mock_/DataResources.js';
import {AnonymousUsers} from '@/views/usersReport/_mock_/DataResources.js';

export default {
    data () {
        return {
            AnonymousUsers : AnonymousUsers,
        }
    },
    name: 'AnonymousUsers',
    mounted() {
        // let root = am5.Root.new("chartdiv");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        // root.setThemes([
        // am5themes_Animated.new(root)
        // ]);

        let root = am5.Root.new(this.$refs.chartdiv);
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
        paddingLeft:0,
        paddingRight:1
        }));

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xRenderer = am5xy.AxisRendererX.new(root, { 
        minGridDistance: 30, 
        minorGridEnabled: true
        });

        xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
        });

        xRenderer.grid.template.setAll({
        location: 1
        })

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "month",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
        }));

        let yRenderer = am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1
        })

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: yRenderer
        }));

        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "month",
        tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}"
        })
        }));

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        xAxis.data.setAll(AnonymousUsers);
        series.data.setAll(AnonymousUsers);


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);
    },
    beforeDestroy() {
        if (this.root) {
            this.root.dispose();
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
    width: 100%;
    height: 400px;
}
</style>