export type QuestionType =
    /** 单行文本 */
    | 'single_text'
    /** 多行文本 */
    | 'multi_text'
    /** 单选题 */
    | 'single_select'
    /** 多选题 */
    | 'multi_select'
    /** 图片单选题 */
    | 'pic_single_select'
    /** 图片多选题 */
    | 'pic_multi_select'
    /** 单文件上传 */
    | 'single_file'
    /** 多文件上传 */
    | 'multi_file'
    /** 评分题 */
    | 'score'
    /** 量表题 */
    | 'NPS'
    /** 矩阵单选 */
    | 'matrix_single_select'
    /** 矩阵多选 */
    | 'matrix_multi_select'
    /** 矩阵量表 */
    | 'matrix_NPS'
    /** 矩阵评分 */
    | 'matrix_scope'
    /** 自增文本 */
    | 'auto_text'
    /** 填充题 */
    | 'input_text'
    /** 自增表格 */
    | 'auto_table'
    /** 非填空的文本描述 */
    | 'desc';
export interface QuestionItem {
    id: string;
    type: QuestionType;
    order: number;
    title: string;
    required: boolean;

    // 下面内容全部弄成必填，更方便类型判断
    /** 问题描述，除了“描述”，其他问题基本都会有这个属性 */
    desc: string;
    /** 通用选项，包括单选项、多选项、图片选项等等 */
    options: Array<QuestionOption>;
}
/** 一个选项 */
export interface QuestionOption {
    id: string;
    index: number;
    text: string;
    url: string;
}

export interface Survey {
    id: undefined | number;
    title: string;
    comment: string;
    questionList: QuestionItem[];
}
export interface CreateState {
    /** 仅用于前端相关工作 */
    local: {
        isCaching: boolean;
        latelyCacheTime: undefined | Date;
        isPublishing: boolean;
    };
    config: {
        confirmBeforeDel: boolean;
        canDelLastQuestion: boolean;
        canDelLastOption: boolean;
        autoCloseAddPanel: boolean;
        autoCacheSurvey: boolean;
    };
    survey: Survey;
    skin: {
        survey_width: string;
        survey_position: 'center' | 'left' | 'right';
        background_image: undefined | string;
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
        // 渐变背景
        bg_img: undefined | string;
        suggestBgImgList: string[];
    };
}
