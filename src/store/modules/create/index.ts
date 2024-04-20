import { defineStore } from 'pinia';
import { CreateState } from './types';
import bgImg from '@/assets/images/login1.png';
import { v4 as idv4 } from 'uuid';
import { toRaw } from 'vue';

const useCreateStore = defineStore('create', {
    state: (): CreateState => ({
        skin: {
            survey_width: '60%',
            survey_position: 'left',
            background_image: bgImg,
            background_image_position: 'right',
            bg_object_fit: 'cover',
            bg_position: 'reset',
            bg_width: undefined,
            bg_color: undefined,
        },
        survey: {
            title: '问卷未命名标题',
            comment: '',
            questionList: Array(8)
                .fill(undefined)
                .map((_, i) => ({
                    id: idv4(),
                    order: i,
                    title: '标题' + (i + 1),
                })),
        },
    }),

    getters: {
        /** 获取问题列表 */
        questionList(state) {
            return state.survey.questionList;
        },
    },

    actions: {
        addQuestion(order: number, type: QuestionType) {},

        /** 交换两个问题的位置 */
        swapQuestionOrder(oldIndex: number, newIndex: number) {
            const questionList = toRaw(this.survey.questionList);
            [questionList[oldIndex], questionList[newIndex]] = [questionList[newIndex], questionList[oldIndex]];
            questionList.forEach((q, i) => {
                q.order = i;
            });
            this.survey.questionList = questionList;
        },
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////

        // prettier-ignore
        updateBgUrl(url: string) { this.skin.background_image = url; },
        // prettier-ignore
        updateBgWidth(val: string) { this.skin.bg_width = val; },
        // prettier-ignore
        resetBgWidth() { this.skin.bg_width = undefined; },
        // prettier-ignore
        resetBgPosition() { this.skin.bg_position = 'reset'; },
        // prettier-ignore
        updateBgColor(val: string) { this.skin.bg_color = val; },
        // prettier-ignore
        resetBgColor() { this.skin.bg_color = undefined; },
        // prettier-ignore
        updateSurveyWidth(val: string) { this.skin.survey_width = val; },
    },
});

export default useCreateStore;
