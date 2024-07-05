<template>
    <v-chart class="chart" :option="options" autoresize />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, provide } from "vue"
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
TitleComponent,
TooltipComponent,
LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

use([
CanvasRenderer,
PieChart,
TitleComponent,
TooltipComponent,
LegendComponent,
]);

const options = ref();
export default defineComponent({
    data () {
        return {
            options: options
        }
    },
    name: "AttempSession",
    components: {
        VChart
    },
    props: {
        widgetClasses: String,
    },
    setup () {
        provide(THEME_KEY, 'light');
        options.value = {
            title: {
                text: 'Intentos de Login',
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            //     data: ['Exitosos', 'Fallidos'],
            // },
            series: [
                {
                name: 'Intentos de Login',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 76, name: 'Exitosos', color : 'ff0000' },
                    { value: 8, name: 'Fallidos' }
                ],
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
                },
            ],
            color : ['#50CD89', '#F1416C']
        }
    }
});
</script>

<style scoped>
.chart {
    height: 50vh;
}
</style>