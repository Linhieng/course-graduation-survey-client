<script setup lang="ts">
import { useCollectStore } from '@/store';
const collectStore = useCollectStore();
</script>

<template>
    <h2>
        {{ $t('问卷标题：') + collectStore.state.cur.title }}
    </h2>
    <p>
        {{ $t('问卷描述：') + collectStore.state.cur.desc }}
    </p>
    <div class="btn-group">
        <a-button class="btn" type="primary" @click="collectStore.fetchAnswerCollectBySurveyId">点击刷新数据</a-button>
        <a-button class="btn" @click="collectStore.exportAnswerList">导出数据</a-button>
    </div>
    <h2>收集到的数据总数：{{ collectStore.state.cur.answerList.length }}</h2>
</template>
<style scoped lang="less">
.btn-group {
    display: flex;
    justify-content: end;
    .btn {
        margin-left: 10px;
    }
}
</style>
