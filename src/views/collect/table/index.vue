<script setup lang="ts">
import NotFound from '@/views/not-found/index.vue';
import DataTable from './components/data-table.vue';
import DataBanner from './components/data-banner.vue';
import DataVisual from './components/data-visual.vue';
import DataStat from './components/data-stat.vue';
import AiStat from './components/ai-stat.vue';
import BaseContainer from '@/components/base-container/index.vue';
defineProps<{
    surveyId: string | number;
}>();
</script>

<template>
    <div>
        <template v-if="isNaN(Number(surveyId))">
            <NotFound backName="collect-entry" :backText="$t('回到查询列表')">
                {{ $t('找不到对应问卷') }} {{ surveyId }}
            </NotFound>
        </template>
        <template v-else>
            <base-container :items="[$t('可视化分析'), '' + surveyId]" title="问卷答案统计">
                <div class="box">
                    <DataBanner />
                    <DataTable :surveyId="Number(surveyId)" />
                </div>
                <DataVisual />
                <DataStat :surveyId="Number(surveyId)" />
                <AiStat class="ai-box" />
            </base-container>
        </template>
    </div>
</template>
