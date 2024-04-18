export { default as useStoreSurvey } from './storeSurvey'

import { apiNewSurvey } from '@/api'
import { msgError } from '@/utils'
import { defineStore } from 'pinia'

interface SurveyStore {
    create: {
        curStep: 1 | 2 | 3
        surveyId?: number
    }
}

const useSurveyStore = defineStore('survey', {
    state: (): SurveyStore => ({
        create: {
            curStep: 1,
            surveyId: undefined,
        },
    }),

    getters: {
        /** 获取当前正在编辑的问卷 id，可能为空 */
        getCurEditSurveyId(state: SurveyStore) {
            return state.create.surveyId
        },
        /** 获取当前创建问卷处于哪一步 */
        getCurEditSurveyStep(state: SurveyStore) {
            return state.create.curStep
        },
    },

    actions: {
        /** 创建问卷三步走 */
        createGotoNext(step: 1 | 2 | 3) {
            const surveyId = this.$state.create.surveyId
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
            const data = await apiNewSurvey()
            if (!data.ok) {
                msgError('view.survey.crate.wrong')
                return
            }
            this.$state.create.surveyId = data.data.surveyId
            this.createGotoNext(2)
        },
    },
})

export default useSurveyStore
