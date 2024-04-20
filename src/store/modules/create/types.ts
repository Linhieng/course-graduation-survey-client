interface QuestionItem {
    id: string;
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
