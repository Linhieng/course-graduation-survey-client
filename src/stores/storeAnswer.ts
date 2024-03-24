import { apiAnswerGetSurvey } from "@/api/answer"
import { STATUS_SUCCEED } from "@/constants"
import type { Survey } from "@/types"
import { msgError } from "@/utils"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useRouter } from "vue-router"

export const useStoreAnswer = defineStore('storeAnswer', () => {
    const surveyId = ref()
    const surveyData = ref<Survey>()
    const router = useRouter()

    const setSurveyId = (id: number | string) => {
        id = Number(id)
        if (Number.isNaN(id)) {
            router.replace({ name: 'home' })
            msgError('问卷 id 错误')
            return
        }
        surveyId.value = id
    }

    const fetchSurvey = async (successCb?: (successData: Survey) => void, errorCb?: (errorMsg: string) => void) => {
        const resData = await apiAnswerGetSurvey(surveyId.value)
        if (resData.status !== STATUS_SUCCEED) {
            msgError(resData.msg)
            errorCb && errorCb(resData.msg)
            router.replace({ name: 'NotFound' })
            return
        }

        surveyData.value = resData.data
        successCb && successCb(resData.data)
    }

    return {
        surveyData,
        setSurveyId,
        fetchSurvey
    }
})
