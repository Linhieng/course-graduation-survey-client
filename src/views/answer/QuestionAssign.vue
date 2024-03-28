<script setup lang="ts">

import { SURVEY_TYPE_INPUT_CONTENT, SURVEY_TYPE_MULTI_SELECT, SURVEY_TYPE_SINGLE_SELECT } from '@/constants'
import type { SurveyQuestion } from '@/types';
import TextInput from './components/TextInput.vue'
import SingleSelect from './components/SingleSelect.vue'
import MultipleSelect from './components/MultipleSelect.vue'

const props = defineProps<{
    question: SurveyQuestion
}>()
</script>

<template>

    <template v-if="props.question.questionType === SURVEY_TYPE_INPUT_CONTENT">
        <TextInput :question="props.question" />
    </template>
    <template v-else-if="props.question.questionType === SURVEY_TYPE_SINGLE_SELECT">
        <SingleSelect :question="props.question" />
    </template>
    <template v-else-if="props.question.questionType === SURVEY_TYPE_MULTI_SELECT">
        <MultipleSelect :question="props.question" />
    </template>
    <template v-else>
        ???
    </template>

</template>

<style scoped lang="scss">

</style>
