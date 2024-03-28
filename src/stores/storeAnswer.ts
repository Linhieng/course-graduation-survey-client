import { apiAnswerGetSurvey } from "@/api/answer"
import {
    STATUS_SUCCEED,
    SURVEY_TYPE_INPUT_CONTENT,
    SURVEY_TYPE_SINGLE_SELECT,
    SURVEY_TYPE_MULTI_SELECT,
} from "@/constants"
import type { Survey, SurveyQuestion, SurveyQuestionType } from "@/types"
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

    // TODO 重命名为 broadcastCheck
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

    /** 校验单个问题，其对应的 answer 是不是不合格的，返回 true 表示不合格 */
    const isOneAnswerFailure = (q: SurveyQuestion) => {
        const answer = surveyAnswer.value
        const index = q.order - 1
        if (!q.isRequired) return false
        if (!answer[index]) return true

        if (q.questionType === SURVEY_TYPE_INPUT_CONTENT) {
            if (answer[index].trim() === '') return true
            return false
        }
        if (q.questionType === SURVEY_TYPE_SINGLE_SELECT) {
            // 长度不够，pass
            if (answer[index].length < q.questionContent.titles.length) return true
            // 每一个选项都选了，说明合格
            if (answer[index].every(answerItem => answerItem)) return false
            return true
        }
        if (q.questionType === SURVEY_TYPE_MULTI_SELECT) {
            // 长度不够，pass
            if (answer[index].length < q.questionContent.titles.length) return true
            // 每一个选项中都有选一个，说明合格。
            if (answer[index].every(answerItem => answerItem.length > 0)) return false
            return true
        }
    }
    const isAnswerValid = () => {
        const len = surveyData.value?.questions.length
        // 数量不够，pass
        if (surveyAnswer.value.length !== len) return false
        // 有一个不合格，pass
        if (surveyData.value?.questions.some(isOneAnswerFailure)) {
            return false
        }
        return true
    }
    const submitAnswer = () => {
        if (isAnswerValid()) {
            submit()
        } else {
            // TODO: 这里能有更好的触发方式吗？是我遗漏了什么 pinia 的知识点吗？
            useStoreAnswer().checkAnswer()
        }
    }

    function submit() {
        console.log('已提交')
    }

    return {
        surveyData,
        surveyAnswer, // 不 return，浏览器中的 pinia 插件无法检测到
        setSurveyId,
        fetchSurvey,
        getSurveyDataRef,
        checkAnswer,
        submitAnswer,
        enrollNotFill,
        syncAnswer,
    }
})
