<script setup lang="ts">
import { CollectAnswer } from '@/store/modules/collect/types';
import { QuestionItem } from '@/store/modules/create/types';
import { questionTypeMappingText, questionTypeMappingColor } from '@/store/modules/create/utils';
import { onMounted, ref } from 'vue';
import ESingleText from './e-single-text.vue';
import ESingleSelect from './e-single-select.vue';

const props = defineProps<{
    questionList: QuestionItem[];
    answerList: CollectAnswer[];
}>();

/** 每个问题的统计数据，最终会用在 echart 的 option.data 上 */
const echartOptionDataList = ref<any[]>([]);

generateEchartOption();
/** 生成图表数据 */
function generateEchartOption() {
    /** 初始化答案统计数据 */
    props.questionList.forEach((item, i) => {
        if (item.type === 'single_text') {
            echartOptionDataList.value[i] = [];
        } else if (item.type === 'multi_text') {
            echartOptionDataList.value[i] = [];
        } else if (item.type === 'single_select') {
            const map = new Map();
            item.options.forEach((option) => {
                map.set(option.text, 0);
            });
            echartOptionDataList.value[i] = map;
        } else if (item.type === 'multi_select') {
            const map = new Map();
            item.options.forEach((option) => {
                map.set(option.text, 0);
            });
            echartOptionDataList.value[i] = map;
        }
    });

    const answerList = props.answerList;

    answerList.forEach((answer) => {
        /** 一个用户的所有回答 */
        const list = answer.answer_structure_json.data;
        list.forEach((item, i) => {
            if (item.type === 'single_text') {
                echartOptionDataList.value[i].push(item.text);
            } else if (item.type === 'multi_text') {
                echartOptionDataList.value[i].push(item.text);
            } else if (item.type === 'single_select') {
                const val = item.option_text[0].text;
                const map = echartOptionDataList.value[i];
                echartOptionDataList.value[i].set(val, 1 + map.get(val));
            } else if (item.type === 'multi_select') {
                item.option_text.map((item) => {
                    const val = item.text;
                    const map = echartOptionDataList.value[i];
                    echartOptionDataList.value[i].set(val, 1 + map.get(val));
                });
            }
        });
    });

    props.questionList.forEach((item, i) => {
        if (item.type === 'single_text') {
        } else if (item.type === 'multi_text') {
        } else if (item.type === 'single_select') {
            const map = echartOptionDataList.value[i] as Map<string, number>;
            echartOptionDataList.value[i] = [];
            map.forEach((value, name) => {
                echartOptionDataList.value[i].push({ value, name });
            });
        } else if (item.type === 'multi_select') {
            const map = echartOptionDataList.value[i] as Map<string, number>;
            echartOptionDataList.value[i] = [];
            map.forEach((value, name) => {
                echartOptionDataList.value[i].push({ value, name });
            });
        }
    });

    console.log(echartOptionDataList.value);
}
</script>

<template>
    <a-space direction="vertical" fill>
        <a-space v-for="(q, i) in questionList" direction="vertical" fill size="mini">
            <a-space>
                <a-tag :color="questionTypeMappingColor[q.type]">{{ questionTypeMappingText[q.type] }}</a-tag>
                <h2 style="margin: 0">{{ q.title }}</h2>
            </a-space>
            <a-space>
                <template v-if="q.type === 'single_text'">
                    <ESingleText />
                </template>
                <template v-else-if="q.type === 'multi_text'">
                    <ESingleText />
                </template>
                <template v-else-if="q.type === 'single_select'">
                    <ESingleSelect :echartData="echartOptionDataList[i]" />
                </template>
                <template v-else-if="q.type === 'multi_select'">
                    <ESingleSelect :echartData="echartOptionDataList[i]" />
                </template>
            </a-space>
        </a-space>
    </a-space>
</template>
