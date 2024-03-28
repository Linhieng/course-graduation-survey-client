import { apiAnswerGetSurvey } from "@/api/answer"
import {
    STATUS_SUCCEED,
    SURVEY_TYPE_INPUT_CONTENT,
    SURVEY_TYPE_SINGLE_SELECT,
    SURVEY_TYPE_MULTI_SELECT,
} from "@/constants"
import type { Survey, SurveyQuestionType } from "@/types"
import { msgError } from "@/utils"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { msgWarning } from '@/utils'

type Answer = string | string[]

export const useStoreAnswer = defineStore('storeAnswer', () => {
    const surveyId = ref()
    const surveyData = ref<Survey>()
    const surveyAnswer = ref<Answer[]>([])
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
    const enrollNotFill = (msg: string) => {
        if (isShowMsg.value) return
        msgWarning(msg)
        setTimeout(() => {
            isShowMsg.value = true
        })
        setTimeout(() => {
            isShowMsg.value = false
        }, 3000)
    }

    const syncAnswer = (questionOrder: number, answer: any) => {
        surveyAnswer.value[questionOrder-1] = answer
    }

    return {
        surveyData,
        surveyAnswer, // 不 return，浏览器中的 pinia 插件无法检测到
        setSurveyId,
        fetchSurvey,
        getSurveyDataRef,
        checkAnswer,
        enrollNotFill,
        syncAnswer,
    }
})
