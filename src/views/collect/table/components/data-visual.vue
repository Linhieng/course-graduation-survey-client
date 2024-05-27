<template>
    <div class="wrap">
        <p style="font-size: 1.3rem">数据分析：</p>
        <div class="base-visual">
            <div class="base-visual-item">
                <p>浏览器类型分布</p>
                <Chart height="200px" width="300px" :option="chartOption1" />
            </div>
            <div class="base-visual-item">
                <p>操作系统分布</p>
                <Chart height="200px" width="300px" :option="chartOption2" />
            </div>
            <div class="base-visual-item">
                <p>有效率分布</p>
                <Chart height="200px" width="300px" :option="chartOption3" />
            </div>
        </div>
        <div></div>
    </div>
</template>

<script setup lang="ts">
import useChartOption from '@/hooks/chart-option';
import { useCollectStore } from '@/store';
import { computed } from 'vue';
const collectStore = useCollectStore();
const browserCount = computed(() => {
    const res = [0, 0, 0, 0];
    collectStore.state.cur.answerList.forEach((item) => {
        res[item.user_browser_flag]++;
    });
    return res;
});
const osCount = computed(() => {
    const res = [0, 0, 0, 0, 0];
    collectStore.state.cur.answerList.forEach((item) => {
        res[item.user_os_flag]++;
    });
    return res;
});
const validCount = computed(() => {
    const res = [0, 0];
    collectStore.state.cur.answerList.forEach((item) => {
        res[item.is_valid]++;
    });
    return res;
});

const { chartOption: chartOption1 } = useChartOption((isDark) => {
    // echarts support https://echarts.apache.org/zh/theme-builder.html
    // It's not used here
    return {
        legend: {
            orient: 'vertical',
            left: 'right',
            data: ['Edge', '谷歌', '火狐', '其他'],
            icon: 'circle',
            itemWidth: 8,
            textStyle: {
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
            },
            itemStyle: {
                borderWidth: 0,
            },
        },
        tooltip: {
            show: true,
            trigger: 'item',
        },
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: '47%',
                    style: {
                        text: '浏览器类型',
                        textAlign: 'center',
                        fill: isDark ? '#ffffffb3' : '#4E5969',
                        fontSize: 14,
                    },
                },
            ],
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '80%'],
                center: ['50%', '50%'],
                label: {
                    formatter: '{d}%',
                    fontSize: 14,
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
                },
                itemStyle: {
                    borderColor: isDark ? '#232324' : '#fff',
                    borderWidth: 1,
                },
                data: [
                    {
                        value: [browserCount.value[0]],
                        name: 'Edge',
                        itemStyle: {
                            color: isDark ? '#3B8D4E' : '#2196F3',
                        },
                    },
                    {
                        value: [browserCount.value[1]],
                        name: '谷歌',
                        itemStyle: {
                            color: isDark ? '#A079DC' : '#4CAF50',
                        },
                    },
                    {
                        value: [browserCount.value[2]],
                        name: '火狐',
                        itemStyle: {
                            color: isDark ? '#666666' : '#FFC107',
                        },
                    },
                    {
                        value: [browserCount.value[3]],
                        name: '其他',
                        itemStyle: {
                            color: isDark ? '#4D4D4D' : '#FF5722',
                        },
                    },
                ],
            },
        ],
    };
});
const { chartOption: chartOption2 } = useChartOption((isDark) => {
    // echarts support https://echarts.apache.org/zh/theme-builder.html
    // It's not used here
    return {
        legend: {
            orient: 'vertical',
            left: 'right',
            data: ['Windows', 'Android', '苹果', 'linux', '其他'],
            icon: 'circle',
            itemWidth: 8,
            textStyle: {
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
            },
            itemStyle: {
                borderWidth: 0,
            },
        },
        tooltip: {
            show: true,
            trigger: 'item',
        },
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: '47%',
                    style: {
                        text: '系统类型',
                        textAlign: 'center',
                        fill: isDark ? '#ffffffb3' : '#4E5969',
                        fontSize: 14,
                    },
                },
            ],
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '80%'],
                center: ['50%', '50%'],
                label: {
                    formatter: '{d}%',
                    fontSize: 14,
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
                },
                itemStyle: {
                    borderColor: isDark ? '#232324' : '#fff',
                    borderWidth: 1,
                },
                data: [
                    {
                        value: [osCount.value[0]],
                        name: 'Windows',
                        itemStyle: {
                            color: isDark ? '#3B8D4E' : '#9C27B0',
                        },
                    },
                    {
                        value: [osCount.value[1]],
                        name: 'Android',
                        itemStyle: {
                            color: isDark ? '#A079DC' : '#E91E63',
                        },
                    },
                    {
                        value: [osCount.value[2]],
                        name: '苹果',
                        itemStyle: {
                            color: isDark ? '#666666' : '#00BCD4',
                        },
                    },
                    {
                        value: [osCount.value[3]],
                        name: 'linux',
                        itemStyle: {
                            color: isDark ? '#4D4D4D' : '#009688',
                        },
                    },
                    {
                        value: [osCount.value[4]],
                        name: '其他',
                        itemStyle: {
                            color: isDark ? '#4D4D4D' : '#009688',
                        },
                    },
                ],
            },
        ],
    };
});
const { chartOption: chartOption3 } = useChartOption((isDark) => {
    // echarts support https://echarts.apache.org/zh/theme-builder.html
    // It's not used here
    return {
        legend: {
            orient: 'vertical',
            left: 'right',
            data: ['有效', '无效'],
            icon: 'circle',
            itemWidth: 8,
            textStyle: {
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
            },
            itemStyle: {
                borderWidth: 0,
            },
        },
        tooltip: {
            show: true,
            trigger: 'item',
        },
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: '47%',
                    style: {
                        text: '是否有效',
                        textAlign: 'center',
                        fill: isDark ? '#ffffffb3' : '#4E5969',
                        fontSize: 14,
                    },
                },
            ],
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '80%'],
                center: ['50%', '50%'],
                label: {
                    formatter: '{d}%',
                    fontSize: 14,
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
                },
                itemStyle: {
                    borderColor: isDark ? '#232324' : '#fff',
                    borderWidth: 1,
                },
                data: [
                    {
                        value: [validCount.value[0]],
                        name: '无效',
                        itemStyle: {
                            color: isDark ? '#3B8D4E' : '#AB47BC',
                        },
                    },
                    {
                        value: [validCount.value[1]],
                        name: '有效',
                        itemStyle: {
                            color: isDark ? '#A079DC' : '#CDDC39',
                        },
                    },
                ],
            },
        ],
    };
});
</script>

<style scope lang="scss">
.wrap {
    padding: 20px;
}
.base-visual {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    &-item {
        flex: 1 0 auto;
        margin: 20px;
        background-color: white;
        border-radius: 4px;
        padding: 0 10px 30px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
