<script setup lang="ts">
import { AnswerCollect, getAnswerCollectBySurveyId } from '@/api/collect';
import { QuestionItem } from '@/store/modules/create/types';
import { ref } from 'vue';
import AnswerStat from './answer-stat.vue';
import { CollectAnswer } from '@/store/modules/collect/types';
import { useAiStore } from '@/store';

const props = defineProps({
    surveyId: {
        type: Number,
        required: true,
    },
});

const aiStore = useAiStore();
const loading = ref(false);
const getOk = ref(false);

/** 问卷的问题 */
const questionList = ref<QuestionItem[]>([]);
/** 所有用户的所有答案 */
const answerList = ref<CollectAnswer[]>([]);

const stat = async () => {
    if (loading.value) return;
    loading.value = true;
    const res = await getAnswerCollectBySurveyId(props.surveyId);
    if (res.ok) {
        getOk.value = true;
        generateData(res.data);
        aiStore.state.showIcon = true;
        aiStore.state.questionList = res.data.surveyData.structure_json.questionList;
        aiStore.state.answerList = res.data.answerList;
    }
    loading.value = false;
};

/** 将答案数据转换为 eChart 图表数据 */
const generateData = (data: AnswerCollect) => {
    questionList.value = data.surveyData.structure_json.questionList;
    answerList.value = data.answerList;
};
</script>

<template>
    <div class="wrap">
        <a-button :loading="loading" type="primary" @click="stat">点击分析所有答案</a-button>
        <br />
        <div class="visual-box">
            <template v-if="getOk">
                <AnswerStat :questionList="questionList" :answerList="answerList" />
            </template>
        </div>
    </div>
</template>

<style scoped lang="less">
.visual-box {
    padding: 20px;
}
</style>
