import { defineStore } from 'pinia';
import { CreateState, QuestionType, Survey } from './types';
import bgImg from '@/assets/images/login1.png';
import { v4 as idv4 } from 'uuid';
import { toRaw } from 'vue';
import { getAllQuestionTemplate, getNewOption, getNewQuestion, getNormalQuestion } from './utils';
import { msgError, msgSuccess, msgWarning, noticeInfo } from '@/utils/msg';
import { getShareSurveyTemplate, getSurveyById, cacheSurvey as reqCacheSurvey } from '@/api/survey';
import { updateAndPublishSurvey } from '@/api/survey';
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
            title: '未命名的问卷',
            comment: '',
            is_template: 0,
            // questionList: getAllQuestionTemplate(),
            questionList: [],
            survey_type: 0,
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
        /** 从模版商场中中获取一份问卷模版，这里会自动联网获取 */
        async importFromTemplate(surveyId: number) {
            const res = await getShareSurveyTemplate(surveyId);
            if (res.ok) {
                this.importSurvey({
                    // 从模版创建时，问卷 id 设置为 undefined
                    // 然后通过立刻缓存的方式，自动创建一份新的问卷。
                    id: undefined,
                    title: res.data.title,
                    comment: res.data.comment,
                    survey_type: res.data.survey_type,
                    is_template: res.data.is_template,
                    questionList: res.data.structure_json.questionList || [],
                });
                this.cacheSurvey();
            }
        },
        /** 从草稿箱中获取一份问卷模版，这里会自动联网获取 */
        async importFromDraft(surveyId: number) {
            const res = await getSurveyById(surveyId);
            if (res.ok) {
                this.importSurvey({
                    id: surveyId,
                    title: res.data.title,
                    comment: res.data.comment,
                    survey_type: res.data.survey_type,
                    is_template: res.data.is_template,
                    questionList: res.data.structure_json.questionList,
                });
            }
        },
        /** 编辑问卷模版 */
        async editSurveyTemplate(surveyId: number) {
            const res = await getSurveyById(surveyId);
            if (res.ok) {
                this.importSurvey({
                    id: surveyId,
                    title: res.data.title,
                    comment: res.data.comment,
                    survey_type: res.data.survey_type,
                    is_template: res.data.is_template,
                    questionList: res.data.structure_json.questionList,
                });
            }
        },
        /** 导入问卷，可能来自本地，可能来自模版，也可能来自草稿箱，总之，他需要提供一个 survey */
        async importSurvey(survey: Survey) {
            // 不用这样一个属性一个属性地修改，这样当你缺失了每个属性时，你完全不知道！
            // this.survey.id = survey.id;
            // this.survey.title = survey.title;
            // this.survey.comment = survey.comment;
            // this.survey.survey_type = survey.survey_type;
            // this.survey.questionList = survey.questionList;
            this.survey = survey;
        },
        //
        //
        //
        //
        //

        /** 发布问卷 */
        async publishSurvey(successCb: Function) {
            // 如果正在缓存，这里不能发布
            // 但目前先不处理，因为实现后可能出现死锁问题。
            if (this.local.isPublishing) return;
            this.local.isPublishing = true;

            const res = await updateAndPublishSurvey({
                surveyId: this.survey.id,
                title: this.survey.title,
                comment: this.survey.comment,
                is_template: this.survey.is_template,
                survey_type: this.survey.survey_type,
                structure_json: {
                    version: '0.2.0',
                    questionList: this.survey.questionList,
                },
            });
            if (res.ok) {
                msgSuccess('发布成功');
                successCb && successCb();
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
                survey_type: this.survey.survey_type,
                is_template: this.survey.is_template,
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
            return res.data.surveyId;
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
