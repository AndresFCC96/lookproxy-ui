<template>
    <div id="graphic-container" style="width: 100%; height: 400px"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as echarts from 'echarts';

const columns = ref()
const values = ref()

export default defineComponent({
    props: ['dataGraphic'],
	data () {
		return {
		}
	},
	name: "graphicLines",
	components: {
	},
	methods : {
	},
    mounted() {
        type EChartsOption = echarts.EChartsOption;

        var chartDom = document.getElementById('graphic-container')!;
        var myChart = echarts.init(chartDom);
        new ResizeObserver(() => myChart.resize()).observe(chartDom);
        var option: EChartsOption;

        option = {
        title: {
            text: 'Gráfico de Líneas'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: this.dataGraphic.dataLegend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
            saveAsImage: {
                title: "Guardar como imagen"
            }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dataGraphic.dataXaxis
        },
        yAxis: {
            type: 'value'
        },
        series: this.dataGraphic.dataSeries
        };

        option && myChart.setOption(option);
    }
});
</script>
