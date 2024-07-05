<template>
    <div class="hello" id="chartdiv">
    </div>
</template>
<script lang="ts">
import * as echarts from 'echarts';

export default {
    props : ['valueData'],
    data () {
        return {}
    },
    name: 'DataUse',
    mounted() {
        type EChartsOption = echarts.EChartsOption;

        var chartDom = document.getElementById('chartdiv')!;
        var myChart = echarts.init(chartDom);
        var option: EChartsOption;
        let percent = this.valueData/100
        let text = (this.valueData <= 25)
            ? 'Uso Bajo' : (this.valueData > 25 && this.valueData <= 75)
                ? 'Uso moderado' : 'Uso Alto'

        option = {
        series: [
            {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '75%'],
            radius: '100%',
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
                lineStyle: {
                width: 6,
                color: [
                    [0.25, '#FF6E76'],
                    [0.75, '#f2ca3a'],
                    [1, '#50cd89']
                ]
                }
            },
            pointer: {
                icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                length: '12%',
                width: 20,
                offsetCenter: [0, '-60%'],
                itemStyle: {
                color: 'auto'
                }
            },
            axisTick: {
                length: 12,
                lineStyle: {
                color: 'auto',
                width: 2
                }
            },
            splitLine: {
                length: 20,
                lineStyle: {
                color: 'auto',
                width: 5
                }
            },
            axisLabel: {
                color: '#464646',
                fontSize: 15,
                distance: -60,
                rotate: 'tangential',
                formatter: function (value: number) {
                    if (value === 0) {
                        return '0%';
                    } else if (value === 0.25) {
                        return '25%';
                    } else if (value === 0.5) {
                        return '50%';
                    } else if (value === 0.75) {
                        return '75%'
                    } else if (value === 1) {
                        return '100%'
                    }
                    return '';
                }
            },
            title: {
                offsetCenter: [0, '-10%'],
                fontSize: 20
            },
            detail: {
                fontSize: 30,
                offsetCenter: [0, '-35%'],
                valueAnimation: true,
                formatter: function (value: number) {
                return Math.round(value * 100) + '';
                },
                color: 'inherit'
            },
            data: [
                {
                value: Number(percent.toFixed(1)),
                name: text
                }
            ]
            }
        ]
        };

        option && myChart.setOption(option);
    }
}
</script>
<style scoped>
.hello {
    width: 100%;
    height: 300px;
}
</style>