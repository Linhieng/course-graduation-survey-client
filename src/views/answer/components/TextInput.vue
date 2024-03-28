<script setup lang="ts">
import type { SurveyQuestion_Text } from '@/types'
import { ref } from 'vue'

const props = defineProps<{
    question: SurveyQuestion_Text
}>()

const answerText = ref('')
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
