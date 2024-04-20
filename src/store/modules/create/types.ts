export type QuestionType =
    /** 单行文本 */
    | 'single_text'
    /** 多行文本 */
    | 'multi_text'
    /** 单选题 */
    | 'single_select'
    /** 多选题 */
    | 'multi_select'
    /** 文件上传 */
    | 'file'
    /** 评分题*/
    | 'score';
export interface QuestionItem {
    id: string;
    type: QuestionType;
    order: number;
    title: string;
}
export interface CreateState {
    survey: {
        title: string;
        comment: string;
        questionList: QuestionItem[];
    };
    skin: {
        survey_width: string;
        survey_position: 'center' | 'left' | 'right';
        background_image: string;
        background_image_position: 'left' | 'right' | 'top';
        bg_object_fit: 'contain' | 'cover' | 'fill' | 'none';
        bg_width: undefined | string;
        // prettier-ignore
        bg_position: 
            'reset'|
            'leftTop'   | 'centerTop'    | 'rightTop'|
            'leftCenter'| 'centerCenter' | 'rightCenter'|
            'leftBottom'| 'centerBottom' | 'rightBottom'
        ;

        bg_color: undefined | string;
    };
}
