<script setup lang="ts">
import type { SurveyQuestion_Text } from '@/types'
import { ref } from 'vue'
import { useStoreAnswer } from '@/stores';

const storeAnswer = useStoreAnswer()
const props = defineProps<{
    question: SurveyQuestion_Text
}>()

const answerText = ref('')

const checkRequired = () => {
    const text = answerText.value.trim()
    if (text === '') {
        storeAnswer.enrollNotFill(`第 ${props.question.order} 题还未填写！`)
    }
}
if (props.question.isRequired) {
    storeAnswer.$onAction(({name})=> {
        if (name === 'checkAnswer') {
            checkRequired()
        }
    })
}
</script>

<template>
    <div class="wrap">
        <p>{{ props.question.questionContent.title }}</p>
        <p>{{ props.question.questionContent.describe }}</p>
        <p>
            <el-input
                v-model="answerText"
                :autosize="{ minRows: 3, maxRows: 10 }"
                type="textarea"
                placeholder="请输入"
            />
        </p>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    p {
        margin-bottom: 1rem;
    }
    p:nth-child(1) {
        font-size: large;
    }
}
</style>
