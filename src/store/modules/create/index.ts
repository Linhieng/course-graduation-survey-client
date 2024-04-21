import { defineStore } from 'pinia';
import { CreateState, QuestionType } from './types';
import bgImg from '@/assets/images/login1.png';
import { v4 as idv4 } from 'uuid';
import { toRaw } from 'vue';
import { getAllQuestionTemplate, getNewOption, getNewQuestion, getNormalQuestion } from './utils';
import { msgError, msgSuccess, msgWarning } from '@/utils/msg';
import { cacheSurvey as reqCacheSurvey } from '@/api/survey';
import { publishSurvey as apiPublishSurvey } from '@/api/survey';
import router from '@/router';

const useCreateStore = defineStore('create', {
    state: (): CreateState => ({
        config: {
            confirmBeforeDel: true,
            canDelLastQuestion: false,
            canDelLastOption: false,
            autoCloseAddPanel: true,
            autoCacheSurvey: false,
        },
        skin: {
            survey_width: '60%',
            survey_position: 'left',
            background_image: undefined,
            background_image_position: 'right',
            bg_object_fit: 'cover',
            bg_position: 'reset',
            bg_width: undefined,
            bg_color: undefined,
            bg_img: 'repeating-linear-gradient(0deg, #48c6ef 0%,#6f86d6 100%)',
            suggestBgImgList: [
                'repeating-linear-gradient(0deg, #48c6ef 0%,#6f86d6 100%)',
                'repeating-linear-gradient(45deg, #d299c2 0%,#fef9d7 100%)',
                'repeating-linear-gradient(240deg, rgba(158, 180, 218, 0.91) 0%,#04befe 100%)',
            ],
        },
        survey: {
            id: undefined,
            title: '问卷未命名标题',
            comment: '',
            // questionList: getAllQuestionTemplate(),
            questionList: getNormalQuestion(),
        },
        local: {
            isCaching: false,
            isPublishing: false,
            latelyCacheTime: undefined,
        },
    }),

    getters: {
        /** 获取问题列表 */
        questionList(state) {
            return state.survey.questionList;
        },
    },

    actions: {
        async publishSurvey() {
            if (!this.survey.id) return;
            if (this.local.isPublishing) return;
            this.local.isPublishing = true;
            const res = await apiPublishSurvey(this.survey.id);
            if (res.ok) {
                msgSuccess('发布成功');
                router.push({
                    name: 'my-publish-survey',
                });
            } else {
                msgError(res.msg);
            }
            this.local.isPublishing = false;
        },

        /** 立刻缓存问卷 */
        async cacheSurvey() {
            if (this.local.isCaching) return;
            this.local.isCaching = true;

            const res = await reqCacheSurvey({
                surveyId: this.survey.id,
                title: this.survey.title,
                comment: this.survey.comment,
                structure_json: {
                    version: '0.2.0',
                    questionList: this.survey.questionList,
                },
            });
            if (res.ok) {
                msgSuccess('缓存成功');
                this.survey.id = res.data.surveyId;
                this.local.latelyCacheTime = new Date(res.data.time);
            } else {
                msgError(res.msg);
            }

            this.local.isCaching = false;
        },

        /** 添加一个选项（适用单选多选） */
        addOption(questionIndex: number, optionIndex: number, type: QuestionType) {
            this.survey.questionList[questionIndex].options.splice(optionIndex + 1, 0, getNewOption(type));
            this.survey.questionList[questionIndex].options.forEach((option, i) => {
                option.index = i;
            });
        },
        /** 删除一个选项（适用单选多选） */
        removeOption(questionIndex: number, optionIndex: number) {
            if (this.survey.questionList[questionIndex].options.length < 2 && !this.config.canDelLastOption) {
                msgWarning('不允许删除最后一个选项！');
                return;
            }
            if (this.survey.questionList[questionIndex].options.length > 0) {
                this.survey.questionList[questionIndex].options.splice(optionIndex, 1);
                this.survey.questionList[questionIndex].options.forEach((option, i) => {
                    option.index = i;
                });
            }
        },

        /** 删除一个问题 */
        delQuestion(order: number) {
            if (this.survey.questionList.length < 2 && !this.config.canDelLastQuestion) {
                msgWarning('不允许删除最后一个问题！');
                return;
            }
            if (this.survey.questionList.length > 0) {
                this.survey.questionList.splice(order, 1);
                this.survey.questionList.forEach((q, i) => {
                    q.order = i;
                });
            }
        },
        /** 新增一个问题 */
        addQuestion(order: number, type: QuestionType) {
            this.survey.questionList.splice(order + 1, 0, getNewQuestion(type));
            this.survey.questionList.forEach((q, i) => {
                q.order = i;
            });
            console.log(toRaw(this.survey.questionList));
        },

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
        toggleConfirmBeforeDelete() {
            this.config.confirmBeforeDel = !this.config.confirmBeforeDel;
        },
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////

        // prettier-ignore
        updateBgUrl(url: string) { this.skin.background_image = url; },
        // prettier-ignore
        resetBgUrl() { this.skin.background_image = undefined; },
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
        // prettier-ignore
        updateBgImg(val:string) {this.skin.bg_img = val},
        // prettier-ignore
        resetBgImg() {this.skin.bg_img = undefined},
    },
});

export default useCreateStore;
