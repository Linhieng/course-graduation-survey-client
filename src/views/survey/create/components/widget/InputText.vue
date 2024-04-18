<!--
    该组件负责的是单个 文本输入 问题的问题内容
 -->

<script setup lang="ts">
import type { SurveyQuestion_Text } from '@/types'
import { ref, watch } from 'vue'
import { useSurveyStore } from '@/store'
import { msgError } from '@/utils'
import InputRequired from '@/components/InputRequired.vue'
import InputOptional from '@/components/InputOptional.vue'

const surveyStore = useSurveyStore()
const props = defineProps<{
    question: SurveyQuestion_Text
}>()
const title = ref('')
const describe = ref('')
watch([title, describe], () => {
    const index = props.question.order - 1
    surveyStore.$state.create.survey.questions[index].questionContent.title =
        title.value
    surveyStore.$state.create.survey.questions[index].questionContent.describe =
        describe.value
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
