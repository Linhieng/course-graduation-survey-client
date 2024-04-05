import {
    apiGetAllSurveys,
    apiToggleSurveyDelete,
    apiToggleSurveyValid,
} from '@/api'
import { STATUS_SUCCEED } from '@/constants'
import type { OneSurvey } from '@/types'
import { copyToClipboard, msgSuccess, msgWarning } from '@/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useStoreHome = defineStore('storeHome', () => {
    const allSurvey = ref<OneSurvey[]>()
    const router = useRouter()

    const getAllSurveyRef = () => {
        return allSurvey
    }
    async function fetchAllSurvey() {
        const data = await apiGetAllSurveys()
        if (data.status === STATUS_SUCCEED) {
            allSurvey.value = data.data.all_surveys
        }
    }

    const toChangeSurvey = (survey: OneSurvey) => {
        if (!survey.is_draft) {
            msgWarning('已发布的问卷不允许修改，请重新创建')
            return
        }
        router.push({
            name: 'create',
            params: { id: survey.id },
        })
    }

    const copyLink = (survey: OneSurvey) => {
        const link = `http://localhost:5173/answer/${survey.id}`
        copyToClipboard(link)
        msgSuccess(`已复制： ${link}`)
    }

    const deleteSurvey = async (survey: OneSurvey) => {
        await apiToggleSurveyDelete(survey.id, true)
        fetchAllSurvey()
    }

    const toggleSurveyValid = async (survey: OneSurvey) => {
        await apiToggleSurveyValid(survey.id)
        fetchAllSurvey()
    }

    const toStatAnswer = (survey: OneSurvey) => {
        router.push({
            name: 'stat',
            params: {
                surveyId: survey.id,
            },
        })
    }

    return {
        allSurvey,
        fetchAllSurvey,
        getAllSurveyRef,
        toChangeSurvey,
        copyLink,
        deleteSurvey,
        toggleSurveyValid,
        toStatAnswer,
    }
})
