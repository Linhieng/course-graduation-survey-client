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
    const isFetch = ref(true)

    const gerIsFetchRef = () => {
        return isFetch
    }
    const getAllSurveyRef = () => {
        return allSurvey
    }
    async function fetchAllSurvey() {
        isFetch.value = true
        const data = await apiGetAllSurveys()
        isFetch.value = false
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
        isFetch.value = true
        await apiToggleSurveyDelete(survey.id, true)
        fetchAllSurvey()
    }

    const toggleSurveyValid = async (survey: OneSurvey) => {
        isFetch.value = true
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
        isFetch,
        allSurvey,
        gerIsFetchRef,
        fetchAllSurvey,
        getAllSurveyRef,
        toChangeSurvey,
        copyLink,
        deleteSurvey,
        toggleSurveyValid,
        toStatAnswer,
    }
})
