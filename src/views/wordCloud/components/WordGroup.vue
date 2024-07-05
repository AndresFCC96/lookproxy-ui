<template>
    <div class="card">
        <div class="card-body">
            <div>
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">Rango Temporal</span>
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
import * as am5 from '@amcharts/amcharts5';
import * as am5wc from "@amcharts/amcharts5/wc";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import {wordGroupByBD} from '@/views/wordCloud/_mock_/DataResources.js';

export default {
    data () {
        return {
            wordGroupByBD : wordGroupByBD
        }
    },
    name: 'WordGroup',
    mounted() {
        let root = am5.Root.new(this.$refs.chartdiv);
        const myTheme = am5.Theme.new(root);

        myTheme.rule("RoundedRectangle", ["hierarchy", "node", "shape", "depth1"]).setAll({
        strokeWidth: 2
        });

        myTheme.rule("RoundedRectangle", ["hierarchy", "node", "shape", "depth2"]).setAll({
        fillOpacity: 0,
        strokeWidth: 1,
        strokeOpacity: 0.2
        });

        myTheme.rule("Label", ["node", "depth1"]).setAll({
        forceHidden: true
        });

        myTheme.rule("Label", ["node", "depth2"]).setAll({
        fontSize: 10
        });

        root.setThemes([
        am5themes_Animated.new(root),
        myTheme
        ]);

        // Create wrapper container
        let container = root.container.children.push(
        am5.Container.new(root, {
            width: am5.percent(100),
            height: am5.percent(100),
            layout: root.verticalLayout
        })
        );

        // Create series
        // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
        let series = container.children.push(
        am5hierarchy.Treemap.new(root, {
            sort: "descending",
            singleBranchOnly: false,
            downDepth: 1,
            upDepth: 0,
            initialDepth: 1,
            valueField: "value",
            categoryField: "name",
            childDataField: "children",
            nodePaddingOuter: 0,
            nodePaddingInner: 0
        })
        );

        series.get("colors").set("step", 1);


        container.children.moveValue(
        am5hierarchy.BreadcrumbBar.new(root, {
            series: series
        }), 0
        );


        // Generate and set data
        // https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
        let data = wordGroupByBD;

        function processData(data) {
        let treeData = [];

        let smallBrands = { name: "Other", children: [] };

        am5.object.eachOrdered(
            data,
            (brand) => {
            let brandData = { name: brand, children: [] };
            let brandTotal = 0;
            for (var model in data[brand]) {
                brandTotal += data[brand][model];
            }

            for (var model in data[brand]) {
                // do not add very small
                // if (data[brand][model] > 100) {
                    brandData.children.push({ name: model, value: data[brand][model] });
                // }
            }

            // only bigger brands
            // if (brandTotal > 200000) {
                treeData.push(brandData);
            // }
            },
            (a, b) => {
            let aval = 0;
            let bval = 0;
            am5.object.each(data[a], (key, val) => (aval += val));
            am5.object.each(data[b], (key, val) => (bval += val));
            if (aval > bval) return -1;
            if (aval < bval) return 1;
            return 0;
            }
        );

        return [{
            name: "Home",
            children: treeData
        }];
        }

        series.data.setAll(processData(data));
        series.set("selectedDataItem", series.dataItems[0]);

        series.bullets.push(function (root, series, dataItem) {
            let depth = dataItem.get("depth");
            //return am5.Bullet.new(root, { sprite: dataItem.dataContext.name });
        });
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