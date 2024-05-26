<script setup lang="ts">
import { QuestionItem } from '@/store/modules/create/types';
import SingleText from './question/single-text.vue';
import MultiText from './question/multi-text.vue';
import SingleSelect from './question/single-select.vue';
import MultiSelect from './question/multi-select.vue';
import MatrixSingleSelect from './question/matrix-single-select.vue';

const props = defineProps<{
    question: QuestionItem;
    index: number;
}>();
</script>

<template>
    <!-- 这里是不是可以换成 component 动态组件？ -->
    <template v-if="question.type === 'desc'"></template>
    <single-text v-else-if="question.type === 'single_text'" :question="question" :index="index" />
    <multi-text v-else-if="question.type === 'multi_text'" :question="question" :index="index" />
    <single-select v-else-if="question.type === 'single_select'" :question="question" :questionIndex="index" />
    <multi-select v-else-if="question.type === 'multi_select'" :question="question" :questionIndex="index" />
    <matrix-single-select
        v-else-if="question.type === 'matrix_single_select' || question.type === 'matrix_multi_select'"
        :question="question"
        :questionIndex="index"
    />
</template>
