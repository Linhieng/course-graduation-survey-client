<script setup lang="ts">
import { useCollectStore } from '@/store';
const collectStore = useCollectStore();

const exportData = (type: 'xlsx' | 'csv') => {
    collectStore.exportAnswerList(type);
};
</script>

<template>
    <h2>
        {{ $t('问卷标题：') + collectStore.state.cur.title }}
    </h2>
    <p>
        {{ $t('问卷描述：') + collectStore.state.cur.desc }}
    </p>
    <a-space class="btn-group">
        <template #split>
            <a-divider direction="vertical"></a-divider>
        </template>
        <a-button class="btn" type="primary" @click="collectStore.fetchAnswerCollectBySurveyId">
            {{ $t('点击刷新数据') }}
        </a-button>
        <a-dropdown trigger="hover" class="btn">
            <a-button>{{ $t('导出数据') }}</a-button>
            <template #content>
                <a-doption>
                    <a-space @click="() => exportData('xlsx')">
                        <span>{{ $t('导出 xlsx 格式') }}</span>
                    </a-space>
                </a-doption>
                <a-doption>
                    <a-space @click="() => exportData('csv')">
                        <span>{{ $t('导出 csv 格式') }}</span>
                    </a-space>
                </a-doption>
            </template>
        </a-dropdown>
    </a-space>

    <h2>{{ $t('收集到的数据总数') }} ：{{ collectStore.state.cur.answerList.length }}</h2>
</template>
<style scoped lang="scss">
.btn-group {
    display: flex;
    justify-content: end;
}
</style>
