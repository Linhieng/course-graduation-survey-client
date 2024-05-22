<script setup lang="ts">
import { EChartsOption, EChartsType } from 'echarts';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
    echartData: Array<{ value: number; name: string }>;
}>();

const echartEl = ref();
const echartObj = ref<EChartsType | undefined>();

onMounted(() => {
    render();
});
onBeforeUnmount(() => {
    echartObj.value?.dispose();
});
async function render() {
    const echart = await import('echarts');
    const myChart = echart.init(echartEl.value);
    echartObj.value = myChart;
    const option: EChartsOption = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            left: 'right',
            top: 'middle',
            orient: 'vertical',
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                // 需要 echart 5.5
                // padAngle: 10,
                itemStyle: {
                    borderRadius: 10,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold',
                    },
                },
                labelLine: {
                    show: false,
                },
                data: props.echartData,
            },
        ],
    };

    option && myChart.setOption(option);
}
</script>

<template>
    <!-- <a-button @click="echartObj?.resize()">刷新</a-button> -->
    <div class="echart-box" ref="echartEl"></div>
</template>

<style>
.echart-box {
    width: 600px;
    height: 300px;
}
</style>
