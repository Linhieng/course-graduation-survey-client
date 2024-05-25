<script setup lang="ts">
import type { EChartsType } from 'echarts';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';

const props = defineProps<{
    echartData: string[];
}>();

const echartEl = ref();
const echartObj = reactive<{
    wordCloud: EChartsType | undefined;
}>({
    wordCloud: undefined,
});

onMounted(() => {
    render();
});
onBeforeUnmount(() => {
    echartObj.wordCloud?.dispose();
});

async function render() {
    const echart = await import('echarts');
    await import('echarts-wordcloud');
    const myChart = echart.init(echartEl.value);
    echartObj.wordCloud = myChart;

    const counts = new Map() as Map<string, number>;
    props.echartData.forEach((item) => {
        if (!isNaN(Number(item))) item += '.';
        counts.set(item, (counts.get(item) || 0) + 1);
    });

    let keywords = Array.from(counts).map(([name, value]) => ({ name, value }));
    keywords.sort((a, b) => b.value - a.value);
    keywords.reduce(
        (pre, cur) => {
            cur.value = pre.value + 0.02;
            return cur;
        },
        { value: 1 },
    );
    console.log(keywords);

    var option = {
        series: [
            {
                type: 'wordCloud',
                //maskImage: maskImage,
                sizeRange: [15, 80],
                rotationRange: [0, 0],
                rotationStep: 45,
                gridSize: 8,
                shape: 'pentagon',
                width: '100%',
                height: '100%',
                textStyle: {
                    normal: {
                        color: function () {
                            return (
                                'rgb(' +
                                [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                ].join(',') +
                                ')'
                            );
                        },
                        fontFamily: 'sans-serif',
                        fontWeight: 'normal',
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333',
                    },
                },
                data: keywords,
            },
        ],
    };

    option && myChart.setOption(option);
}
</script>
<template>
    <!-- <div class="wrap">
        <a-tag style="margin: 10px" size="large" v-for="val of echartData">{{ val }}</a-tag>
    </div> -->
    <div class="echart-box">
        <div class="echart-el" ref="echartEl"></div>
    </div>
</template>

<style scoped lang="less">
.wrap {
    width: 100%;
    background-color: #fff;
}
.echart-box {
    .echart-el {
        width: 300px;
        height: 300px;
    }
}
</style>
