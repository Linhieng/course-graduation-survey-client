<script setup lang="ts">

import{ref} from 'vue'
import type {SurveyQuestionType,SurveyQuestionStruct} from '@/types'
import { SURVEY_TYPE_INPUT_CONTENT } from '@/constants'
import EditQuestion, { type OneQuestionPayload } from './widget/EditQuestion.vue'
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
    survey.value.splice(order, 0, generateQuestion(order + 1, payload.type))
    survey.value.forEach((item, i) => item.order = i+1)
}

// 用户编辑每个问题的内容。
const updateContent = (order: number, payload: OneQuestionPayload)  => {
    survey.value[order - 1].content = payload
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
                    <EditQuestion
                        :question="s"
                        @update-content="(payload) => {updateContent(s.order, payload)}"
                     />
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
