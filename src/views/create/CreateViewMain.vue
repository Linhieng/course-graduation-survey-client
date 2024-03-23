<script setup lang="ts">

import{ref} from 'vue'
import type {SurveyQuestionType,SurveyQuestionStruct} from '@/types'
import { SURVEY_TYPE_INPUT_CONTENT } from '@/constants'
import EditQuestion from './widget/EditQuestion.vue'
import NewQuestion, { type NewQuestionPayload } from './widget/NewQuestion.vue'
import {getUUID} from '@/utils'

const survey = ref<SurveyQuestionStruct[]>([{
    id: getUUID(),
    order: 1,
    type: SURVEY_TYPE_INPUT_CONTENT,
    content: {}
}])


// 生成一个问题对象
const generateQuestion = (order?: number, type?: SurveyQuestionType): SurveyQuestionStruct => {
    const question: SurveyQuestionStruct = {
        id: getUUID(),
        order: order || survey.value.length + 1,
        type: type || SURVEY_TYPE_INPUT_CONTENT,
        content: {}
    }
    return question
}

// 点击新增按钮，新建一个问题，内容由子组件提供
const evtNewQuestion = (payload: NewQuestionPayload) => {
    const order = payload.order

    // if (order === survey.value.length) {
    //     // 如果是在最后添加，则直接传递 undefined，不需要执行后面的 forEach。
    //     survey.value.push(generateQuestion(undefined, payload.type))
    //     return
    // }

    survey.value.splice(order, 0, generateQuestion(order + 1, payload.type))
    survey.value.forEach((item, i) => item.order = i+1)
    // const rawSurvey = survey.value
    // rawSurvey.splice(order, 0, generateQuestion(order + 1, payload.type))
    // rawSurvey.forEach((item, i) => item.order = i+1)
    // survey.value = rawSurvey
}
</script>

<template>
    <div class="create-workplace">
        <ul class="questions-wrapper">
            <li v-for="s of survey" :key="s.id"
                class="question-item-wrapper"
                :style="{'--item-order': s.order}"
            >
                <div class="survey-edit">
                    <EditQuestion :question="s" />
                </div>
                <NewQuestion :order="s.order" @new-question="evtNewQuestion" />
                <el-divider />
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">

// 处理每个问题的顺序样式
.questions-wrapper {
    display: flex;
    flex-direction: column;

    .question-item-wrapper {
        order: var(--item-order);
    }
}

</style>
