<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>

<script lang="js">
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { detailGraphic } from "@/views/pages/_mock_/DataResources.js";


export default {
    data () {
        return {
            detailGraphic : detailGraphic,
        }
    },
    name: 'DetailGraphic',
    mounted() {
        let root = am5.Root.new(this.$refs.chartdiv);
        root.setThemes([
            am5themes_Animated.new(root)
        ]);
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panY",
            wheelY: "zoomY",
            pinchZoomY: true
        }));

        chart.get("colors").set("step", 3);


        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", true);


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let yRenderer = am5xy.AxisRendererY.new(root, {
            minGridDistance: 20
        });

        let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "category",
            renderer: yRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        yRenderer.labels.template.setAll({
            multiLocation: 0.5
        })

        yRenderer.grid.template.setAll({
            location: 1
        })

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererX.new(root, {
            strokeOpacity: 0.1
        })
        }));


        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        baseAxis: yAxis,
        valueXField: "close",
        openValueXField: "open",
        categoryYField: "category",
        tooltip: am5.Tooltip.new(root, {
            labelText: "Item Consultados: {openValueX} - Item Leidos: {valueX}"
        })
        }));

        series.columns.template.setAll({
            height: 0.5
        });

        series.bullets.push(function() {
        return am5.Bullet.new(root, {
            locationX: 0,
            sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
            })
        })
        })

        let nextColor = chart.get("colors").getIndex(1);

        series.bullets.push(function() {
        return am5.Bullet.new(root, {
            locationX: 1,
            sprite: am5.Circle.new(root, {
            radius: 5,
            fill: nextColor
            })
        })
        })

        // Set data
        let data = detailGraphic;
        let open = 100;
        let close = 120;

        yAxis.data.setAll(data);
        series.data.setAll(data);


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);
    },
    beforeDestroy() {
        // if (this.root) {
        //     this.root.dispose();
        // }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
width: 100%;
height: 500px;
}
</style>