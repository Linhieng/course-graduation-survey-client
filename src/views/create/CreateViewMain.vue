<script setup lang="ts">

import { ref, onMounted, watchEffect } from 'vue'
import type { SurveyQuestionType, SurveyQuestionStruct, Survey, SurveyQuestion } from '@/types'
import { STATUS_SUCCEED, SURVEY_TYPE_INPUT_CONTENT } from '@/constants'
import EditQuestion, { type OneQuestionPayload } from './widget/EditQuestion.vue'
import NewQuestion, { type NewQuestionPayload } from './widget/NewQuestion.vue'
import { getUUID } from '@/utils'
import {useRoute} from 'vue-router'

const route = useRoute()
const surveyId = Number(route.query.surveyId)

const questions = ref<SurveyQuestion[]>([{
    isRequired: true,
    order: 1,
    questionType: 'input_content',
    questionContent: {
        title: '',
        describe: '',
    }
}])

const survey = ref<Survey>({
    id: surveyId,
    title: '未命名标题',
    comment: '',
    questions: questions.value
})
const hasGetSurvey = ref(false)
const surveyTitle = ref('')
const surveyComment = ref('')

onMounted(() => {
    // TODO: 获取问卷信息
})

watchEffect(() => {
    survey.value.title = surveyTitle.value
    survey.value.comment = surveyComment.value
})

// // 生成一个问题对象
// const generateQuestion = (order?: number, type?: SurveyQuestionType): SurveyQuestionStruct => {
//     const question: SurveyQuestionStruct = {
//         id: getUUID(),
//         order: order || survey.value.length + 1,
//         type: type || SURVEY_TYPE_INPUT_CONTENT,
//         content: {}
//     }
//     return question
// }

// // 点击新增按钮，新建一个问题，内容由子组件提供
// const evtNewQuestion = (payload: NewQuestionPayload) => {
//     const order = payload.order
//     survey.value.splice(order, 0, generateQuestion(order + 1, payload.type))
//     survey.value.forEach((item, i) => item.order = i+1)
// }

// // 用户编辑每个问题的内容。
// const updateContent = (order: number, payload: OneQuestionPayload)  => {
//     survey.value[order - 1].content = payload
// }
</script>

<template>
    <div class="create-workplace">
        <div class="top-wrapper">
            <h1>
                <el-input
                    v-model="surveyTitle"
                    autosize
                    type="textarea"
                    placeholder="输入问卷标题"
                     />
            </h1>
            <p>
                <el-input
                    v-model="surveyComment"
                    autosize
                    type="textarea"
                    placeholder="输入问卷备注信息"
                     />
            </p>
        </div>
        <ul class="questions-wrapper">
            <!-- <li v-for="s of survey" :key="s.id"
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
            </li> -->
        </ul>
    </div>
</template>

<style scoped lang="scss">

.top-wrapper {
    margin-bottom: 20px;
    padding: 20px;
}

// 处理每个问题的顺序样式
.questions-wrapper {
    display: flex;
    flex-direction: column;

    .question-item-wrapper {
        order: var(--item-order);
    }
}
</style>
