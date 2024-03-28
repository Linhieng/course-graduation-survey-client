<script setup lang="ts">
import type { SurveyQuestion_MultiSelect } from '@/types'
import { ref, watch } from 'vue'
import { useStoreAnswer } from '@/stores'

const storeAnswer = useStoreAnswer()
const props = defineProps<{
    question: SurveyQuestion_MultiSelect
}>()
const titles = props.question.questionContent.titles
const options = props.question.questionContent.options

const answerMultiple = ref([])

watch(answerMultiple.value, () => {
    storeAnswer.syncAnswer(props.question.order, answerMultiple.value)
})

const checkRequired = () => {
    const len = titles.length
    if (len === 1) {
        if (!answerMultiple.value[0]) {
            storeAnswer.enrollNotFill(`第 ${props.question.order} 题还未填写！`)
        }
    } else {
        for (let i = 0; i < len; i++) {
            let ans = answerMultiple.value[i]
            if (!ans) {
                storeAnswer.enrollNotFill(`第 ${props.question.order} - ${i + 1} 题还未填写！`)
                return
            }
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


////////////////////////////////////////////////
// 为 UI 服务
////////////////////////////////////////////////
const showOrder = (index: number) => {
    if (titles.length > 1) {
        return props.question.order + '-' + (index + 1)
    } else {
        return props.question.order
    }
}
</script>

<template>
    <div class="wrap" v-for="(title, index) of titles"
        :key="title.id"
        :class="{required: props.question.isRequired}"
        >
        <p>{{ showOrder(index) }} {{ title.title }}</p>
        <p>{{ title.describe }}</p>
        <div>
            <el-checkbox-group v-model="answerMultiple[index]" size="large"
                class="checkbox-group">
                <el-checkbox v-for="(option, index) of options"
                    border
                    class="checkbox-item"
                    :key="index"
                    :label="option"
                    :value="option" />
            </el-checkbox-group>
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

    .checkbox-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .checkbox-item {
        margin: 10px;
    }
}

// 显示必选 * 符号
.wrap {
    position: relative;
}
.wrap::before {
    content: '';
    position: absolute;
    top: 0;
    left: -0.5rem;
}
.wrap.required::before {
    content: '*';
    color: red;
}
</style>
