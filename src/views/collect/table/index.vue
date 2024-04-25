<script setup lang="ts">
import NotFound from '@/views/not-found/index.vue';
import DataTable from './components/data-table.vue';
import DataBanner from './components/data-banner.vue';
import DataVisual from './components/data-visual.vue';
defineProps<{
    surveyId: string | number;
}>();
</script>

<template>
    <div>
        <template v-if="isNaN(Number(surveyId))">
            <NotFound backName="collect-entry" backText="回到查询列表">找不到对应问卷 {{ surveyId }}</NotFound>
        </template>
        <template v-else>
            <div class="wrap">
                <a-breadcrumb>
                    <a-breadcrumb-item>{{ $t('查看问卷') }}</a-breadcrumb-item>
                    <a-breadcrumb-item>{{ surveyId }}</a-breadcrumb-item>
                </a-breadcrumb>
            </div>
            <div class="box">
                <DataBanner />
                <DataTable :surveyId="Number(surveyId)" />
            </div>
            <DataVisual />
        </template>
    </div>
</template>

<style>
.wrap {
    padding: 10px 20px;
}
.box {
    margin: 4px 20px;
    padding: 10px 20px;
    background-color: var(--color-bg-2);
}
</style>
