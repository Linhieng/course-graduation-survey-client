import { QuestionOption, QuestionType } from '../create/types';

export interface CollectStore {
    loading: {
        fetchAnswerCollectBySurveyId: boolean;
    };
    cur: {
        title: string;
        desc: string;
        surveyId?: number;
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
    created_at: string;
    updated_at: string;
}
/** 这个类型和和发布问卷中的一致 */
export interface AnswerItem {
    type: QuestionType;
    required: boolean;
    id: string;
    text: string;
    option_text: Array<QuestionOption>;
}
