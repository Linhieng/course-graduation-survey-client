import { QuestionItem, QuestionOption, QuestionType } from '../create/types';

export interface CollectSurveyItem {
    id: number;
    title: string;
    comment: string;
    is_valid: boolean;
    created_at: Date;
    updated_at: Date;
    /** 收集到的回答量 */
    collect_answer: number;
    /** 收集到的访问量 */
    collect_visited: number;
}

export interface CollectStore {
    search_survey: {
        pagination: {
            total: number;
            /** 前端这里显示的是页数，从 1 开始，但后端 sql 应该是从 0 开始！ */
            current: number;
            pageSize: number;
        };
        survey_list: Array<CollectSurveyItem>;
    };
    loading: {
        fetchAnswerCollectBySurveyId: boolean;
        fetchSurveyListByPage: boolean;
    };
    cur: {
        title: string;
        desc: string;
        surveyId?: number;
        questionList: QuestionItem[];
        answerList: CollectAnswer[];
        pageAnswerList: Page<CollectAnswer>;
    };
}
export interface Page<T> {
    total: number;
    pageStart: number;
    pageSize: number;
    list: T[];
}
export interface CollectAnswer {
    /** 用于表格过滤判断，使用字符串是因为类型报错。
     * - '0' 微软 Edge
     * - '1' 谷歌
     * - '2' 火狐
     * - '3' 其他
     */
    user_browser_flag: '0' | '1' | '2' | '3';
    spend_time_text: string;
    is_valid_text: string;
    /** 这是本地添加的 */
    created_date: string;
    /** 这是根据 user_agent 计算的 */
    user_browser: string;
    /** 这是根据 user_agent 计算的 */
    user_os: string;
    /** 这是根据 user_agent 计算的 */
    user_device: string;
    /** 这是服务器添加的 */
    user_agent: string;
    /** 这是服务器添加的 */
    user_name: string;
    //
    // -------
    //
    id: number;
    survey_id: number;
    answer_user_id: number;
    is_valid: number;
    spend_time: number;
    ip_from: string;
    answer_structure_json: {
        data: AnswerItem[];
    };
    created_at: Date;
    updated_at: Date;
}
/** 这个类型和和发布问卷中的一致 */
export interface AnswerItem {
    type: QuestionType;
    required: boolean;
    id: string;
    text: string;
    option_text: Array<QuestionOption>;
}

/**  */
