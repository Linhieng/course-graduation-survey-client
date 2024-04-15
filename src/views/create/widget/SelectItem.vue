<script setup lang="ts">
import {
    SURVEY_TYPE_SINGLE_SELECT,
    SURVEY_TYPE_MULTI_SELECT,
} from '@/constants'
import type {
    SurveyQuestion_MultiSelect,
    SurveyQuestion_SingleSelect,
} from '@/types'
import { getUUID, msgError } from '@/utils'
import { ref, watch } from 'vue'
import { useStoreSurvey } from '@/store'
import InputMultiple from '@/components/InputMultiple.vue'
import InputMultipleOne from '@/components/InputMultipleOne.vue'

const storeSurvey = useStoreSurvey()
const survey = storeSurvey.getSurveyRef()

const props = defineProps<{
    selectType:
        | typeof SURVEY_TYPE_SINGLE_SELECT
        | typeof SURVEY_TYPE_MULTI_SELECT
    question: SurveyQuestion_SingleSelect | SurveyQuestion_MultiSelect
}>()

// 选项
const selectOptions = ref([''])
// 标题和描述信息
const selectTitles = ref([{ id: getUUID(), title: '', describe: '' }])
watch(selectOptions.value, () => {
    // TODO: 为什么这里不会变化？但是 store 中的内容却能给变化？
    console.log('???', import.meta.env.MODE)
    if (!survey || !survey.value) {
        msgError('获取不到 survey，这里是 SelectItem')
        return
    }
    const index = props.question.order - 1
    const q = survey.value.questions[index]
    if (q.questionType !== 'single_select') {
        msgError('问题类型错误，这里是 SelectItem')
        return
    }
    q.questionContent.options = selectOptions.value
})

if (props.question.questionContent.options)
    selectOptions.value = props.question.questionContent.options
if (props.question.questionContent.titles)
    selectTitles.value = props.question.questionContent.titles
</script>

<template>
    <el-divider content-position="left">请在下面输入标题内容</el-divider>
    <div>
        <InputMultiple v-model="selectTitles" />
    </div>
    <el-divider content-position="left">请在下面输入选项内容</el-divider>
    <div>
        <InputMultipleOne v-model="selectOptions" />
    </div>
</template>

<style scoped lang="scss"></style>
