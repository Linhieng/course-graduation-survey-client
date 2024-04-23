<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { msgWarning } from '@/utils/msg';
import NotFound from '@/views/not-found/index.vue';
import { getAnswerCollectBySurveyId } from '@/api/collect';
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
const { loading, setLoading } = useLoading();
const props = defineProps<{
    surveyId: string | number;
}>();
const collectList = ref(Array(8).fill({}));
fetchAnswerList();
async function fetchAnswerList() {
    const surveyId = Number(props.surveyId);
    if (Number.isNaN(surveyId)) return;
    if (loading.value) return;
    setLoading(true);
    const res = await getAnswerCollectBySurveyId(surveyId);
    if (res.ok) {
        collectList.value = res.data.answerList;
    }
    setLoading(false);
}
</script>

<template>
    <div>
        <template v-if="isNaN(Number(surveyId))">
            <NotFound backName="collect-entry" backText="回到查询列表">找不到对应问卷 {{ surveyId }}</NotFound>
        </template>
        <template v-else>
            <template v-if="loading">加载中……</template>
            <template v-else>
                <ul>
                    <li v-for="item in collectList">
                        {{ item }}
                    </li>
                </ul>
            </template>
        </template>
    </div>
</template>
