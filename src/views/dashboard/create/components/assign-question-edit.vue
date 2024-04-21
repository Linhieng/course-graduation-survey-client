<script setup lang="ts">
import { QuestionItem } from '@/store/modules/create/types';
import SingleText from './question/single-text.vue';

const props = defineProps<{
    question: QuestionItem;
    index: number;
}>();
</script>

<template>
    <single-text v-if="question.type === 'single_text'" :question="question" :index="index" />
</template>
