<template>
    <a-spin :loading="loading" style="width: 100%">
        <a-card
            class="general-card"
            :header-style="{ paddingBottom: 0 }"
            :body-style="{
                paddingTop: '20px',
            }"
            :title="$t('workplace.contentData')"
        >
            <Chart height="289px" :option="chartOption" />
        </a-card>
    </a-spin>
</template>

<script lang="ts" setup>
import { type LineSeriesOption } from 'echarts';
import useLoading from '@/hooks/loading';
import { type ToolTipFormatterParams } from '@/types/echarts';
import useChartOption from '@/hooks/chart-option';
import { useStatStore } from '@/store';
import { computed } from 'vue';
import dayjs from 'dayjs';

const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
        .map(
            (el) => `
            <div class="content-panel">
                <p>
                    <span style="background-color: ${el.color}" class="tooltip-item-icon"></span>
                    <span>${el.seriesName}</span>
                </p>
                <span class="tooltip-value">${el.value && el.value.toLocaleString()}</span>
            </div>`,
        )
        .reverse()
        .join('');
};

const generateSeries = (name: string, lineColor: string, itemBorderColor: string, data: number[]): LineSeriesOption => {
    return {
        name,
        data,
        stack: 'Total',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
            color: lineColor,
        },
        emphasis: {
            focus: 'series',
            itemStyle: {
                color: lineColor,
                borderWidth: 2,
                borderColor: itemBorderColor,
            },
        },
        lineStyle: {
            width: 2,
            color: lineColor,
        },
        showSymbol: false,
        areaStyle: {
            opacity: 0.1,
            color: lineColor,
        },
    };
};
const { loading, setLoading } = useLoading(true);
const stat = useStatStore();
const xAxis = computed(() => stat.state.statGroupByDay.xAxis);
// @ts-ignore
const { chartOption } = useChartOption((dark) => {
    return {
        grid: {
            left: '2.6%',
            right: '2.6%',
            top: '10',
            bottom: '30',
        },
        xAxis: {
            type: 'category',
            offset: 2,
            data: xAxis.value,
            boundaryGap: false,
            axisLabel: {
                color: '#4E5969',
                formatter(date_str: string, idx: number) {
                    const d = dayjs(date_str);
                    if (idx === 0 || idx === xAxis.value.length - 1) {
                        return d.format('MM-DD');
                    } else {
                        return d.format('YYYY-MM-DD');
                    }
                },
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                interval: (idx: number) => {
                    if (idx === 0) return false;
                    if (idx === xAxis.value.length - 1) return false;
                    return true;
                },
                lineStyle: {
                    color: '#E5E8EF',
                },
            },
            axisPointer: {
                show: true,
                lineStyle: {
                    color: '#23ADFF',
                    width: 2,
                },
            },
        },
        yAxis: {
            // 不显示数值，因为不准确。
            axisLabel: { show: false },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#E5E8EF',
                },
            },
        },
        tooltip: {
            trigger: 'axis',
            formatter(params) {
                const [firstElement] = params as ToolTipFormatterParams[];
                return `
                <div>
                    <p class="tooltip-title">${new Date(firstElement.axisValueLabel).toLocaleDateString()}</p>
                    ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
                </div>`;
            },
            className: 'echarts-tooltip-diy',
        },
        graphic: {
            elements: [],
        },
        series: [
            generateSeries('创建问卷的数量', '#F77234', '#FFE4BA', useStatStore().state.statGroupByDay.data[0].value),
            generateSeries('发布问卷的数量', '#33D1C9', '#E8FFFB', useStatStore().state.statGroupByDay.data[1].value),
            generateSeries('问卷草稿的数量', '#37bdff', '#37bdff', useStatStore().state.statGroupByDay.data[2].value),
            generateSeries('停止收集的数量', '#df78fe', '#df78fe', useStatStore().state.statGroupByDay.data[3].value),
            generateSeries('删除问卷的数量', '#3469FF', '#3469FF', useStatStore().state.statGroupByDay.data[4].value),
        ],
    };
});
const fetchData = async () => {
    setLoading(true);
    try {
        await useStatStore().fetchGroupByDay();
    } finally {
        setLoading(false);
    }
};
fetchData();
</script>
<style scoped lang="scss"></style>
