import { apiAnswerGetSurvey } from "@/api/answer"
import { STATUS_SUCCEED } from "@/constants"
import type { Survey } from "@/types"
import { msgError } from "@/utils"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useStoreAnswer = defineStore('storeAnswer', () => {
    const surveyId = ref()
    const surveyData = ref<Survey>()

    const setSurveyId = (id: number) => {
        surveyId.value = id
    }

    const fetchSurvey = async (successCb?: (successData: Survey)=>void, errorCb?: (errorMsg:string)=>void) => {
        const resData = await apiAnswerGetSurvey(surveyId.value)
        if (resData.status !== STATUS_SUCCEED) {
            msgError(resData.msg)
            errorCb && errorCb(resData.msg)
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
