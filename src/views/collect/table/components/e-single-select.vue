<script setup lang="ts">
import type { EChartsOption, EChartsType } from 'echarts';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';

const props = defineProps<{
    echartData: Array<{ value: number; name: string }>;
}>();

const echartEl = ref();
const echartBarEl = ref();
const echartObj = reactive<{
    pie: EChartsType | undefined;
    bar: EChartsType | undefined;
}>({
    pie: undefined,
    bar: undefined,
});
const echartType = ref<'pie' | 'bar'>('pie');

onMounted(() => {
    render();
});
onBeforeUnmount(() => {
    echartObj.pie?.dispose();
    echartObj.bar?.dispose();
});
async function render() {
    const echart = await import('echarts');
    const myChart = echart.init(echartEl.value);
    const barChart = echart.init(echartBarEl.value);
    echartObj.pie = myChart;
    echartObj.bar = barChart;
    const option: EChartsOption = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            left: 'right',
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: [20, 100],
                itemStyle: {
                    borderRadius: 4,
                },
                roseType: 'area',
                data: props.echartData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };

    const optionBar: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999',
                },
            },
        },
        toolbox: {
            feature: {
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        xAxis: {
            type: 'category',
            data: props.echartData.map((item) => item.name),
            axisPointer: {
                type: 'shadow',
            },
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                type: 'bar',
                data: props.echartData.map((item) => item.value),
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 个';
                    },
                },
            },
        ],
    };

    option && myChart.setOption(option);
    optionBar && barChart.setOption(optionBar);
}
</script>

<template>
    <!-- <a-button @click="echartObj?.resize()">刷新</a-button> -->
    <a-radio-group type="button" v-model="echartType">
        <a-radio value="pie">饼图</a-radio>
        <a-radio value="bar">柱状图</a-radio>
    </a-radio-group>
    <div v-show="echartType === 'pie'" class="echart-box" ref="echartEl"></div>
    <div v-show="echartType === 'bar'" class="echart-box" ref="echartBarEl"></div>
</template>

<style>
.echart-box {
    width: 600px;
    height: 300px;
}
</style>
