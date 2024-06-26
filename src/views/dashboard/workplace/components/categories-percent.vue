<template>
    <a-spin :loading="loading" style="width: 100%">
        <a-card
            class="general-card"
            :header-style="{ paddingBottom: '0' }"
            :body-style="{
                padding: '20px',
            }"
        >
            <template #title>
                {{ $t('问卷统计') }}
            </template>
            <Chart height="310px" :option="chartOption" />
        </a-card>
    </a-spin>
</template>

<script lang="ts" setup>
import useLoading from '@/hooks/loading';
import useChartOption from '@/hooks/chart-option';
import { ref } from 'vue';
import { getSurveyClassifyBase } from '@/api/stat';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const surveyCountBase = ref({
    draft_count: 0,
    invalid_count: 0,
    valid_count: 0,
    deleted_count: 0,
    total_count: 0,
});

const { loading } = useLoading();
const { chartOption } = useChartOption((isDark) => {
    // echarts support https://echarts.apache.org/zh/theme-builder.html
    // It's not used here
    return {
        legend: {
            left: 'center',
            data: [t('问卷草稿'), t('发布中'), t('已停止'), t('已删除')],
            bottom: 0,
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
                    top: '40%',
                    style: {
                        text: t('总数量'),
                        textAlign: 'center',
                        fill: isDark ? '#ffffffb3' : '#4E5969',
                        fontSize: 14,
                    },
                },
                {
                    type: 'text',
                    left: 'center',
                    top: '50%',
                    style: {
                        text: surveyCountBase.value.total_count,
                        textAlign: 'center',
                        fill: isDark ? '#ffffffb3' : '#1D2129',
                        fontSize: 16,
                        fontWeight: 500,
                    },
                },
            ],
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
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
                        value: [surveyCountBase.value.draft_count],
                        name: t('问卷草稿'),
                        itemStyle: {
                            color: isDark ? '#3B8D4E' : '#165dff',
                        },
                    },
                    {
                        value: [surveyCountBase.value.valid_count],
                        name: t('发布中'),
                        itemStyle: {
                            color: isDark ? '#A079DC' : '#ff0000',
                        },
                    },
                    {
                        value: [surveyCountBase.value.invalid_count],
                        name: t('已停止'),
                        itemStyle: {
                            color: isDark ? '#666666' : '#6c4ee2',
                        },
                    },
                    {
                        value: [surveyCountBase.value.deleted_count],
                        name: t('已删除'),
                        itemStyle: {
                            color: isDark ? '#4D4D4D' : '#707070',
                        },
                    },
                ],
            },
        ],
    };
});

fetchSurveyClassifyBase();
async function fetchSurveyClassifyBase() {
    if (loading.value) return;
    loading.value = true;
    const res = await getSurveyClassifyBase();
    if (res.ok) {
        surveyCountBase.value = res.data;
    }
    loading.value = false;
}
</script>

<style scoped lang="scss"></style>
