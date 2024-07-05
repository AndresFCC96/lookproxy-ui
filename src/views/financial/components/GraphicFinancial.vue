<template>
    <div class="card">
        <div class="card-body">
            <div class="hello" ref="chartdiv"></div>
        </div>
    </div>
</template>
<script lang="js">
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5index from "@amcharts/amcharts5/index";
import {StateUsers} from '@/views/usersReport/_mock_/DataResources.js';

export default {
    props : ["dataApi"],
    data () {
        return {
            StateUsers : StateUsers,
        }
    },
    name: 'StateUsers',
    mounted() {
        let root = am5.Root.new(this.$refs.chartdiv);
        root.setThemes([
            am5themes_Animated.new(root)
        ]);
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
            arrangeTooltips: false,
            paddingLeft: 0,
            paddingRight: 10
        })
        );

        // Use only absolute numbers
        chart.getNumberFormatter().set("numberFormat", "#.#s");

        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        let legend = chart.children.push(
        am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
        })
        );

        // Data
        let data = this.dataApi

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "title",
            renderer: am5xy.AxisRendererY.new(root, {
            inversed: true,
            cellStartLocation: 0.1,
            cellEndLocation: 0.9,
            minorGridEnabled: true,
            minGridDistance: 20
            })
        })
        );

        yAxis.data.setAll(data);

        let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 60,
            strokeOpacity: 0.1
            })
        })
        );

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function createSeries(field, labelCenterX, pointerOrientation, rangeValue) {
        let series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: field,
            categoryYField: "title",
            sequencedInterpolation: true,
            clustered: false,
            tooltip: am5.Tooltip.new(root, {
                pointerOrientation: pointerOrientation,
                labelText: "{categoryY}: $ {valueX}"
            })
            })
        );

        series.columns.template.setAll({
            height: am5.p100,
            strokeOpacity: 0,
            fillOpacity: 0.8
        });

        series.bullets.push(function() {
            return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
                centerY: am5.p50,
                text: "{valueX}",
                populateText: true,
                centerX: labelCenterX
            })
            });
        });

        series.data.setAll(data);
        series.appear();

        let rangeDataItem = xAxis.makeDataItem({
            value: rangeValue
        });
        xAxis.createAxisRange(rangeDataItem);
        rangeDataItem.get("grid").setAll({
            strokeOpacity: 1,
            stroke: series.get("stroke")
        });

        let label = rangeDataItem.get("label");
        function setLabel(field) {
            return (field == "PRICEPERUSER") ? "Precio por usuario" : "Precio por sesión"
        }
        label.setAll({
            text: setLabel(field.toUpperCase()),
            fontSize: "1.5em",
            fill: series.get("red"),
            paddingTop: -18,
            isMeasured: false,
            centerX: labelCenterX
        });
        label.adapters.add("dy", function() {
            return -chart.plotContainer.height();
        });

        return series;
        }

        createSeries("pricePerSessionGraphic", am5.p100, "right", 0);
        createSeries("pricePerUser", 0, "left", 0);

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
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
    width: 100%;
    height: 600px;
}
</style>