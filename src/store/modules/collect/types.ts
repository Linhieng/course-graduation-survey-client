import { QuestionOption, QuestionType } from '../create/types';

export interface CollectStore {
    loading: {
        fetchAnswerCollectBySurveyId: boolean;
    };
    cur: {
        surveyId?: number;
        answerList: CollectAnswer[];
    };
}

export interface CollectAnswer {
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
