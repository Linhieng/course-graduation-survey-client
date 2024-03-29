<!--
    该组件负责更改的数据内容：
        - 问卷的  title
        - 问卷的 comment
        - 问卷中所有问题数组，可以对他们进行增删改顺序操作
 -->

<script setup lang="ts">

import { ref, onMounted, watchEffect, watch, onBeforeUnmount, nextTick } from 'vue'
import type { SurveyQuestionType, Survey, SurveyQuestion } from '@/types'
import { STATUS_SUCCEED, SURVEY_TYPE_INPUT_CONTENT } from '@/constants'
import EditQuestion from './widget/EditQuestion.vue'
import NewQuestion, { type NewQuestionPayload } from './widget/NewQuestion.vue'
import { getUUID, debounce, msgError } from '@/utils'
import { useRoute } from 'vue-router'
import { useStoreSurvey } from '@/stores'
import { apiCacheSurvey } from '@/api'

// 所有数据的获取，均通过 store
const storeSurvey = useStoreSurvey()
const _survey = storeSurvey.getSurveyRef()
// 该组件中，只负责修改 title 和 content
const survey_title = ref('')
const survey_comment = ref('')
// 是否正在加载问卷
const isLoading = ref(true)
watch([survey_title, survey_comment], () => {
    if (!_survey || !_survey.value) return
    _survey.value.title = survey_title.value
    _survey.value.comment = survey_comment.value
})

storeSurvey.$onAction(({ name, after }) => {
    if (name === 'importSurvey') {
        after((survey) => {
            if (!survey || !survey.value) {
                msgError('导入失败，检测不到 survey')
                return
            }
            survey_title.value = survey.value.title
            survey_comment.value = survey.value.comment
        })
    }
})
storeSurvey.addTask((survey) => {
    if (!survey.value) {
        msgError('无法获取 survey，这里是 create view main')
        return
    }
    isLoading.value = false
    survey_title.value = survey.value.title
    survey_comment.value = survey.value.comment
})
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

// const route = useRoute()
// const surveyId = Number(route.query.surveyId)


// const questions = ref<SurveyQuestion[]>([{
//     id: getUUID(),
//     isRequired: true,
//     order: 1,
//     questionType: 'input_content',
//     questionContent: {
//         title: '',
//         describe: '',
//     }
// }])

// const survey = ref<Survey>({
//     id: surveyId,
//     title: '未命名标题',
//     comment: '',
//     // @ts-ignore
//     questions // 如果设置为 questions = questions.value ，则会丢失响应式
// })
// const hasGetSurvey = ref(false)
// const surveyTitle = ref('')
// const surveyComment = ref('')

// // 变更后，1 秒内缓存对应数据
// const cacheSurvey = debounce(() => {
//     storeSurvey.setSurvey(survey.value)
// }, 1000)

// // 定时将问卷数据同步到数据库中
// const timer = setInterval(storeSurvey.cacheSurvey, 1000 * 10)

// onBeforeUnmount(() => {
//     clearInterval(timer)
// })
// onMounted(() => {
//     // TODO: 获取问卷信息
// })

// watchEffect(() => {
//     survey.value.title = surveyTitle.value
//     survey.value.comment = surveyComment.value
//     cacheSurvey()
// })


// // 生成一个 SurveyQuestion 对象
// const generateQuestion = (order: number, questionType: SurveyQuestionType): SurveyQuestion => {
//     const question: SurveyQuestion = {
//         id: getUUID(),
//         order: order,
//         questionType,
//         // @ts-ignore
//         questionContent: {}
//     }
//     return question
// }

// 新建一个问题
const btnNewQuestion = (payload: NewQuestionPayload) => {
    const order = payload.order
    const type = payload.type
    storeSurvey.addOneQuestion(type, order)
}

// // 用户编辑每个问题的内容。
const updateContent = (question: SurveyQuestion) => {
    // const order = question.order
    // questions.value[order - 1].questionContent = question.questionContent
    // cacheSurvey()
}

// 监听 导入问卷事件
// storeSurvey.$onAction(
//     ({
//         name, // action 名称
//         store, // store 实例，类似 `someStore`
//         args, // 传递给 action 的参数数组
//         after, // 在 action 返回或解决后的钩子
//         onError, // action 抛出或拒绝的钩子
//     }) => {
//         if (name === 'importSurvey') {
//             after((s) => {
//                 surveyTitle.value = s.title
//                 surveyComment.value = s.comment
//                 questions.value = s.questions
//             })
//         }
//     }
// )
</script>

<template>
    <div class="create-workplace">
        <div class="top-wrapper">
            {{ _survey }}
            <h1>
                <el-input
                    v-model="survey_title"
                    autosize
                    type="textarea"
                    placeholder="输入问卷标题" />
            </h1>
            <p>
                <el-input
                    v-model="survey_comment"
                    autosize
                    type="textarea"
                    placeholder="输入问卷备注信息" />
            </p>
        </div>
        <ul class="questions-wrapper">
            <div v-if="isLoading" class="loading flex-all-center">
                <el-skeleton animated> </el-skeleton>
                <el-skeleton animated> </el-skeleton>
                <el-skeleton animated> </el-skeleton>
                <el-skeleton animated> </el-skeleton>
                <el-skeleton animated> </el-skeleton>
            </div>
            <div v-else>
                <li v-for="q of _survey?.questions" :key="q.id"
                    class="question-item-wrapper"
                    :style="{ '--item-order': q.order }">
                    <div class="survey-edit">
                        <EditQuestion
                            :question="q"
                            @update-content="updateContent" />
                    </div>
                    <NewQuestion :order="q.order" @new-question="btnNewQuestion" />
                    <el-divider />
                </li>
            </div>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.top-wrapper {
    margin-bottom: 20px;
    padding: 20px;
    h1 :deep(textarea)  {
        font-weight: bold;
        font-size: 2rem;
        text-align: center;
    }
    p :deep(textarea) {
        font-size: 1.3rem;
        text-indent: 2rem;
    }
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
