<script setup lang="ts">
import type { QuestionItem } from '@/store/modules/create/types';
import { useCreateStore } from '@/store';
const createStore = useCreateStore();
defineProps<{
    // question: QuestionItem;
    index: number;
}>();
</script>

<template>
    <a-space class="box" direction="vertical" fill>
        <a-textarea
            v-model="createStore.survey.questionList[index].desc"
            class="desc"
            :auto-size="{ minRows: 3 }"
            placeholder="在这里输入问题描述信息"
        ></a-textarea>
        <a-input disabled model-value="用户将会在这里输入内容"></a-input>
    </a-space>
</template>

<style scoped lang="less"></style>
