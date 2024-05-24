<script setup lang="ts">
defineProps<{
    showData: any;
}>();
</script>

<template>
    <div class="ai-chat-box">
        <template v-for="answerItem of showData.answerList">
            <div class="answer-item">
                <a-space v-if="answerItem.trim() !== ''">
                    <a-avatar :style="{ backgroundColor: '#3370ff' }" :size="32">
                        <icon-font name="bot" />
                    </a-avatar>
                    <span>AI 助手</span>
                </a-space>
                <div v-html="answerItem"></div>
            </div>
        </template>
    </div>
</template>

<style scoped lang="less">
.ai-chat-box {
    max-width: 300px;
    max-height: 300px;
    overflow: auto;

    display: flex;
    flex-direction: column-reverse;
}
</style>
