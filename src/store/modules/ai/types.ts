import type { Socket } from 'socket.io-client';
import { type QuestionItem } from '../create/types';
import { type CollectAnswer } from '../collect/types';

export interface AiStoreState {
    /** 后台 ai socket 接口路径，比如 //localhost::5000 */
    VITE_AI_SOCKET: string;
    /** ai 打字中 */
    typing: boolean;

    /** 显示 ai 图标。只有点用户点击分析所有答案后，才可以显示 ai */
    showIcon: boolean;
    /** 连接 socket 后的对象 */
    socket: Socket | null;
    /** 是否已连接，null 表示未连接 */
    status: 'connecting' | 'connected' | null;
    /** 思考中 */
    answerLoading: boolean;
    /** 问卷和答案的结果数据说明，作为 ai 提示词 */
    question_answer_data: {
        questionStat: Array<{
            type: string;
            title: string;
        }>;
        answerStat: Array<string[]>;
    };
    questionList: null | QuestionItem[];
    answerList: null | CollectAnswer[];
    /** 历史聊天记录 */
    chatHistoryList: {
        /** ai 正在回答时缓存消息流 */
        oneTemp: '';
        /** 答案统计页面的历史记录 */
        stat: Array<{
            role: 'assistant' | 'user';
            content: string;
        }>;
    };
}
