import { apiAnswerGetSurvey } from "@/api/answer"
import { STATUS_SUCCEED } from "@/constants"
import type { Survey } from "@/types"
import { msgError } from "@/utils"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { msgWarning } from '@/utils'

export const useStoreAnswer = defineStore('storeAnswer', () => {
    const surveyId = ref()
    const surveyData = ref<Survey>()
    const surveyAnswer = ref()
    const router = useRouter()
    // 处理用户频繁点击提交，导致多次显示 msg 消息！
    const isShowMsg = ref(false)

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
        const { id, title, comment, questions } = resData.data
        surveyData.value = {
            id, title, comment, questions: questions.questions
        }
        successCb && successCb(surveyData.value)
    }

    const getSurveyDataRef = () => {
        return surveyData
    }

    const checkAnswer = () => { }
    const enrollNotFill = (msg:string) => {
        if (isShowMsg.value) return
        msgWarning(msg)
        setTimeout(() => {
            isShowMsg.value = true
        })
        setTimeout(() => {
            isShowMsg.value = false
        }, 3000)
    }

    return {
        surveyData,
        setSurveyId,
        fetchSurvey,
        getSurveyDataRef,
        checkAnswer,
        enrollNotFill,
    }
})
