<template>
    <div class="ai-box">
        <h1>AI 助手</h1>
        <a-button v-if="showData.socketStatus === '未连接'" :loading="connecting" @click="connectSocket">
            点击开始聊天
        </a-button>
        <div v-if="showData.socketStatus === '已连接'">
            <a-textarea auto-size v-model="sendData.message" placeholder="请输入"></a-textarea>
            <a-button type="primary" @click="sendMessage">发送</a-button>
            <p :class="{ hide: !answerLoading }">思考中...</p>
            <div class="answer-box">
                <p v-for="answerItem of showData.answerList">
                    {{ answerItem }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import io from 'socket.io-client';
import { reactive, ref } from 'vue';
const showData = reactive({
    socketStatus: '未连接',
    answerList: [''],
});
const sendData = reactive({
    message: '',
});
const answerLoading = ref(false);
const connecting = ref(false);
const socketRef = ref();

const connectSocket = () => {
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
            showData.answerList[0] += data.content;
        } else {
            showData.answerList.unshift('');
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

<style scoped lang="less">
.ai-box {
    position: fixed;
    bottom: 10px;
    right: 20px;
    background: var(--color-bg-2);
    padding: 20px;
}
.answer-box {
    max-width: 300px;
    max-height: 300px;
    overflow: auto;
}

.active {
    color: skyblue;
    font-weight: bold;
}
.hide {
    visibility: hidden;
}
</style>
