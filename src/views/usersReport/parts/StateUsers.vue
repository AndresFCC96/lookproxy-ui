<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>
<script lang="js">
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import {StateUsers} from '@/views/usersReport/_mock_/DataResources.js';

export default {
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

        let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
            endAngle: 270
        })
        );

        let series = chart.series.push(
        am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "title",
            endAngle: 270
        })
        );

        series.slices.template.setAll({
            templateField: "sliceSettings"
        });

        series.labels.template.setup = function(label, dataItem) {
        label.events.on("dataitemchanged", function(ev) {
            label.set("background", am5.RoundedRectangle.new(root, {
            fill: ev.target.dataItem.get("slice").get("fill")
            }));
        });
        }

        series.states.create("hidden", {
        endAngle: -90
        });

        series.data.setAll(StateUsers);
        let legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            layout: root.horizontalLayout
        }));

        legend.data.setAll(series.dataItems);
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