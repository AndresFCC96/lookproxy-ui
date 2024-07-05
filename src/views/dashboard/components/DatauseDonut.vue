<template>
    <div class="hello" ref="chartdiv"></div>
</template>
<script lang="js">
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";

export default {
    props : ['dataUse'],
    data () {
        return {
        }
    },
    name: 'DataUse',
    mounted() {
        let root = am5.Root.new(this.$refs.chartdiv);
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
            endAngle: 270
        })
        );

        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "category",
                endAngle: 270,
                centerX: am5.percent(-20),
            })
        );

        series.states.create("hidden", {
        endAngle: -90
        });
        // Disabling labels and ticks
        series.labels.template.set("visible", false);
        series.ticks.template.set("visible", false);

        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        series.data.setAll(this.dataUse);
        // Create legend
        // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
        let legend = chart.children.push(am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root.verticalLayout,
        height: am5.percent(100),
        verticalScrollbar: am5.Scrollbar.new(root, {
                orientation: "vertical"
            })
        }));
        legend.valueLabels.template.setAll({ textAlign: "right" })
        // set width and max width of labels
        legend.labels.template.setAll({ 
        maxWidth: 80,
        width: 80,
        oversizedBehavior: "wrap"
        });

        legend.data.setAll(series.dataItems);

        series.appear(1000, 100);
    }
}
</script>
<style scoped>
.hello {
    width: 100%;
    height: 300px;
}
</style>