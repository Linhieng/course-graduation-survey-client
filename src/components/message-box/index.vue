<script setup lang="ts">
import { useMessageStore } from '@/store';
const messageStore = useMessageStore();

const flushMessage = () => {
    messageStore.state.loading.showFetchUserMessage = true;
    messageStore.fetchUserMessage();
};
</script>

<template>
    <a-spin style="display: block" :loading="messageStore.state.loading.showFetchUserMessage">
        <div direction="vertical" fill class="box">
            <div class="message-box">
                <header>
                    <a-badge :offset="[20, 6]" :count="useMessageStore().state.message.unread.length">
                        <b style="font-size: 1.3rem">{{ $t('通知') }}</b>
                    </a-badge>
                    <a-button type="text" @click="flushMessage">
                        {{ $t('立刻刷新') }}
                    </a-button>
                </header>
                <a-result
                    style="padding: 0px; margin: auto"
                    v-if="!messageStore.state.message.unread.length"
                    status="404"
                >
                    <template #subtitle>{{ $t('没有未读消息') }}</template>
                </a-result>
                <a-space direction="vertical" fill size="medium" style="padding-top: 20px">
                    <template #split>
                        <a-divider :margin="0" style="width: 100%" />
                    </template>
                    <a-space v-for="item in messageStore.state.message.unread">
                        <a-tag style="cursor: pointer" color="red">未读</a-tag>
                        <a-tooltip :content="new Date(item.created_at).toLocaleString()" position="bottom">
                            <span>{{ new Date(item.created_at).toLocaleDateString() }}</span>
                        </a-tooltip>
                        <span>{{ '问卷' + item.survey_id + ': ' + item.content }}</span>
                        <a-divider direction="vertical"></a-divider>
                        <a-button
                            :loading="messageStore.isLoading(item.id).value"
                            @click="messageStore.setRead(item.id)"
                            text
                        >
                            已读
                        </a-button>
                    </a-space>
                </a-space>
            </div>
            <a-button
                class="btn"
                :loading="messageStore.state.loading.setAllRead"
                :disabled="!messageStore.state.message.unread.length"
                @click="messageStore.setAllRead"
            >
                全部已读
            </a-button>
        </div>
    </a-spin>
</template>

<style scoped lang="less">
.box {
    width: 500px;
    height: 300px;
    overflow: hidden;
    position: relative;
    padding: 60px 20px;

    .message-box {
        height: 100%;
        width: 100%;
        overflow: auto;
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            position: absolute;
            top: 10px;
            left: 24px;
            right: 24px;
            background-color: var(--color-bg-2);
        }
    }

    .btn {
        position: absolute;
        bottom: 14px;
        left: 30px;
        right: 30px;
        height: 30px;
    }
}
</style>
