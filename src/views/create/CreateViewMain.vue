<!--
    该组件负责更改的数据内容：
        - 问卷的  title
        - 问卷的 comment
        - 问卷中所有问题数组，可以对他们进行增删改顺序操作
 -->

<script setup lang="ts">
import { ref, watch } from 'vue'
import EditQuestion from './widget/EditQuestion.vue'
import NewQuestion, { type NewQuestionPayload } from './widget/NewQuestion.vue'
import { msgError } from '@/utils'
import { useStoreSurvey } from '@/store'

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

// 新建一个问题
const btnNewQuestion = (payload: NewQuestionPayload) => {
    const order = payload.order
    const type = payload.type
    storeSurvey.addOneQuestion(type, order)
}
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
                    placeholder="输入问卷标题"
                />
            </h1>
            <p>
                <el-input
                    v-model="survey_comment"
                    autosize
                    type="textarea"
                    placeholder="输入问卷备注信息"
                />
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
            <div v-else-if="!_survey">
                <p>出错了，不存在问卷</p>
            </div>
            <div v-else-if="_survey.questions.length < 1">
                <li class="question-item-wrapper">
                    <NewQuestion :order="1" @new-question="btnNewQuestion" />
                    <el-divider />
                </li>
            </div>
            <div v-else>
                <li
                    v-for="q of _survey?.questions"
                    :key="q.id"
                    class="question-item-wrapper"
                    :style="{ '--item-order': q.order }"
                >
                    <div class="survey-edit">
                        <EditQuestion :question="q" />
                    </div>
                    <NewQuestion
                        :order="q.order"
                        @new-question="btnNewQuestion"
                    />
                    <el-divider />
                </li>
            </div>
        </ul>
    </div>
</template>

<style scoped lang="scss">
ul {
    list-style: none;
}

.top-wrapper {
    margin-bottom: 20px;
    padding: 20px;
    h1 :deep(textarea) {
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
