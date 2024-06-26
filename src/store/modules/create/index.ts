import { defineStore } from 'pinia';
import type { CreateState, QuestionItem, QuestionType, Survey } from './types';
import { toRaw } from 'vue';
import { getDefaultSkin, getNewOption, getNewQuestion } from './utils';
import { msgError, msgSuccess, msgWarning } from '@/utils/msg';
import { apiCreateSurvey, getShareSurveyTemplate, getSurveyById, cacheSurvey as reqCacheSurvey } from '@/api/survey';
import { updateAndPublishSurvey } from '@/api/survey';
import { uniqueId } from 'lodash';
import type { Router } from 'vue-router';

const useCreateStore = defineStore('create', {
    state: (): CreateState => ({
        showEditOrder: false,
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
            isCreating: false,
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
                this.importSurvey(
                    {
                        // 从模版创建时，问卷 id 设置为 undefined
                        // 然后通过立刻缓存的方式，自动创建一份新的问卷。
                        id: undefined,
                        title: res.data.title,
                        comment: res.data.comment,
                        survey_type: res.data.survey_type,
                        // 根据模版创建问卷时，新的问卷肯定不能是模版问卷！
                        is_template: 0,
                        questionList: res.data.structure_json.questionList || [],
                    },
                    res.data.skin,
                );
                this.cacheSurvey();
            }
        },
        /** 从草稿箱中获取一份问卷模版，这里会自动联网获取 */
        async importFromDraft(surveyId: number) {
            const res = await getSurveyById(surveyId);
            if (res.ok) {
                this.importSurvey(
                    {
                        id: surveyId,
                        title: res.data.title,
                        comment: res.data.comment,
                        survey_type: res.data.survey_type,
                        is_template: res.data.is_template,
                        questionList: res.data.structure_json.questionList,
                    },
                    res.data.skin,
                );
            }
        },
        /** 编辑问卷模版 */
        async editSurveyTemplate(surveyId: number) {
            const res = await getSurveyById(surveyId);
            if (res.ok) {
                this.importSurvey(
                    {
                        id: surveyId,
                        title: res.data.title,
                        comment: res.data.comment,
                        survey_type: res.data.survey_type,
                        is_template: res.data.is_template,
                        questionList: res.data.structure_json.questionList,
                    },
                    res.data.skin,
                );
            }
        },
        /** 导入问卷，可能来自本地，可能来自模版，也可能来自草稿箱，总之，他需要提供一个 survey */
        async importSurvey(survey: Survey, skin: any) {
            // 不用这样一个属性一个属性地修改，这样当你缺失了每个属性时，你完全不知道！
            // this.survey.id = survey.id;
            // this.survey.title = survey.title;
            // this.survey.comment = survey.comment;
            // this.survey.survey_type = survey.survey_type;
            // this.survey.questionList = survey.questionList;
            /** TODO 先这样简单处理一下 */
            if (skin.survey_width) {
                this.skin = skin;
            } else {
                this.skin.background_image = skin.background_image;
            }
            this.survey = survey;
        },
        //
        //
        //
        //
        //

        /** 发布问卷。这里的 router 需要组件传递，因为通过 import router from '@/router'; 获取的 router 在跳转页面时有时会失效。 */
        async publishSurvey(router: Router, successCb: Function) {
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
                skin: this.skin,
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
                skin: this.skin,
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
        /** 创建一份新的问卷 */
        async createSurvey(
            router: Router,
            {
                title,
                comment,
                survey_type,
                is_template,
            }: {
                title?: string;
                comment?: string;
                survey_type?: 0 | 1 | 2;
                is_template?: 0 | 1 | 2;
            },
        ) {
            if (this.local.isCreating) return;
            this.local.isCreating = true;

            const res = await apiCreateSurvey({
                title: title || this.survey.title || '未命名的问卷标题',
                comment: comment || this.survey.comment || '',
                survey_type: survey_type || this.survey.survey_type || 0,
                is_template: is_template || this.survey.is_template || 0,
                structure_json: {
                    version: '0.2.0',
                    questionList: [],
                },
                skin: getDefaultSkin(),
            });
            if (res.ok) {
                this.$state.survey.id = res.data.surveyId;
                this.$state.local.latelyCacheTime = new Date(res.data.time);
                this.$state.survey.questionList = [];
                this.$state.skin = getDefaultSkin();
                router.push({
                    name: 'Create',
                });
            } else {
                msgError(res.msg);
            }

            this.local.isCreating = false;
            return res.data.surveyId;
        },

        // reset(data: {
        //     surveyId?: number;
        //     title?: string;
        //     comment?: string;
        //     is_template?: 0 | 1 | 2;
        //     survey_type?: 0 | 1 | 2;
        // }) {
        //     this.$state.survey.id = data.surveyId;
        //     this.$state.survey.title = data.title || '未命名问卷标题';
        //     this.$state.survey.comment = data.comment || '';
        //     this.$state.survey.is_template = data.is_template || 0;
        //     this.$state.survey.survey_type = data.survey_type || 0;
        //     this.$state.survey.questionList = [];
        //     this.$state.survey.skin = {
        //         survey_width: '60%',
        //         survey_position: 'left',
        //         background_image: undefined,
        //         background_image_position: 'right',
        //         bg_object_fit: 'cover',
        //         bg_position: 'reset',
        //         bg_width: undefined,
        //         bg_color: undefined,
        //         bg_img: 'repeating-linear-gradient(0deg, #48c6ef 0%,#6f86d6 100%)',
        //         suggestBgImgList: [
        //             'repeating-linear-gradient(0deg, #48c6ef 0%,#6f86d6 100%)',
        //             'repeating-linear-gradient(45deg, #d299c2 0%,#fef9d7 100%)',
        //             'repeating-linear-gradient(240deg, rgba(158, 180, 218, 0.91) 0%,#04befe 100%)',
        //         ],
        //     } as any;
        // },

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
        /** 矩阵问题类型中，添加一个标题 */
        addTitleItem(questionIndex: number, titleIndex: number, type: QuestionType) {
            this.survey.questionList[questionIndex].titles.splice(titleIndex + 1, 0, {
                id: uniqueId(),
                text: '未定义标题',
            });
        },
        /** 矩阵问题类型中，删除一个标题 */
        removeTitleItem(questionIndex: number, titleIndex: number) {
            if (this.survey.questionList[questionIndex].titles.length < 2) {
                msgWarning('至少需要一个标题');
                return;
            }
            this.survey.questionList[questionIndex].titles.splice(titleIndex, 1);
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
        },

        /** 交换两个问题的位置 */
        swapQuestionOrder(oldIndex: number, newIndex: number) {
            // TODO: 之前不用替换整个对象也可以触发响应时的，
            // 但重新实现一下拖拽后又需要替换整个数组对象，才能触发响应式。
            const questionList = JSON.parse(JSON.stringify(toRaw(this.survey.questionList))) as QuestionItem[];
            [questionList[oldIndex], questionList[newIndex]] = [questionList[newIndex], questionList[oldIndex]];
            questionList.forEach((q, i) => {
                q.order = i;
            });
            // 在未替换整个对象之前，这里的赋值似乎是多余的，如果修改 toRaw 后得到的数组，
            // 发生的变更还是会对应到这里上，所以根本不需要重新赋值。
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
