<script setup lang="ts">
import type { AnswerItem } from '@/store/modules/collect/types';
import type { QuestionItem, QuestionOption } from '@/store/modules/create/types';
import { questionTypeMappingText, questionTypeMappingColor } from '@/store/modules/create/utils';

defineProps<{
    answerList: AnswerItem[];
    questionList: QuestionItem[];
}>();
</script>

<template>
    <a-space direction="vertical" fill>
        <a-space v-for="(q, i) in questionList" direction="vertical" fill size="mini">
            <a-space>
                <a-tag :color="questionTypeMappingColor[q.type]">{{ questionTypeMappingText[q.type] }}</a-tag>
                <h2 style="margin: 0">{{ q.title }}</h2>
            </a-space>
            <a-space v-if="q.type !== 'desc'">
                <p style="margin-left: 2rem">用户回答：</p>
                <template v-if="q.type === 'single_text' || q.type === 'multi_text'">
                    <p>{{ answerList[i].text }}</p>
                </template>
                <template v-if="q.type === 'single_select' || q.type === 'multi_select'">
                    <p v-for="option in answerList[i].option_text">{{ option.text }}</p>
                </template>
            </a-space>
        </a-space>
        <!-- <a-space v-for="item in answerList" :key="item.id">
            <template v-if="item.type === 'single_text' || item.type === 'multi_text'">
                <p>{{ item.text }}</p>
            </template>
            <template v-if="item.type === 'single_select' || item.type === 'multi_select'">
                <p v-for="option in item.option_text">{{ option.text }}</p>
            </template>
        </a-space> -->
    </a-space>
</template>
