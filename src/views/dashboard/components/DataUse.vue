<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>
<script lang="js">
import { defineComponent, onMounted, ref } from "vue";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import {wordSearchByMonth} from '@/views/wordCloud/_mock_/DataResources';

export default {
    props : ["valueData"],
    data () {
        return {
            wordSearchByMonth : wordSearchByMonth,
        }
    },
    name: 'DataUse',
    methods: {
    },
    mounted() {
        let root = am5.Root.new(this.$refs.chartdiv);
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(am5radar.RadarChart.new(root, {
            panX: false,
            panY: false,
            startAngle: 180,
            endAngle: 360
        }));


        // Create axis and its renderer
        // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
        let axisRenderer = am5radar.AxisRendererCircular.new(root, {
            innerRadius: -40
        });

        axisRenderer.grid.template.setAll({
            stroke: root.interfaceColors.get("background"),
            visible: true,
            strokeOpacity: 0.8
        });

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0,
            min: 0,
            max: 100,
            strictMinMax: true,
            renderer: axisRenderer
        }));

        let axisDataItem = xAxis.makeDataItem({});

        let clockHand = am5radar.ClockHand.new(root, {
            pinRadius: am5.percent(15),
            radius: am5.percent(70),
            bottomWidth: 30
        })

        let bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
            sprite: clockHand
        }));

        xAxis.createAxisRange(axisDataItem);

        let label = chart.radarContainer.children.push(am5.Label.new(root, {
            fill: am5.color(0xffffff),
            centerX: am5.percent(50),
            textAlign: "center",
            centerY: am5.percent(50),
            fontSize: "1.6em"
        }));

        axisDataItem.set("value", this.valueData);
        bullet.get("sprite").on("rotation", function () {
            let value = axisDataItem.get("value");
            let text = Math.round(axisDataItem.get("value")).toString();
            let fill = am5.color(0x000000);
            xAxis.axisRanges.each(function (axisRange) {
                if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
                    fill = axisRange.get("axisFill").get("fill");
                }
            })

            label.set("text", Math.round(value).toString()+"%");

            clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
            clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
        });

        // setInterval(function () {
        //     axisDataItem.animate({
        //         key: "value",
        //         to: Math.round(Math.random() * 140 - 40),
        //         duration: 500,
        //         easing: am5.ease.out(am5.ease.cubic)
        //     });
        // }, 2000)

        chart.bulletsContainer.set("mask", undefined);


        // Create axis ranges bands
        // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
        let bandsData = [{
            title: "Bajo",
            color: "#f1416c",
            lowScore: 0,
            highScore: 20
            }, {
            title: "Moderado",
            color: "#f2ca3a",
            lowScore: 20,
            highScore: 80
            }, {
            title: "Elevado",
            color: "#50cd89",
            lowScore: 80,
            highScore: 100
            }
        ];

        am5.array.each(bandsData, function (data) {
            let axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));

            axisRange.setAll({
                value: data.lowScore,
                endValue: data.highScore
            });

            axisRange.get("axisFill").setAll({
                visible: true,
                fill: am5.color(data.color),
                fillOpacity: 0.8
            });

            axisRange.get("label").setAll({
                text: data.title,
                inside: true,
                radius: 10,
                fontSize: "1.6em",
                fill: root.interfaceColors.get("background")
            });
        });


        // Make stuff animate on load
        chart.appear(1000, 100);
    }
}
</script>
<style scoped>
.hello {
    width: 100%;
    height: 300px;
}
</style>