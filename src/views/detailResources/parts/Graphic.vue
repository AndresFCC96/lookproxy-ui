<template>
    <v-chart class="chart" :option="option" autoresize />
</template>

<script lang="js">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
TitleComponent,
TooltipComponent,
LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';
import { dataGraphic } from "@/views/pages/_mock_/DataResources.js";

use([
CanvasRenderer,
PieChart,
TitleComponent,
TooltipComponent,
LegendComponent,
]);

provide(THEME_KEY, 'light');

const option = ref({
tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)',
},
legend: {
    orient: 'vertical',
    left: 'left',
    data: dataGraphic,
},
series: [
    {
    name: 'Intentos de Login',
    type: 'pie',
    radius: '55%',
    center: ['50%', '60%'],
    data: dataGraphic,
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
});
export default {
    data () {
        return {
            option: option
        }
    },
    name: "GraphicResources",
    components: {
        //
    },
    props: {
        widgetClasses: String,
    }
};
</script>

<style scoped>
.chart {
    height: 50vh;
}
</style>