<script setup lang="ts">

import { ref, onMounted, watchEffect, watch, onBeforeUnmount } from 'vue'
import type { SurveyQuestionType, SurveyQuestionStruct, Survey, SurveyQuestion } from '@/types'
import { STATUS_SUCCEED, SURVEY_TYPE_INPUT_CONTENT } from '@/constants'
import EditQuestion from './widget/EditQuestion.vue'
import NewQuestion, { type NewQuestionPayload } from './widget/NewQuestion.vue'
import { getUUID, debounce, saveFile, noticeError, noticeInfo } from '@/utils'
import { useRoute } from 'vue-router'
import { useStoreSurvey } from '@/stores'
import { apiCacheSurvey } from '@/api'

const route = useRoute()
const surveyId = Number(route.query.surveyId)
const storeSurvey = useStoreSurvey()

const questions = ref<SurveyQuestion[]>([{
    id: getUUID(),
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
    // @ts-ignore
    questions // 如果设置为 questions = questions.value ，则会丢失响应式
})
const hasGetSurvey = ref(false)
const surveyTitle = ref('')
const surveyComment = ref('')

// 变更后，1 秒内缓存对应数据
const cacheSurvey = debounce(() => {
    storeSurvey.setSurvey(survey.value)
}, 1000)

// 定时将问卷数据同步到数据库中
const timer = setInterval(storeSurvey.cacheSurvey, 1000 * 10)

onBeforeUnmount(() => {
    clearInterval(timer)
})
onMounted(() => {
    // TODO: 获取问卷信息
})

watchEffect(() => {
    survey.value.title = surveyTitle.value
    survey.value.comment = surveyComment.value
    cacheSurvey()
})


// 生成一个 SurveyQuestion 对象
const generateQuestion = (order: number, questionType: SurveyQuestionType): SurveyQuestion => {
    const question: SurveyQuestion = {
        id: getUUID(),
        order: order,
        questionType,
        // @ts-ignore
        questionContent: {}
    }
    return question
}

// 点击新增按钮，新建一个问题，内容由子组件提供
const evtNewQuestion = (payload: NewQuestionPayload) => {
    const order = payload.order
    questions.value.splice(order, 0, generateQuestion(order + 1, payload.type))
    questions.value.forEach((item, i) => item.order = i + 1)
}

// 用户编辑每个问题的内容。
const updateContent = (question: SurveyQuestion) => {
    const order = question.order
    questions.value[order - 1].questionContent = question.questionContent
    cacheSurvey()
}

// 监听 导入问卷事件
storeSurvey.$onAction(
    ({
        name, // action 名称
        store, // store 实例，类似 `someStore`
        args, // 传递给 action 的参数数组
        after, // 在 action 返回或解决后的钩子
        onError, // action 抛出或拒绝的钩子
    }) => {
        if (name === 'importSurvey') {
            after((s) => {
                surveyTitle.value = s.title
                surveyComment.value = s.comment
                questions.value = s.questions
            })
        } else if (name === 'exportSurvey') {
            after(() => {
                const surveyJson = JSON.stringify(survey.value, null, 4)
                saveFile(surveyJson, `问卷模版 - ${survey.value.title}.json`)
                storeSurvey.setSurvey(survey.value)
            })
        }
    }
)
</script>

<template>
    <div class="create-workplace">
        <div class="top-wrapper">
            <h1>
                <el-input
                    v-model="surveyTitle"
                    autosize
                    type="textarea"
                    placeholder="输入问卷标题" />
            </h1>
            <p>
                <el-input
                    v-model="surveyComment"
                    autosize
                    type="textarea"
                    placeholder="输入问卷备注信息" />
            </p>
        </div>
        <ul class="questions-wrapper">
            <li v-for="q of questions" :key="q.id"
                class="question-item-wrapper"
                :style="{ '--item-order': q.order }">
                <div class="survey-edit">
                    <EditQuestion
                        :question="q"
                        @update-content="updateContent" />
                </div>
                <NewQuestion :order="q.order" @new-question="evtNewQuestion" />
                <el-divider />
            </li>
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
