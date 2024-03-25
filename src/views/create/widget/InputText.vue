<!--
    该组件负责的是单个 文本输入 问题的问题内容
 -->

<script setup lang="ts">

import type { SurveyQuestion, SurveyQuestionContent_Text } from '@/types'
import { ref, watch, watchEffect } from 'vue'
import { useStoreSurvey } from '@/stores';
import { msgError } from '@/utils'

const storeSurvey = useStoreSurvey()
const survey = storeSurvey.getSurveyRef()
const props = defineProps<{
    question: SurveyQuestion
}>()

// const emit = defineEmits<{
//     (e: 'update', payload: SurveyQuestionContent_Text): void,
// }>()
const title = ref('')
const describe = ref('')
watch([title, describe], () => {
    if (!survey || !survey.value) {
        msgError('无法获取 survey，这里是 InputText')
        return
    }
    const index = props.question.order - 1
    survey.value.questions[index].questionContent.title = title.value
    survey.value.questions[index].questionContent.describe = describe.value
})

if (props.question?.questionContent.title) title.value = props.question.questionContent.title
if (props.question?.questionContent.describe) describe.value = props.question.questionContent.describe

// watchEffect(() => {
//     emit('update', { title: title.value, describe: describe.value })
// })

//////////////////////////////////////////////////////
// UI 相关
//////////////////////////////////////////////////////

const isHasInputDescribe = ref(false)
</script>

<template>
    <div class="input-text-wrapper">
        <div class="input-title">
            <el-input v-model="title" style="width: 100%" autosize type="textarea" placeholder="请输入问题标题" />
        </div>
        <div class="input-describe" :class="{ 'is-has-input-describe': !isHasInputDescribe }">
            <el-input v-model="describe" autosize type="textarea" :disabled="!isHasInputDescribe"
                placeholder="请输入描述信息" />
            <el-switch v-model="isHasInputDescribe"
                class="switch" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.input-text-wrapper {
    margin: 4px;
}

.input-title {
    width: 100%;
    margin-bottom: 10px;
}

.input-describe {
    width: 100%;
    display: flex;

    .switch {
        margin-left: 10px;
    }

    &.is-has-input-describe {
        opacity: 0.3;
    }
}
</style>
