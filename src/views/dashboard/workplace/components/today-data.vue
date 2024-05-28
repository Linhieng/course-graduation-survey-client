<template>
    <a-spin :loading="stat.state.isFetching" style="width: 100%">
        <a-card class="general-card" :title="$t('今天数据统计')">
            <Chart height="122px" :option="chartOption" />
        </a-card>
    </a-spin>
</template>

<script lang="ts" setup>
import useChartOption from '@/hooks/chart-option';
import useStatStore from '@/store/modules/stat';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const stat = useStatStore();
const { chartOption } = useChartOption((isDark) => {
    return {
        grid: {
            left: 50,
            right: 20,
            top: 0,
            bottom: 20,
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                show: true,
                formatter(value: number, idx: number) {
                    if (idx === 0) return String(value);
                    return value;
                },
            },
            splitLine: {
                lineStyle: {
                    color: isDark ? '#484849' : '#E5E8EF',
                },
            },
        },
        yAxis: {
            type: 'category',
            data: [t('创建量'), t('发布量'), t('收集量')],
            axisLabel: {
                show: true,
                color: '#4E5969',
            },
            axisTick: {
                show: true,
                length: 2,
                lineStyle: {
                    color: '#A9AEB8',
                },
                alignWithLabel: true,
            },
            axisLine: {
                lineStyle: {
                    color: isDark ? '#484849' : '#A9AEB8',
                },
            },
        },
        tooltip: {
            show: true,
            trigger: 'axis',
        },
        series: [
            {
                data: [
                    useStatStore().state.statCount.today_count_create_survey,
                    useStatStore().state.statCount.today_count_publish_survey,
                    useStatStore().state.statCount.today_count_answer_survey,
                ],
                type: 'bar',
                barWidth: 7,
                itemStyle: {
                    color: '#4086FF',
                    borderRadius: 4,
                },
            },
        ],
    };
});
</script>
