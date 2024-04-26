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
        <a-button @click="collectStore.exportAnswerList">导出数据</a-button>
    </div>
</template>
<style scoped lang="less">
.btn-group {
    display: flex;
    justify-content: end;
}
</style>
