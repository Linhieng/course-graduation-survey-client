<script setup lang="ts">
import NotFound from '@/views/not-found/index.vue';
import { ref } from 'vue';
import { useCollectStore } from '@/store';

const collectStore = useCollectStore();
const props = defineProps<{
    surveyId: string | number;
}>();

if (!isNaN(Number(props.surveyId))) {
    collectStore.fetchAnswerCollectBySurveyId(Number(props.surveyId));
}
</script>

<template>
    <div>
        <template v-if="isNaN(Number(surveyId))">
            <NotFound backName="collect-entry" backText="回到查询列表">找不到对应问卷 {{ surveyId }}</NotFound>
        </template>
        <template v-else>
            <template v-if="collectStore.state.loading.fetchAnswerCollectBySurveyId">加载中……</template>
            <template v-else>
                <ul>
                    <li v-for="item in collectStore.state.cur.answerList">
                        {{ item }}
                    </li>
                </ul>
            </template>
        </template>
    </div>
</template>
