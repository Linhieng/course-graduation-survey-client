<template>
    <a-spin :loading="loading" style="width: 100%">
        <a-card class="general-card" :title="$t('multiDAnalysis.card.title.dataOverview')">
            <CountNum />
            <Chart style="height: 328px; margin-top: 20px" :option="chartOption" />
        </a-card>
    </a-spin>
</template>

<script lang="ts" setup>
import { LineSeriesOption } from 'echarts';
import useLoading from '@/hooks/loading';
import { ToolTipFormatterParams } from '@/types/echarts';
import useChartOption from '@/hooks/chart-option';
import CountNum from './count-num.vue';
import { useStatStore } from '@/store';

const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
        .map(
            (el) => `
            <div class="content-panel">
                <p>
                    <span style="background-color: ${el.color}" class="tooltip-item-icon"></span>
                    <span>${el.seriesName}</span>
                </p>
                <span class="tooltip-value">${el.value.toLocaleString()}</span>
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

// @ts-ignore
const { chartOption } = useChartOption((dark) => {
    return {
        grid: {
            left: '30',
            right: '30',
            top: '30',
            bottom: '30',
        },
        xAxis: {
            type: 'category',
            offset: 2,
            data: useStatStore().state.statGroupByDay.xAxis,
            boundaryGap: false,
            axisLabel: {
                color: '#4E5969',
                formatter(date_str: string, idx: number) {
                    const d = new Date(date_str);
                    return `${d.getMonth() + 1}-${d.getDate()}`;
                },
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
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
            type: 'value',
            axisLine: {
                show: false,
            },
            axisLabel: {
                formatter(value: number, idx: number) {
                    return idx;
                },
            },
            splitLine: {
                lineStyle: {
                    color: dark ? '#2E2E30' : '#F2F3F5',
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
            generateSeries('问卷草稿的数量', '#3469FF', '#E8F3FF', useStatStore().state.statGroupByDay.data[2].value),
            generateSeries('停止收集的数量', '#3469FF', '#E8F3FF', useStatStore().state.statGroupByDay.data[3].value),
            generateSeries('删除问卷的数量', '#3469FF', '#E8F3FF', useStatStore().state.statGroupByDay.data[4].value),
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

<style scoped lang="less">
:deep(.arco-statistic) {
    .arco-statistic-title {
        color: rgb(var(--gray-10));
        font-weight: bold;
    }
    .arco-statistic-value {
        display: flex;
        align-items: center;
    }
}
.statistic-prefix {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    color: var(--color-white);
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    vertical-align: middle;
    border-radius: 6px;
}
</style>
