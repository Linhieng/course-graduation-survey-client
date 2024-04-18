<script setup lang="ts">
import { ref } from 'vue'
import {
    SURVEY_TYPE_INPUT_CONTENT as input_content,
    SURVEY_TYPE_SINGLE_SELECT as single_select,
    SURVEY_TYPE_MULTI_SELECT as multi_select,
} from '@/constants'
import type { SurveyQuestionType } from '@/types'
import { useSurveyStore } from '@/store'
const surveyStore = useSurveyStore()

const props = defineProps<{
    order: number
}>()

const btnAddQuestion = (type: SurveyQuestionType) => {
    const order = props.order
    surveyStore.addNewQuestionInEdit(type, order)
}

////////////////////////////////////////////////////////////////////
// 为 UI 服务
////////////////////////////////////////////////////////////////////
const showOptions = ref(false)
</script>

<template>
    <div class="toggle-utils-show" @click="showOptions = !showOptions">
        <span></span>
        <p>{{ showOptions ? '关闭选项' : '展开选项' }}</p>
        <span></span>
    </div>
    <div class="show-options" :class="{ 'is-show': showOptions }">
        <div class="options-content">
            <el-button round @click="btnAddQuestion(input_content)">{{
                $t('view.survey.create.new.input')
            }}</el-button>
            <el-button round @click="btnAddQuestion(single_select)">{{
                $t('view.survey.create.new.single-select')
            }}</el-button>
            <el-button round @click="btnAddQuestion(multi_select)">{{
                $t('view.survey.create.new.multi-select')
            }}</el-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.toggle-utils-show {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    cursor: pointer;

    > p {
        color: #ddd;
        flex: max-content 0;
        font-size: 20px;
        padding: 0 10px;
    }

    > span {
        flex: 1 1;
        height: 1px;
        background-color: #eee;
    }

    &:hover {
        box-shadow: 0 0 5px #ccc;
    }
}

.show-options {
    height: 0;
    overflow: hidden;

    &.is-show {
        height: auto;
    }

    .options-content {
        display: flex;
        flex-wrap: wrap;

        > * {
            margin: 10px;
        }
    }
}
</style>
