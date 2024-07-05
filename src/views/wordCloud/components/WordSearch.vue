<template>
    <div class="card">
        <div class="card-body">
            <div>
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">Rango Temporal</span>
                    <select class="form-select" aria-label="Select example" v-model="filterTimeRange">
                        <option v-for="item in filterOptions" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                    </select>
                    <button class="btn btn-sm btn-primary float-right">Generar consulta</button>
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
import {wordSearchByMonth} from '@/views/wordCloud/_mock_/DataResources.js';

const filterOptions = [
    {label : "Hoy", value : 0},
    {label : "Esta Semana", value : 1},
    {label : "Mes Anterior", value : 2},
    {label : "Este Mes", value : 3},
    {label : "Trimestre Anterior", value : 4},
    {label : "Este Trimestre", value : 5},
    {label : "Semestre Anterior", value : 6},
    {label : "Este Semestre", value : 7},
    {label : "Este Año", value : 8},
]

export default {
    data () {
        return {
            wordSearchByMonth : wordSearchByMonth,
            filterOptions,
            filterTimeRange : 0
        }
    },
    name: 'WordSearch',
    mounted() {
        let root = am5.Root.new(this.$refs.chartdiv);
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let series = root.container.children.push(am5wc.WordCloud.new(root, {
            categoryField: "label",
            valueField: "value",
            maxFontSize: am5.percent(15),
            colors: am5.ColorSet.new(root, {})
        }));

        // Configure labels
        series.labels.template.setAll({
            fontFamily: "system-ui"
        });
        series.labels.template.set("tooltipText", "{category}: [bold]{value}[/]");

        // Data from:
        // https://insights.stackoverflow.com/survey/2021#section-most-popular-technologies-programming-scripting-and-markup-languages
        series.data.setAll(wordSearchByMonth);
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