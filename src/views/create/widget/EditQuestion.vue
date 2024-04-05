<!--
    这个组件只负责负责处理单个问题，
    它会修改的数据只有：
        - 单个问题是否是必选
    然后具体的问题内容，由该组件进行分发。

 -->

<script setup lang="ts">
import {
    SURVEY_TYPE_INPUT_CONTENT,
    SURVEY_TYPE_MULTI_SELECT,
    SURVEY_TYPE_SINGLE_SELECT,
} from '@/constants'
import type { SurveyQuestion } from '@/types'
import { SurveyQuestionTypeMappingText, msgError } from '@/utils'
import InputText from './InputText.vue'
import SelectItem from './SelectItem.vue'
import { ref, watch } from 'vue'
import { useStoreSurvey } from '@/stores'

const props = defineProps<{
    question: SurveyQuestion
}>()
const storeSurvey = useStoreSurvey()
const survey = storeSurvey.getSurveyRef()
const isRequired = ref(true)

// 同步更改 storeSurvey 中的内容
watch(isRequired, () => {
    if (!survey || !survey.value) {
        msgError('无法获取 survey，这里是 EditQuestion')
        return
    }
    const index = props.question.order - 1
    survey.value.questions[index].isRequired = isRequired.value
})
</script>

<template>
    <div class="question-item">
        {{ props.question }}
        <p class="base-info">
            <span :class="{ 'is-required': isRequired }">{{
                props.question.order
            }}</span>
            <span>{{
                SurveyQuestionTypeMappingText(props.question.questionType)
            }}</span>
        </p>
        <div class="common-info">
            <p>是否必填 <el-switch v-model="isRequired" /></p>
        </div>
        <!-- 不同的问题类型，提供不同的编辑面板 -->
        <div class="question-content">
            <!-- 单文本输入框 -->
            <template
                v-if="props.question.questionType === SURVEY_TYPE_INPUT_CONTENT"
            >
                <InputText :question="props.question" />
            </template>
            <!-- 单选或多选 -->
            <template
                v-else-if="
                    props.question.questionType === SURVEY_TYPE_SINGLE_SELECT ||
                    props.question.questionType === SURVEY_TYPE_MULTI_SELECT
                "
            >
                <SelectItem
                    :selectType="props.question.questionType"
                    :question="props.question"
                />
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

        > * {
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
