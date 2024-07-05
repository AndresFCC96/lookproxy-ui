<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>
<script lang="js">
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5index from "@amcharts/amcharts5/index";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_colombiaLow from "@amcharts/amcharts5-geodata/colombiaLow";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

export default {
    props : ['typeMap', 'dataUse'],
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

        let chart = root.container.children.push(am5map.MapChart.new(root, {}));

        let polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
            geoJSON: (this.typeMap == 0) ? am5geodata_worldLow : am5geodata_colombiaLow,
            exclude: ["AQ"]
        })
        );

        let bubbleSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {
            valueField: "value",
            calculateAggregates: true,
            polygonIdField: "id"
        })
        );

        let circleTemplate = am5.Template.new({});

        bubbleSeries.bullets.push(function(root, series, dataItem) {
            let container = am5.Container.new(root, {});

            let circle = container.children.push(
                am5.Circle.new(root, {
                radius: 20,
                fillOpacity: 0.7,
                fill: am5.color(getColor()),
                cursorOverStyle: "pointer",
                tooltipText: `{name}: [bold]{value}[/]`
                }, circleTemplate)
            );

            let countryLabel = container.children.push(
                am5.Label.new(root, {
                text: "",
                paddingLeft: 5,
                populateText: true,
                fontWeight: "bold",
                fontSize: 13,
                centerY: am5.p50
                })
            );

            circle.on("radius", function(radius) {
                countryLabel.set("x", radius);
            })

            return am5.Bullet.new(root, {
                sprite: container,
                dynamic: true
            });
        });

        bubbleSeries.bullets.push(function(root, series, dataItem) {
            return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                text: "{value.formatNumber('#.')}",
                fill: am5.color(0xffffff),
                populateText: true,
                centerX: am5.p50,
                centerY: am5.p50,
                textAlign: "center"
                }),
                dynamic: true
            });
        });

        const getColor = () => {
            let simbolos = '0123456789ABCDEF'
            let color = "#"
            for(let i = 0; i < 6; i++){
                color += simbolos[Math.floor(Math.random() * 16)];
            }
            return color
        }


        // minValue and maxValue must be set for the animations to work
        bubbleSeries.set("heatRules", [
        {
            target: circleTemplate,
            dataField: "value",
            min: 10,
            max: 11,
            minValue: 0,
            maxValue: 100,
            key: "radius"
        }
        ]);

        bubbleSeries.data.setAll(this.dataUse);
        chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical" }));
        chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
    }
}
</script>
<style scoped>
.hello {
    width: 100%;
    height: 300px;
}
</style>