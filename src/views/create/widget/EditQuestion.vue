<script setup lang="ts">
import { SURVEY_TYPE_INPUT_CONTENT, SURVEY_TYPE_MULTI_SELECT, SURVEY_TYPE_SINGLE_SELECT } from '@/constants'
import type { SurveyQuestionStruct } from '@/types'
import { SurveyQuestionTypeMappingText } from '@/utils'
import InputText, { type InputTextEmitPayload } from './InputText.vue'
import SelectItem, { type SelectItemEmitPayload } from './SelectItem.vue'
import { ref } from 'vue'

export interface OneQuestionPayload<T = InputTextEmitPayload | SelectItemEmitPayload> {
    commonInfo: {
        isRequired: boolean
    },
    content: T
}

const props = defineProps<{
    question: SurveyQuestionStruct
}>()
const emits = defineEmits<{
    (e: 'update-content', payload: OneQuestionPayload): void
}>()

const commonInfo = ref<{
    isRequired: boolean
}>({ isRequired: true })

const forwardEvent = (payload: any) => {
    emits('update-content', {
        commonInfo: commonInfo.value,
        content: payload
    })
}

</script>

<template>
    <div class="question-item ">
        <p class="base-info">
            <span :class="{ 'is-required': commonInfo.isRequired }">{{ props.question.order }}</span>
            <span>{{ SurveyQuestionTypeMappingText(props.question.type) }}</span>
        </p>
        <div class="common-info">
            <p>是否必填 <el-switch v-model="commonInfo.isRequired" /> </p>
        </div>
        <!-- 不同的问题类型，提供不同的编辑面板 -->
        <div class="question-content">
            <!-- 单文本输入框 -->
            <template v-if="props.question.type === SURVEY_TYPE_INPUT_CONTENT">
                <InputText @update="forwardEvent" />
            </template>
            <!-- 单选或多选 -->
            <template
                v-else-if="props.question.type === SURVEY_TYPE_SINGLE_SELECT || props.question.type === SURVEY_TYPE_MULTI_SELECT">
                <SelectItem :selectType="props.question.type"
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
