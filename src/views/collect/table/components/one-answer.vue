<script setup lang="ts">
import { AnswerItem } from '@/store/modules/collect/types';

defineProps<{
    answerList: AnswerItem[];
}>();
</script>

<template>
    <a-space direction="vertical" fill>
        <a-space v-for="item in answerList" :key="item.id">
            <template v-if="item.type === 'single_text' || item.type === 'multi_text'">
                <p>{{ item.text }}</p>
            </template>
            <template v-if="item.type === 'single_select' || item.type === 'multi_select'">
                <p v-for="option in item.option_text">{{ option.text }}</p>
            </template>
        </a-space>
    </a-space>
</template>
