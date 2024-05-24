import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { AiStoreState } from './types';
import { msgError } from '@/utils/msg';
import io from 'socket.io-client';
import markdownit from 'markdown-it';
const md = markdownit();

const useAiStore = defineStore('ai', () => {
    const state = reactive<AiStoreState>({
        showIcon: false,
        socket: null,
        status: null,
        answerLoading: false,
        questionList: null,
        answerList: null,
        question_answer_data: {
            questionStat: [],
            answerStat: [],
        },
        chatHistoryList: {
            oneTemp: '',
            stat: [
                {
                    role: 'assistant',
                    content: '',
                },
                {
                    role: 'assistant',
                    content: '<p>你好，我是问卷系统的 AI 助手，能够帮助你分析问卷的统计答案。</p>',
                },
            ],
        },
    });

    /** 连接 socket */
    function connectSocket() {
        state.status = 'connecting';
        state.socket = io('http://localhost:3002');
        state.socket.on('connect', () => {
            state.status = 'connected';
        });
        state.socket.on('close', () => {
            state.status = null;
        });

        state.socket.on('response', (data: 'done' | { content: string; role: 'assistant' }) => {
            state.answerLoading = false;
            if (data !== 'done') {
                state.chatHistoryList.oneTemp += data.content;
                state.chatHistoryList.stat[0].content = md.render(state.chatHistoryList.oneTemp);
            } else {
                state.chatHistoryList.oneTemp = '';
                state.chatHistoryList.stat.unshift({ role: 'assistant', content: '' });
            }
        });

        /** 提取问卷问题中的有效内容 */
        const questionStat =
            state.questionList?.map((item, index) => {
                let type = '';
                if (item.type === 'single_text') type = '单行文本';
                else if (item.type === 'multi_text') type = '多行文本';
                else if (item.type === 'single_select') type = '单选题';
                else if (item.type === 'multi_select') type = '多选题';

                return {
                    type,
                    title: item.title,
                };
            }) || [];
        const answerStat = [] as Array<any>;
        state.answerList?.map((item) => {
            item.answer_structure_json.data.forEach((answer, i) => {
                if (answer.type === 'single_text' || answer.type === 'multi_text') {
                    if (!answerStat[i]) {
                        answerStat[i] = [answer.text];
                    } else {
                        answerStat[i].push(answer.text);
                    }
                } else if (answer.type === 'single_select' || answer.type === 'multi_select') {
                    if (!answerStat[i]) {
                        answerStat[i] = [answer.option_text.map((item) => item.text)];
                    } else {
                        answerStat[i].push(answer.option_text.map((item) => item.text));
                    }
                }
            });
        });

        state.question_answer_data.answerStat = answerStat;
        state.question_answer_data.questionStat = questionStat;
    }

    /** 在已有消息基础上添加一条消息 */
    function appendMessage(content: string) {
        state.chatHistoryList.stat.splice(0, 0, {
            role: 'user',
            content,
        });
        state.socket?.emit('message', content);
    }

    /** 分析答案数据 */
    function analyzeAnswer() {
        if (!state.socket) return;
        state.answerLoading = true;
        const answerStat = state.question_answer_data.answerStat;
        const questionStat = state.question_answer_data.questionStat;

        /** 计算各个值分别有多少个 */
        const statInfo = answerStat.map((item, i) => {
            const counts = {} as Record<string, number>;
            for (const val of item) {
                counts[val.toString()] = (counts[val.toString()] || 0) + 1;
            }
            return counts;
        });

        state.socket.emit(
            'message',
            `你是一个问卷系统的AI助手，你可以帮助用户简单分析一份问卷所收集到的所有答案。下面，我将会给你问卷的问题json数据和所有答案的json数据。这两个json都是数组形式，并且已经保证了他们的顺序是一致的。问卷的json数据是：

            ${JSON.stringify(questionStat)}

            问题的json数据是：

            ${JSON.stringify(answerStat)}

            为了防止你计算错误，这里，我先简单地整合一下收集到的各类答案的数据，对应的json数组如下所示：

            ${JSON.stringify(statInfo)}

            每个对象中的 key 是值，value 是一个数字，表示所有答案中该值出现的次数。

            现在，请你简单分析一下收集到的答案数据。`,
        );
    }

    function resetStat() {
        state.chatHistoryList.stat = [
            {
                role: 'assistant',
                content: '',
            },
            {
                role: 'assistant',
                content: '<p>你好，我是问卷系统的 AI 助手，能够帮助你分析问卷的统计答案。</p>',
            },
        ];
    }

    return {
        state,
        connectSocket,
        appendMessage,
        analyzeAnswer,
        resetStat,
    };
});

export default useAiStore;
