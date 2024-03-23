<script setup lang="ts">
import { SURVEY_TYPE_INPUT_CONTENT, SURVEY_TYPE_MULTI_SELECT, SURVEY_TYPE_SINGLE_SELECT } from '@/constants'
import type { SurveyQuestionStruct } from '@/types'
import { SurveyQuestionTypeMappingText } from '@/utils'
import { ref } from 'vue'
import InputText from './InputText.vue'
import SelectItem from './SelectItem.vue'

const props = defineProps<{
    question: SurveyQuestionStruct
}>()

// 用户输入的内容
const userInputContent = ref<any>(null)

</script>

<template>
    <div class="question-item ">
        <p class="base-info">
            <span>{{ props.question.order }}</span>
            <span>{{ SurveyQuestionTypeMappingText(props.question.type) }}</span>
        </p>
        <div class="question-content">
            <!-- 不同的问题类型，提供不同的编辑面板 -->
            <template v-if="props.question.type === SURVEY_TYPE_INPUT_CONTENT">
                <InputText />
            </template>
            <template v-else-if="props.question.type === SURVEY_TYPE_SINGLE_SELECT || props.question.type === SURVEY_TYPE_MULTI_SELECT">
                <SelectItem :selectType="props.question.type" />
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.question-item {
    margin-top: 20px;
    padding: 20px;

    animation: show 3s;

    @keyframes show {
        0% {
            box-shadow: 0 0 10px orchid;
        }
        100% {
            box-shadow: none;
        }
    }

    .base-info {
        padding: 4px;
        padding-bottom: 10px;

        display: flex;
        align-items: center;

        >* {
            margin-right: 20px;
        }
    }
}

</style>
