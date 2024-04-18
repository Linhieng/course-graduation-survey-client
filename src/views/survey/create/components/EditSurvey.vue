<script setup lang="ts">
import { ref } from 'vue'
import EditQuestion from './widget/EditQuestion.vue'
import NewQuestion from './widget/NewQuestion.vue'

import { useStoreSurvey } from '@/store'
const storeSurvey = useStoreSurvey()

// 所有数据的获取，均通过 store
const survey = storeSurvey.getSurveyRef()

// 该组件中，只负责修改 title 和 content
const survey_title = ref('')
const survey_comment = ref('')
</script>

<template>
    <h1>
        {{ $t('view.survey.create.step.edit') }}
    </h1>
    <div class="top-wrapper">
        {{ survey }}
        <h1>
            <el-input
                v-model="survey_title"
                autosize
                type="textarea"
                :placeholder="$t('view.survey.create.placeholder.input-title')"
            />
        </h1>
        <p>
            <el-input
                v-model="survey_comment"
                autosize
                type="textarea"
                :placeholder="
                    $t('view.survey.create.placeholder.input-command')
                "
            />
        </p>
    </div>
    <ul class="questions-wrapper">
        <div v-if="!survey">
            {{ $t('view.survey.crate.wrong') }}
        </div>
        <div v-else-if="survey.questions.length < 1">
            <li class="question-item-wrapper">
                <NewQuestion :order="1" />
                <el-divider />
            </li>
        </div>
        <div v-else>
            <li
                v-for="q of survey?.questions"
                :key="q.id"
                class="question-item-wrapper"
                :style="{ '--item-order': q.order }"
            >
                <div class="survey-edit">
                    <EditQuestion :question="q" />
                </div>
                <NewQuestion :order="q.order" />
                <el-divider />
            </li>
        </div>
    </ul>
</template>

<style scoped lang="scss">
ul {
    list-style: none;
}

.top-wrapper {
    margin-bottom: 20px;
    padding: 20px;
    :deep(textarea) {
        field-sizing: content;
    }
    h1 :deep(textarea) {
        font-weight: bold;
        font-size: 2rem;
        text-align: center;
    }
    p :deep(textarea) {
        font-size: 1.3rem;
        text-indent: 2rem;
        padding: 0px;
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
