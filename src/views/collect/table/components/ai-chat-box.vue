<script setup lang="ts">
import { useAiStore } from '@/store';
import { type ShowData } from './ai-stat.vue';

const aiStore = useAiStore();

defineProps<{
    showData: ShowData;
}>();
</script>

<template>
    <div v-if="aiStore.state.chatHistoryList.stat.length > 2" class="reset-box">
        <a-button @click="aiStore.resetStat">{{ $t('重置聊天历史') }}</a-button>
    </div>

    <div class="ai-chat-box">
        <template v-for="(answerItem, i) of aiStore.state.chatHistoryList.stat">
            <div class="answer-item" v-if="answerItem.content.trim() !== ''">
                <a-space>
                    <a-avatar :style="{ backgroundColor: '#3370ff' }" :size="32">
                        <icon-font name="bot" />
                    </a-avatar>
                    <span>{{ $t('AI 助手') }}</span>
                </a-space>

                <div v-if="i === aiStore.state.chatHistoryList.stat.length - 1">
                    <p>{{ $t(answerItem.content) }}</p>
                </div>
                <div v-else v-html="answerItem.content"></div>
                <div
                    v-if="
                        i === aiStore.state.chatHistoryList.stat.length - 1 &&
                        aiStore.state.chatHistoryList.stat.length <= 2
                    "
                >
                    <a-button :loading="aiStore.state.answerLoading" @click="aiStore.analyzeAnswer">
                        {{ $t('分析收集到的答案') }}
                    </a-button>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.ai-chat-box {
    overflow: auto;

    display: flex;
    flex-direction: column-reverse;

    .answer-item {
        margin-bottom: 20px;
    }
}

.reset-box {
    display: flex;
    flex-direction: row-reverse;
}
</style>
<style lang="scss">
.ai-chat-box {
    p,
    li {
        line-height: 1.4rem;
    }
    li {
        margin: 4px;
    }
}
</style>
