import { getMessageUnread, setMessageRead } from '@/api/message';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import type { MessageStore } from './types';
import { noticeInfo } from '@/utils/msg';
import { getToken } from '@/utils/auth';

const useMessageStore = defineStore('message', () => {
    const state = reactive<MessageStore>({
        loading: {
            showFetchUserMessage: false,
            fetchUserMessage: false,
            loadingIds: [],
            setAllRead: false,
        },
        message: {
            unread: [],
            read: [],
            all: [],
        },
    });

    setInterval(() => {
        const token = getToken();
        if (token) fetchUserMessage();
    }, 10000);
    async function fetchUserMessage() {
        if (state.loading.fetchUserMessage) return;

        state.loading.fetchUserMessage = true;

        const res = await getMessageUnread();
        if (res.ok) {
            const pre = state.message.unread.length;
            state.message = res.data;
            const cur = state.message.unread.length;
            if (cur > pre) {
                noticeInfo(`你收到 ${cur - pre} 条新消息`, 'bottomRight');
            }
        }
        state.loading.showFetchUserMessage = false;
        state.loading.fetchUserMessage = false;
    }

    async function setAllRead() {
        if (state.loading.setAllRead) return;
        if (state.message.unread.length < 0) return;
        state.loading.setAllRead = true;
        const ids: number[] = [];
        state.message.unread.forEach((item) => {
            ids.push(item.id);
        });
        const res = await setMessageRead(ids);
        if (res.ok) {
            state.message.unread = [];
            fetchUserMessage();
        }
        state.loading.setAllRead = false;
    }
    async function setRead(id: number) {
        if (state.loading.loadingIds.includes(id)) return;
        state.loading.loadingIds.push(id);
        const res = await setMessageRead([id]);
        if (res.ok) {
            state.loading.loadingIds = state.loading.loadingIds.filter((item) => item !== id);
            state.message.unread = state.message.unread.filter((item) => item.id !== id);
            fetchUserMessage();
        }
    }

    const isLoading = (id: number) =>
        computed(() => {
            return state.loading.loadingIds.includes(id);
        });

    return {
        state,
        isLoading,
        fetchUserMessage,
        setAllRead,
        setRead,
    };
});

export default useMessageStore;
