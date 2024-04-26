<template>
    <a-row justify="space-between">
        <a-col v-for="(item, idx) in renderData" :key="idx" :span="6">
            <a-col style="margin-bottom: 16px; font-size: 1.3rem">
                <span style="font-weight: bold">{{ item.title }}</span>
            </a-col>
            <a-space>
                <span class="statistic-prefix" :style="{ background: item.prefix.background }">
                    <component :is="item.prefix.icon" :style="{ color: item.prefix.iconColor }" />
                </span>
                <LoadingNumber :loading="useStatStore().state.isFetching" :val="item.value" />
            </a-space>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useStatStore from '@/store/modules/stat';
import { useI18n } from 'vue-i18n';
import useThemes from '@/hooks/themes';
import LoadingNumber from '@/components/easy/loading-number.vue';

const { t } = useI18n();
const { isDark } = useThemes();

useStatStore().getStatCount();
const renderData = computed(() => [
    {
        title: t('总访问量'),
        value: useStatStore().state.statCount.count_all_visit,
        prefix: {
            icon: 'icon-cloud',
            background: isDark.value ? '#593E2F' : '#FFE4BA',
            iconColor: isDark.value ? '#F29A43' : '#F77234',
        },
    },
    {
        title: t('总的回答数量'),
        value: useStatStore().state.statCount.count_all_answer,
        prefix: {
            icon: 'icon-bookmark',
            background: isDark.value ? '#3D5A62' : '#E8FFFB',
            iconColor: isDark.value ? '#6ED1CE' : '#33D1C9',
        },
    },
    {
        title: t('已发布问卷'),
        value: useStatStore().state.statCount.count_publish_survey,
        prefix: {
            icon: 'icon-command',
            background: isDark.value ? '#354276' : '#E8F3FF',
            iconColor: isDark.value ? '#4A7FF7' : '#165DFF',
        },
    },
    {
        title: t('收集完毕问卷'),
        value: useStatStore().state.statCount.count_stop_survey,
        prefix: {
            icon: 'icon-dashboard',
            background: isDark.value ? '#3F385E' : '#F5E8FF',
            iconColor: isDark.value ? '#8558D3' : '#722ED1',
        },
    },
]);
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
