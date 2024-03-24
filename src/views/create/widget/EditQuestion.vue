<script setup lang="ts">
import { SURVEY_TYPE_INPUT_CONTENT, SURVEY_TYPE_MULTI_SELECT, SURVEY_TYPE_SINGLE_SELECT } from '@/constants'
import type { SurveyQuestion, QuestionContentType } from '@/types'
import { SurveyQuestionTypeMappingText } from '@/utils'
import InputText from './InputText.vue'
import SelectItem from './SelectItem.vue'
import { ref } from 'vue'

const props = defineProps<{
    question: SurveyQuestion
}>()
const emits = defineEmits<{
    (e: 'update-content', question: SurveyQuestion): void
}>()

const isRequired = ref(true)

const forwardEvent = (questionContent: QuestionContentType) => {
    const surveyQuestion: SurveyQuestion = {
        isRequired:  isRequired.value,
        id: props.question.id,
        order: props.question.order,
        questionType: props.question.questionType,
        questionContent
    }
    emits('update-content', surveyQuestion)
}

</script>

<template>
    <div class="question-item ">
        <p class="base-info">
            <span :class="{ 'is-required': isRequired }">{{ props.question.order }}</span>
            <span>{{ SurveyQuestionTypeMappingText(props.question.questionType) }}</span>
        </p>
        <div class="common-info">
            <p>是否必填 <el-switch v-model="isRequired" /> </p>
        </div>
        <!-- 不同的问题类型，提供不同的编辑面板 -->
        <div class="question-content">
            <!-- 单文本输入框 -->
            <template v-if="props.question.questionType === SURVEY_TYPE_INPUT_CONTENT">
                <InputText :question="props.question" @update="forwardEvent" />
            </template>
            <!-- 单选或多选 -->
            <template
                v-else-if="props.question.questionType === SURVEY_TYPE_SINGLE_SELECT || props.question.questionType === SURVEY_TYPE_MULTI_SELECT">
                <SelectItem :selectType="props.question.questionType"
                    :question="props.question"
                    @update="forwardEvent" />
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.question-item {
    margin-top: 20px;
    padding: 20px;

    .base-info {
        padding: 4px;
        padding-bottom: 10px;

        display: flex;
        align-items: center;

        >* {
            margin-right: 20px;
        }
    }

    .common-info {
        padding: 10px;
    }
}

// 新建一个问题时，给出动画效果
.question-item {
    animation: show 3s;

    @keyframes show {
        0% {
            box-shadow: 0 0 10px orchid;
        }

        100% {
            box-shadow: none;
        }
    }
}

.is-required::before {
    content: '*';
    color: red;
}
</style>
