<template>
    <a-card class="general-card" :title="$t('最近通知')">
        <template #extra>
            <a-button
                :loading="messageStore.state.loading.setAllRead"
                :disabled="!messageStore.state.message.unread.length"
                @click="messageStore.setAllRead"
            >
                {{ $t('全部已读') }}
            </a-button>
        </template>
        <a-skeleton v-if="loading" :animation="true">
            <a-skeleton-line :rows="3" />
        </a-skeleton>
        <a-result v-else-if="!messageStore.state.message.unread.length" status="404">
            <template #subtitle>
                {{ $t('没有信息') }}
            </template>
        </a-result>
        <a-space direction="vertical" fill size="medium" style="padding-top: 20px">
            <template #split>
                <a-divider :margin="0" style="width: 100%" />
            </template>
            <a-space v-for="item in messageStore.state.message.unread">
                <a-tooltip :content="new Date(item.created_at).toLocaleString()" position="bottom">
                    <span>{{ $t('问卷') + item.survey_id + ': ' + $t(item.content) }}</span>
                </a-tooltip>
                <a-divider direction="vertical"></a-divider>
                <a-button :loading="messageStore.isLoading(item.id).value" @click="messageStore.setRead(item.id)" text>
                    {{ $t('已读') }}
                </a-button>
            </a-space>
        </a-space>
    </a-card>
</template>

<script lang="ts" setup>
import useLoading from '@/hooks/loading';
import { useMessageStore } from '@/store';

const messageStore = useMessageStore();

const { loading, setLoading } = useLoading(true);
setTimeout(() => {
    setLoading(false);
}, 500);
</script>

<style lang="scss" scoped>
:deep(.arco-result) {
    padding: 40px 32px 108px;
}
</style>
