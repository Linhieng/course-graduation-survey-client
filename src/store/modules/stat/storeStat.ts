import { apiGetStatData } from '@/api'
import { STATUS_SUCCEED } from '@/constants'
import type {
    Survey,
    SurveyQuestionContent_SingleSelect,
    SurveyQuestionType,
} from '@/types'
import type { Structure_Json } from '@/types/request'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface StatData {
    surveyData: {
        id: number
        title: string
        comment: string
        structure_json: Structure_Json
    }
    answersData: Array<{
        structure_json: any
    }>
}

/**
 * 转换为 echarts 所支持的数据格式。
 */
function toEchartsData(originData: any, type: 'single_select') {
    if (type === 'single_select') {
        // 单选项有多个问题，每个问题都对应一个图表
        const allData = [] as Array<Array<{ name: string; value: number }>>
        originData.forEach((item: Record<string, number>) => {
            const data = [] as Array<{ name: string; value: number }>
            Array.from(Object.entries(item)).forEach(([k, v], i) => {
                data[i] = {
                    name: k,
                    value: v,
                }
            })
            allData.push(data)
        })
        return allData
    }
}

export const useStoreStat = defineStore('storeStat', () => {
    const surveyId = ref()
    const statData = ref<StatData>()
    const surveyData = ref<Survey>()
    const answerData = ref()

    function getAnswerItemOptions(
        questionType: SurveyQuestionType,
        questionOrder: number,
    ) {
        if (questionType === 'single_select') {
            const questionContent = surveyData.value?.questions[
                questionOrder - 1
            ].questionContent as SurveyQuestionContent_SingleSelect
            let count = Array(questionContent.titles.length)
                .fill(0)
                .map(() => {
                    const obj = {} as Record<string, number>
                    questionContent.options.forEach((option) => {
                        obj[option] = 0
                    })
                    return obj
                })

            answerData.value.forEach((answerItem) => {
                const questionAnswerArr =
                    answerItem.structure_json[questionOrder - 1]
                questionAnswerArr.forEach((answer: string, i: number) => {
                    count[i][answer]++
                })
            })
            return toEchartsData(count, 'single_select')
        }
    }

    function getSurveyDataRef() {
        return surveyData
    }

    function setSurveyData(statData: StatData) {
        console.log(statData)
        answerData.value = statData.answersData
        const data = statData.surveyData
        surveyData.value = {
            title: data.title,
            comment: data.comment,
            questions: data.structure_json.questions,
        }
    }

    function setSurveyId(id: number | string) {
        surveyId.value = Number(id)
        fetchStatData()
    }

    async function fetchStatData() {
        const resData = await apiGetStatData(surveyId.value)
        if (resData.status === STATUS_SUCCEED) {
            statData.value = resData.data
            setSurveyData(resData.data)
        }
    }

    return {
        surveyId,
        setSurveyId,
        getSurveyDataRef,
        getAnswerItemOptions,
    }
})
