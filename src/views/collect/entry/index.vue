<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const gotoCollectTable = () => {
    router.push({ name: 'collect-table', params: { surveyId: 172 } });
};
</script>

<template>
    <div>
        <h1>提供一个表格，选择对应问卷，然后点击查看答案。</h1>
        <a-button @click="gotoCollectTable">查看收集到的数据</a-button>
    </div>
</template>
