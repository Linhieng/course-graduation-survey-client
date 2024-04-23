import { QuestionOption, QuestionType } from '@/store/modules/create/types';
import { get } from './axios';

export function getAnswerCollectBySurveyId(surveyId: number) {
    return get<{
        answerList: CollectAnswer[];
    }>(`/api/collect/${surveyId}`);
}

interface CollectAnswer {
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
interface AnswerItem {
    type: QuestionType;
    required: boolean;
    id: string;
    text: string;
    option_text: Array<QuestionOption>;
}
