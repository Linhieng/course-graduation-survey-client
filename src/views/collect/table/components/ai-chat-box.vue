<script setup lang="ts">
import { useAiStore } from '@/store';
import { ShowData } from './ai-stat.vue';

const aiStore = useAiStore();

defineProps<{
    showData: ShowData;
}>();
</script>

<template>
    <div class="ai-chat-box">
        <template v-for="(answerItem, i) of aiStore.state.chatHistoryList.stat">
            <div class="answer-item">
                <a-space v-if="answerItem.content.trim() !== ''">
                    <a-avatar :style="{ backgroundColor: '#3370ff' }" :size="32">
                        <icon-font name="bot" />
                    </a-avatar>
                    <span>AI 助手</span>
                </a-space>
                <div v-html="answerItem.content"></div>
                <div
                    v-if="
                        i === aiStore.state.chatHistoryList.stat.length - 1 &&
                        aiStore.state.chatHistoryList.stat.length <= 2
                    "
                >
                    <a-button @click="aiStore.analyzeAnswer">分析收集到的答案</a-button>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped lang="less">
.ai-chat-box {
    overflow: auto;

    display: flex;
    flex-direction: column-reverse;

    .answer-item {
        margin-bottom: 20px;
    }
}
</style>
