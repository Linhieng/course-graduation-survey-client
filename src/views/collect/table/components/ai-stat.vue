<template>
    <div class="ai-box" v-show="aiStore.state.showIcon">
        <div class="chat-box" v-show="visible">
            <a-button v-if="showData.socketStatus === '未连接'" :loading="connecting" @click="connectSocket">
                激活 AI 助手
            </a-button>
            <div v-if="showData.socketStatus === '已连接'">
                <AiChatBox :showData="showData" />
                <p :class="{ hide: !answerLoading }">思考中...</p>
                <div class="input-box">
                    <!-- <a-textarea auto-size v-model="sendData.message" placeholder="请输入"></a-textarea>
                    <a-button class="input-btn" type="primary" @click="sendMessage">发送</a-button> -->
                </div>
            </div>
        </div>
        <div class="chat-icon">
            <a-button type="primary" shape="round" @click="() => (visible = !visible)">
                <template #icon>
                    <icon-font name="bot" />
                </template>
            </a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import io from 'socket.io-client';
import { reactive, ref } from 'vue';
import markdownit from 'markdown-it';
import AiChatBox from './ai-chat-box.vue';
import { useAiStore } from '@/store';
const md = markdownit();

const aiStore = useAiStore();

export interface ShowData {
    socketStatus: '未连接' | '已连接';
    answerList: Array<{
        role: 'assistant' | 'user';
        content: string;
    }>;
}

const showData = reactive<ShowData>({
    socketStatus: '未连接',
    /** 对话列表 */
    answerList: [
        {
            role: 'assistant',
            content: '你好，我是问卷系统的 AI 助手，能够帮助你分析问卷的统计答案。',
        },
    ],
});
const sendData = reactive({
    message: '',
});
const visible = ref(false);
const answerLoading = ref(false);
const connecting = ref(false);
const socketRef = ref();

const connectSocket = () => {
    aiStore.connectSocket();

    connecting.value = true;
    const socket = io('http://localhost:3002');
    socketRef.value = socket;
    socket.on('connect', function () {
        showData.socketStatus = '已连接';
        connecting.value = false;
    });
    socket.on('close', () => {
        showData.socketStatus = '未连接';
    });

    socket.on('response', (data: 'done' | { content: string; role: 'assistant' }) => {
        answerLoading.value = false;
        if (data !== 'done') {
            showData.answerList[0].content += data.content;
        } else {
            showData.answerList[0].content = md.render(showData.answerList[0].content);
            showData.answerList.unshift({ role: 'assistant', content: '' });
        }
    });
};

const sendMessage = () => {
    console.log(sendData.message);
    if (sendData.message.trim() === '') return;
    answerLoading.value = true;
    console.log(sendData.message);
    socketRef.value.emit('message', sendData.message);
};
</script>

<style scoped lang="scss">
.ai-box {
    position: fixed;
    bottom: 0px;
    right: 0px;
    padding: 10px;

    .chat-box {
        background: var(--color-bg-2);
        box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        margin-bottom: 40px;
        width: 500px;
        height: 300px;
        overflow: auto;
        padding: 20px;
    }
    .chat-icon {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
}

.active {
    color: skyblue;
    font-weight: bold;
}
.hide {
    visibility: hidden;
}

.input-box {
    display: flex;
    .input-btn {
        align-self: end;
        margin-left: 4px;
    }
}
</style>
