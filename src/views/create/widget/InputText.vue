<!--
    该组件负责的是单个 文本输入 问题的问题内容
 -->

<script setup lang="ts">
import type { SurveyQuestion_Text } from '@/types'
import { ref, watch } from 'vue'
import { useStoreSurvey } from '@/stores'
import { msgError } from '@/utils'
import InputRequired from '@/components/InputRequired.vue'
import InputOptional from '@/components/InputOptional.vue'

const storeSurvey = useStoreSurvey()
const survey = storeSurvey.getSurveyRef()
const props = defineProps<{
    question: SurveyQuestion_Text
}>()
const title = ref('')
const describe = ref('')
watch([title, describe], () => {
    if (!survey || !survey.value) {
        msgError('无法获取 survey，这里是 InputText')
        return
    }
    const index = props.question.order - 1
    const q = survey.value.questions[index]
    if (q.questionType !== 'input_content') {
        msgError('问题类型错误，这里是 InputText')
        return
    }
    q.questionContent.title = title.value
    q.questionContent.describe = describe.value
})

if (props.question?.questionContent.title)
    title.value = props.question.questionContent.title
if (props.question?.questionContent.describe)
    describe.value = props.question.questionContent.describe
</script>

<template>
    <div class="warpper">
        <InputRequired v-model="title" placeholder="请输入标题" />
        <span></span>
        <InputOptional v-model="describe" placeholder="请输入描述" />
    </div>
</template>

<style scoped lang="scss">
.warpper span {
    display: block;
    width: 100%;
    height: 10px;
}
</style>
