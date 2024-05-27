<script setup lang="ts">
import QuestionList from './QuestionList.vue';
import { useCreateStore } from '@/store';
const createStore = useCreateStore();
</script>

<template>
    <div class="workplace">
        <a-space direction="vertical" fill>
            <a-textarea class="title" v-model="createStore.survey.title" auto-size></a-textarea>
            <a-textarea
                class="comment"
                v-model="createStore.survey.comment"
                auto-size
                placeholder="请输入问卷备注信息"
            ></a-textarea>
        </a-space>
        <div class="list-box">
            <QuestionList />
        </div>
    </div>
</template>

<style scoped lang="less">
.workplace {
    padding: 20px;

    .title :deep(textarea) {
        padding: 10px;
        font-size: 1.7rem;
        font-weight: bold;
        color: #333;
    }
    .comment :deep(textarea) {
        font-size: 1rem;
        height: 1rem;
        font-weight: normal;
        color: #333;
    }
}

* {
    margin: 0;
    padding: 0;
}
</style>
