<script setup lang="ts">
import type { EChartsType } from 'echarts';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
// @ts-ignore
import { Segment, useDefault } from 'segmentit';

const showType = ref<'cloud' | 'raw'>('cloud');
const segmentit = useDefault(new Segment());

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

    const result = segmentit.doSegment(props.echartData.join(' ')).map((item: { w: string }) => {
        const res = item.w.replace(/[`（），。？！；：、“”‘’【】[~!@#$%^&*()-=+{\]}\\|;:'",.<>\/?]/g, ' ');
        return res;
    }) as string[];
    const counts = new Map() as Map<string, number>;
    result.forEach((item) => {
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
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    // Color can be a callback function or a color string
                    color: function () {
                        // Random color
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
                },
                emphasis: {
                    focus: 'self',

                    textStyle: {
                        textShadowBlur: 3,
                        textShadowColor: '#333',
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
    <div>
        <a-radio-group class="margin-t margin-b" type="button" v-model="showType">
            <a-radio value="cloud">词云</a-radio>
            <a-radio value="raw">所有数据</a-radio>
        </a-radio-group>
        <div class="wrap" v-show="showType === 'raw'">
            <a-tag style="margin: 10px" size="large" v-for="val of echartData">{{ val }}</a-tag>
        </div>
        <div class="echart-box" v-show="showType === 'cloud'">
            <div class="echart-el" ref="echartEl"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    width: 100%;
    background-color: #fff;
}
.margin-t {
    margin-top: 10px;
}
.margin-b {
    margin-bottom: 10px;
}
.echart-box {
    padding-left: 200px;
    .echart-el {
        width: 300px;
        height: 300px;
    }
}
</style>
