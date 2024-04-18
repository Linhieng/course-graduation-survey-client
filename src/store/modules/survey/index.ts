export { default as useStoreSurvey } from './storeSurvey'
import NProgress from 'nprogress'

import { apiCacheSurvey, apiNewSurvey } from '@/api'
import type {
    Survey,
    SurveyQuestionType,
    SurveyQuestion_SingleSelect,
    SurveyQuestion_Text,
} from '@/types'
import {
    getUUID,
    msgError,
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
        isCaching: boolean
        cacheTime: string
    }
}

const useSurveyStore = defineStore('survey', {
    state: (): SurveyStore => ({
        create: {
            isCaching: false,
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
        /** 创建问卷三步走 */
        createGotoNext(step: 1 | 2 | 3) {
            const surveyId = this.$state.create.survey.id
            console.log(step, surveyId)
            if (step > 1 && !surveyId) {
                msgError('view.survey.create.pleaseCreateFirst')
                return
            }
            if (step === 1 && surveyId) {
                msgError('view.survey.create.hasOneEditSurvey')
                return
            }

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
