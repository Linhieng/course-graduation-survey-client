import NProgress from 'nprogress'
import router from '@/router'

import {
    apiCacheSurvey,
    apiGetAllSurveys,
    apiGetSurveyById,
    apiNewSurvey,
    publishSurvey,
} from '@/api'
import type {
    OneSurvey,
    Survey,
    SurveyQuestionType,
    SurveyQuestion_SingleSelect,
    SurveyQuestion_Text,
} from '@/types'
import {
    copyToClipboard,
    getUUID,
    msgError,
    msgSuccess,
    noticeError,
    saveFile,
    unrefRecursion,
} from '@/utils'
import { defineStore } from 'pinia'
import i18n from '@/locale'
import { SURVEY_TYPE_INPUT_CONTENT } from '@/constants'
const { t } = i18n.global

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

interface SurveyStore {
    create: {
        curStep: 1 | 2 | 3
        survey: MakeOptional<Survey, 'id'>
        isFetch: boolean
        isCaching: boolean
        cacheTime: string
    }
    allSurvey: {
        isFetch: boolean

        /** 所有问卷，包含已删除的等等 */
        all: OneSurvey[]
        draft: OneSurvey[]
        publish: OneSurvey[]
        stop: OneSurvey[]
        trash: OneSurvey[]
    }
}

const useSurveyStore = defineStore('survey', {
    state: (): SurveyStore => ({
        create: {
            isCaching: false,
            isFetch: false,
            cacheTime: '',

            curStep: 1,
            survey: {
                id: undefined,
                title: '',
                comment: '',
                version: '0.1.0',
                questions: [],
            },
        },
        allSurvey: {
            isFetch: false,
            all: [],
            draft: [],
            publish: [],
            stop: [],
            trash: [],
        },
    }),

    getters: {
        /** 获取当前正在编辑的问卷 id，可能为空 */
        getCurEditSurveyId(state) {
            return state.create.survey.id
        },
        /** 获取当前创建问卷处于哪一步 */
        getCurEditSurveyStep(state) {
            return state.create.curStep
        },
        /** 获取当前正在编辑的问卷 */
        getCurEditSurvey(state) {
            return state.create.survey
        },
        /** 获取最新的缓存时间 */
        getNewCacheTime(state) {
            if (state.create.cacheTime === '') {
                return t('view.survey.create.not-cached')
            }
            return state.create.cacheTime
        },
    },

    actions: {
        /** 获取一份问卷的信息，用于编辑 */
        async fetchOneSurveyEdit(surveyId: number) {
            if (this.$state.create.isFetch) return

            this.$state.create.isFetch = true
            const res = await apiGetSurveyById(surveyId)
            if (res.ok) {
                this.$state.create.survey.title = res.data.title
                this.$state.create.survey.comment = res.data.comment
                this.$state.create.survey.version = res.data.questions.version
                this.$state.create.survey.questions =
                    res.data.questions.questions
            } else {
                noticeError(res.msg)
            }
            this.$state.create.isFetch = false
        },

        /** 编辑一份已经存在的问卷 */
        editSurvey(survey: OneSurvey) {
            this.$state.create.survey.id = survey.id
            this.fetchOneSurveyEdit(survey.id)
            router.push({ path: '/survey/create' })
            this.createGotoNext(2)
        },

        /** 创建问卷三步走 */
        createGotoNext(step: 1 | 2 | 3) {
            const surveyId = this.$state.create.survey.id
            console.log(step, surveyId)
            if (step > 1 && !surveyId) {
                msgError('view.survey.create.pleaseCreateFirst')
                return
            }
            // if (step === 1 && surveyId) {
            //     msgError('view.survey.create.hasOneEditSurvey')
            //     return
            // }

            this.$state.create.curStep = step
        },

        /** 新建一份问卷 */
        async createNewSurvey() {
            NProgress.start()
            const data = await apiNewSurvey()
            if (!data.ok) {
                NProgress.done()
                msgError('view.survey.crate.wrong')
                return
            }
            this.$state.create.survey.id = data.data.surveyId
            console.log(data)
            this.createGotoNext(2)
            NProgress.done()
        },

        /** 缓存当前正在编辑的问卷 */
        async cacheCurEditSurvey() {
            const isCaching = this.$state.create.isCaching
            if (isCaching) return
            const surveyID = this.$state.create.survey.id
            console.log(surveyID)
            if (!surveyID) {
                msgError('surveyId 不存在，无法缓存，这里是 surveyStore')
                return
            }
            NProgress.start()
            this.$state.create.isCaching = true

            const reqData = JSON.parse(
                JSON.stringify({
                    id: surveyID,
                    title: this.$state.create.survey.title,
                    comment: this.$state.create.survey.comment,
                    structure_json: {
                        version: '0.0.1',
                        questions: this.$state.create.survey.questions,
                    },
                }),
            )
            const resData = await apiCacheSurvey(reqData)
            if (!resData.ok) {
                noticeError(resData.msg)
            } else {
                this.$state.create.cacheTime = new Date(
                    resData.data.time,
                ).toLocaleTimeString()
            }
            this.$state.create.isCaching = false
            NProgress.done()
        },

        /** 导入问卷模版 */
        importSurvey(_survey: Survey) {
            if (!this.$state.create.survey.id) {
                msgError('view.survey.error.not-survey-id')
                return
            }
            this.$state.create.survey.title = _survey.title
            this.$state.create.survey.comment = _survey.comment
            this.$state.create.survey.questions = _survey.questions
            this.$state.create.survey.version = _survey.version
        },
        /** 导出问卷模版 */
        exportSurvey() {
            const _survey = unrefRecursion(this.$state.create.survey)
            const jsonStr = JSON.stringify(_survey, null, 4)
            const x = t('view.survey.create.utils.export.filename-template')
            saveFile(jsonStr, `${x} - ${_survey.title}.json`)
        },

        /** 编辑问卷时，点击新增一个问题 */
        addNewQuestionInEdit(questionType: SurveyQuestionType, order: number) {
            this.$state.create.survey.questions.splice(
                order,
                0,
                generateQuestion(questionType, order),
            )
            this.$state.create.survey.questions.forEach(
                (item, i) => (item.order = i + 1),
            )
        },

        /** 编辑问卷时，删除一个问题 */
        removeOneQuestionInEdit(order: number) {
            // if (!survey.value) {
            //     msgError('survey 不存在，这里是 storeSurvey')
            //     return
            // }
            // if (survey.value.questions.length < 2) {
            //     msgError('至少需要一个问题！')
            //     return
            // }
            // survey.value.questions.splice(order - 1, 1)
            // survey.value.questions.forEach((item, i) => (item.order = i + 1))
        },

        /** 清空当前正在编辑的问卷 */
        resetCreateSurvey() {
            this.$state.create = {
                isCaching: false,
                isFetch: false,
                cacheTime: '',

                curStep: 1,
                survey: {
                    id: undefined,
                    title: '',
                    comment: '',
                    version: '0.1.0',
                    questions: [],
                },
            }
        },

        /** 发布问卷 */
        async publishSurveyAfterEdit() {
            if (this.$state.create.isFetch) {
                return
            }

            this.$state.create.isFetch = true

            if (!this.$state.create.survey.id) {
                msgError('view.survey.error.not-survey-id')
                return
            }
            const res = await publishSurvey(this.$state.create.survey.id)
            if (!res.ok) {
                msgError(res.msg)
            } else {
                msgSuccess('view.survey.create.success.publish')
                this.resetCreateSurvey()
            }
            this.$state.create.isFetch = false
        },

        /** 后台异步获取用户的所有问卷 */
        async getAllSurveys() {
            if (this.$state.allSurvey.isFetch) {
                return
            }
            this.$state.allSurvey.isFetch = true

            const res = await apiGetAllSurveys()
            if (res.ok) {
                this.$state.allSurvey.all = res.data.all_surveys
                this.getAllSurveysSuccessCallback()
            } else {
                noticeError(res.msg)
            }

            this.$state.allSurvey.isFetch = false
        },
        /** 成功获取所有问卷后的回调 */
        getAllSurveysSuccessCallback() {
            // TODO: 这里其实是纯计算，可以考虑使用使用 worker 实现
            const allSurvey = this.$state.allSurvey.all
            const draft: OneSurvey[] = []
            const publish: OneSurvey[] = []
            const stop: OneSurvey[] = []
            const trash: OneSurvey[] = []
            // allSurvey.sort((a, b) => a.sort_order - b.sort_order)

            allSurvey.forEach((s) => {
                if (s.is_deleted) {
                    trash.push(s)
                } else if (s.is_draft) {
                    draft.push(s)
                } else if (s.is_valid) {
                    publish.push(s)
                } else {
                    stop.push(s)
                }
            })
            this.$state.allSurvey.draft = draft
            this.$state.allSurvey.publish = publish
            this.$state.allSurvey.stop = stop
            this.$state.allSurvey.trash = trash
        },
    },
})

// TODO: 根据 type，指定返回的类型
function generateQuestion(type: SurveyQuestionType, order: number) {
    if (type === SURVEY_TYPE_INPUT_CONTENT) {
        const q: SurveyQuestion_Text = {
            id: getUUID(),
            isRequired: true,
            order,
            questionType: type,
            questionContent: {
                title: '',
                describe: '',
            },
        }
        return q
    }
    // if (type === SURVEY_TYPE_SINGLE_SELECT || type === SURVEY_TYPE_MULTI_SELECT) {
    const q: SurveyQuestion_SingleSelect = {
        id: getUUID(),
        isRequired: true,
        order,
        // @ts-ignore
        questionType: type,
        questionContent: {
            titles: [
                {
                    id: getUUID(),
                    title: '',
                    describe: '',
                },
            ],
            options: [''],
        },
    }
    return q
    // }
}

export default useSurveyStore
