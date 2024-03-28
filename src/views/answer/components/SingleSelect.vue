<script setup lang="ts">
import type { SurveyQuestion_SingleSelect } from '@/types'
import { ref } from 'vue'
import { useStoreAnswer } from '@/stores'

const storeAnswer = useStoreAnswer()
const props = defineProps<{
    question: SurveyQuestion_SingleSelect
}>()
const titles = props.question.questionContent.titles
const options = props.question.questionContent.options

const answerSingle = ref([])


const checkRequired = () => {
    const len = titles.length
    for (let i = 0; i < len; i++) {
        let ans = answerSingle.value[i]
        if (!ans) {
            storeAnswer.enrollNotFill(`第 ${props.question.order} - ${i + 1} 题还未填写！`)
            return
        }
    }
}
if (props.question.isRequired) {
    storeAnswer.$onAction(({ name }) => {
        if (name === 'checkAnswer') {
            checkRequired()
        }
    })
}
</script>

<template>
    <div class="wrap" v-for="(title, index) of titles"
        :key="title.id">
        <p>{{ title.title }}</p>
        <p>{{ title.describe }}</p>
        <div>
            <el-radio-group v-model="answerSingle[index]" size="large"
                class="radio-group">
                <el-radio v-for="(option, index) of options"
                    class="radio"
                    border
                    :key="index"
                    :label="option"
                    :value="option" />
            </el-radio-group>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    margin-bottom: 40px;

    p {
        margin-bottom: 20px;
    }

    p:nth-child(1) {
        font-size: large;
    }

    .radio-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .radio {
        margin: 0;
    }
}
</style>
