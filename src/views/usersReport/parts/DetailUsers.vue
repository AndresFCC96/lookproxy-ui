<template>
    <hr>
    <div class="card">
        <div class="card-header bg-primary">
            <h3 class="card-title">Numero de usuarios por campo de usuario</h3>
        </div>
        <div class="card-body">
            <div>
                <div class="input-group">
                    <select class="form-select" aria-label="Select example" v-model="typeFilterUsers">
                        <optgroup label="Usuarios">
                            <option v-for="item in userOptions" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                        </optgroup>
                    </select>
                    <select class="form-select" aria-label="Select example" v-model="typeFilterFields">
                        <optgroup label="Campo de usuario">
                            <option v-for="item in fieldsOptions" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                        </optgroup>
                    </select>
                    <button class="btn btn-sm btn-primary float-right" v-on:click="graphicUsers">Generar consulta</button>
                </div>
            </div>
            <div class="hello" ref="chartdiv"></div>
        </div>
    </div>
</template>
<script lang="js">
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from "@amcharts/amcharts5/xy";
import {
    AnonymousUsers,
    userOptions,
    fieldsOptions,
    userByFaculty,
    userByProgram
} from "@/views/usersReport/_mock_/DataResources.js";

let root = false;

export default {
    data () {
        return {
            AnonymousUsers : AnonymousUsers,
            userOptions,
            fieldsOptions,
            typeFilterUsers : 0,
            typeFilterFields : 0,
            root
        }
    },
    name: 'DetailUsers',
    mounted() {
        root = am5.Root.new(this.$refs.chartdiv);
        this.graphicUsers()
    },
    beforeDestroy() {
        if (this.root) {
            this.root.dispose();
        }
    },
    methods : {
        graphicUsers() {
            // if (this.root) {
            //     this.root.dispose();
            // }
            root.dispose();
            root = am5.Root.new(this.$refs.chartdiv);
            let myTheme = am5.Theme.new(root);

            myTheme.rule("Grid", ["base"]).setAll({
                strokeOpacity: 0.1
            });


            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([
                am5themes_Animated.new(root),
                myTheme
            ]);


            // Create chart
            // https://www.amcharts.com/docs/v5/charts/xy-chart/
            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    wheelX: "none",
                    wheelY: "none",
                    paddingLeft: 0
                })
            );


            // Create axes
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            let yRenderer = am5xy.AxisRendererY.new(root, {
                minGridDistance: 30,
                minorGridEnabled: true
            });
            yRenderer.grid.template.set("location", 1);

            let yAxis = chart.yAxes.push(
                am5xy.CategoryAxis.new(root, {
                    maxDeviation: 0,
                    categoryField: "field",
                    renderer: yRenderer
                })
            );

            let xAxis = chart.xAxes.push(
                am5xy.ValueAxis.new(root, {
                    maxDeviation: 0,
                    min: 0,
                    renderer: am5xy.AxisRendererX.new(root, {
                    visible: true,
                    strokeOpacity: 0.1,
                    minGridDistance: 80
                    })
                })
            );


            // Create series
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
            let series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "Series 1",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueXField: "value",
                    sequencedInterpolation: true,
                    categoryYField: "field"
                })
            );

            let columnTemplate = series.columns.template;

            columnTemplate.setAll({
                draggable: true,
                cursorOverStyle: "pointer",
                tooltipText: "{valueX}",
                cornerRadiusBR: 10,
                cornerRadiusTR: 10,
                strokeOpacity: 0
            });
            columnTemplate.adapters.add("fill", (fill, target) => {
                return chart.get("colors").getIndex(series.columns.indexOf(target));
            });

            columnTemplate.adapters.add("stroke", (stroke, target) => {
                return chart.get("colors").getIndex(series.columns.indexOf(target));
            });

            columnTemplate.events.on("dragstop", () => {
                sortCategoryAxis();
            });

            // Get series item by category
            function getSeriesItem(category) {
                for (var i = 0; i < series.dataItems.length; i++) {
                    let dataItem = series.dataItems[i];
                    if (dataItem.get("categoryY") == category) {
                        return dataItem;
                    }
                }
            }


            // Axis sorting
            function sortCategoryAxis() {
            // Sort by value
            series.dataItems.sort(function (x, y) {
                return y.get("graphics").y() - x.get("graphics").y();
            });

            let easing = am5.ease.out(am5.ease.cubic);

            // Go through each axis item
            am5.array.each(yAxis.dataItems, function (dataItem) {
                // get corresponding series item
                let seriesDataItem = getSeriesItem(dataItem.get("category"));

                if (seriesDataItem) {
                    // get index of series data item
                    let index = series.dataItems.indexOf(seriesDataItem);

                    let column = seriesDataItem.get("graphics");

                    // position after sorting
                    let fy =
                        yRenderer.positionToCoordinate(yAxis.indexToPosition(index)) -
                        column.height() / 2;

                    // set index to be the same as series data item index
                    if (index != dataItem.get("index")) {
                        dataItem.set("index", index);

                        // current position
                        let x = column.x();
                        let y = column.y();

                        column.set("dy", -(fy - y));
                        column.set("dx", x);

                        column.animate({ key: "dy", to: 0, duration: 600, easing: easing });
                        column.animate({ key: "dx", to: 0, duration: 600, easing: easing });
                    } else {
                        column.animate({ key: "y", to: fy, duration: 600, easing: easing });
                        column.animate({ key: "x", to: 0, duration: 600, easing: easing });
                    }
                }
            });

            // Sort axis items by index.
            // This changes the order instantly, but as dx and dy is set and animated,
            // they keep in the same places and then animate to true positions.
            yAxis.dataItems.sort(function (x, y) {
                return x.get("index") - y.get("index");
            });
            }

            let data = [{}];
            if (this.typeFilterFields == 0) {
                data = userByFaculty;
            } else {
                data = userByProgram;
            }

            yAxis.data.setAll(data);
            series.data.setAll(data);

            series.appear(1000);
            chart.appear(1000, 100);
            chart.events.on("datavalidated", function(ev) {
                chart.svgContainer.htmlElement.style.height = "600px";
            })
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello {
        width: 100%;
        min-height: 500px;
    }
</style>