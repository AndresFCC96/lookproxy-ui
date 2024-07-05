<template>
    <div class="card">
        <div class="card-header bg-primary">
            <h3 class="card-title">Sesiones y usuarios por Base de Datos</h3>
        </div>
        <div class="card-body">
            <div class="hello" id="chartdiv"></div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5index from "@amcharts/amcharts5/index";

export default {
    props : ['databaseUse'],
    data () {
        return {}
    },
    name: 'DatabaseBySessionUser',
    async mounted() {
        let root = am5.Root.new("chartdiv");
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
            paddingLeft: 0,
            layout: root.verticalLayout
        })
        );

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        chart.set(
        "scrollbarX",
        am5.Scrollbar.new(root, {
            orientation: "horizontal"
        })
        );

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xRenderer = am5xy.AxisRendererX.new(root, {
            // minorGridEnabled: true,
            minGridDistance: 60
        });
        let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "title",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        })
        );
        xRenderer.grid.template.setAll({
        location: 1
        })

        xAxis.data.setAll(this.databaseUse);

        let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            min: 0,
            extraMax: 0.1,
            renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
            })
        })
        );

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

        let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
            name: "Sesiones",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "sessions",
            categoryXField: "title",
            tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{name}: {valueY}"
            })
        })
        );

        series1.columns.template.setAll({
        tooltipY: am5.percent(10),
        templateField: "columnSettings"
        });

        series1.data.setAll(this.databaseUse);

        let series2 = chart.series.push(
        am5xy.LineSeries.new(root, {
            name: "Usuarios",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "users",
            categoryXField: "title",
            tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{name}: {valueY}"
            })
        })
        );

        series2.strokes.template.setAll({
        strokeWidth: 3,
        templateField: "strokeSettings"
        });

        series2.data.setAll(this.databaseUse);

        series2.bullets.push(function () {
        return am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
            strokeWidth: 3,
            stroke: series2.get("stroke"),
            radius: 5,
            fill: root.interfaceColors.get("background")
            })
        });
        });

        // let series3 = chart.series.push(
        // am5xy.LineSeries.new(root, {
        //     name: "Consultas",
        //     xAxis: xAxis,
        //     yAxis: yAxis,
        //     valueYField: "queries",
        //     categoryXField: "title",
        //     tooltip: am5.Tooltip.new(root, {
        //     pointerOrientation: "horizontal",
        //     labelText: "{name}: {valueY} {info}"
        //     })
        // })
        // );

        // series3.strokes.template.setAll({
        // strokeWidth: 3,
        // templateField: "strokeSettings"
        // });

        // series3.data.setAll(this.databaseUse);

        // series3.bullets.push(function () {
        // return am5.Bullet.new(root, {
        //     sprite: am5.Circle.new(root, {
        //     strokeWidth: 3,
        //     stroke: series3.get("stroke"),
        //     radius: 5,
        //     fill: root.interfaceColors.get("background")
        //     })
        // });
        // });

        chart.set("cursor", am5xy.XYCursor.new(root, {}));

        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        let legend = chart.children.push(
        am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
        })
        );
        legend.data.setAll(chart.series.values);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
        series1.appear();

    }
}
</script>
<style scoped>
.hello {
    width: 100%;
    height: 400px;
}
</style>