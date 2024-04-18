<script setup lang="ts">
import {
    SURVEY_TYPE_SINGLE_SELECT,
    SURVEY_TYPE_MULTI_SELECT,
} from '@/constants'
import type {
    SurveyQuestion_MultiSelect,
    SurveyQuestion_SingleSelect,
} from '@/types'
import { getUUID } from '@/utils'
import { ref } from 'vue'
import InputMultiple from '@/components/InputMultiple.vue'
import InputMultipleOne from '@/components/InputMultipleOne.vue'

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

// TODO 理清楚这里的原理。真没想到自己写着写着，就写出了这么吊的代码。
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
