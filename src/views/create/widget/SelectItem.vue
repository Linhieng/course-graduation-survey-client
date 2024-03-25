<script setup lang="ts">
import InputText from './InputText.vue'
import {
    SURVEY_TYPE_SINGLE_SELECT,
    SURVEY_TYPE_MULTI_SELECT
} from '@/constants'
import type { SurveyQuestion, SurveyQuestionContent_SingleSelect } from '@/types'
import { getUUID, msgError } from '@/utils'
import { ref, watch, watchEffect } from 'vue'
import { useStoreSurvey } from '@/stores'
import InputMultiple from '@/components/InputMultiple.vue'

const storeSurvey = useStoreSurvey()
const survey = storeSurvey.getSurveyRef()

const props = defineProps<{
    selectType: typeof SURVEY_TYPE_SINGLE_SELECT | typeof SURVEY_TYPE_MULTI_SELECT,
    question: SurveyQuestion
}>()
// const emits = defineEmits<{
//     (e: 'update', payload: SurveyQuestionContent_SingleSelect): void
// }>()

// 选项
const selectOptions = ref([''])
// 标题和描述信息
const selectTitles = ref([{ id: getUUID(), title: '', describe: '' }])
watch(selectOptions.value, () => {
    if (!survey || !survey.value) {
        msgError('获取不到 survey，这里是 SelectItem')
        return
    }
    const index = props.question.order - 1
    survey.value.questions[index].questionContent.options = selectOptions.value
})

if (props.question.questionContent.options) selectOptions.value = props.question.questionContent.options
if (props.question.questionContent.titles) selectTitles.value = props.question.questionContent.titles

// 添加一个选项
const evtAddOption = (index: number) => {
    selectOptions.value.splice(index + 1, 0, '')
}
// 移除一个选项
const evtRemoveOption = (index: number) => {
    if (selectOptions.value.length < 2) return
    selectOptions.value.splice(index, 1)
}

</script>

<template>
    <div>
        <div class="outer-wrapper">
            <InputMultiple v-model="selectTitles" />
        </div>
        <div class="outer-wrapper">
            <!-- 因为这里仅仅存储字符串而已，所以可以直接使用下标作为 key -->
            <div v-for="(item, index) in selectOptions"
                :key="index"
                class="mid-item">
                <el-input
                    v-model="selectOptions[index]" autosize type="textarea"
                    :placeholder="'请输入选项' + (index + 1) + '的内容'"
                    class="inner-shrink" />
                <div class="inner-button-s">
                    <el-button type="primary" class="btn" @click="() => { evtAddOption(index) }" circle>＋</el-button>
                    <el-button type="danger" class="btn" :disabled="selectOptions.length < 2"
                        @click="() => { evtRemoveOption(index) }" circle>一</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.outer-wrapper {
    .mid-item {
        padding: 5px;

        display: flex;
        align-items: center;

        >.inner-shrink {
            flex: 1 1;
            margin-right: 10px;
        }

        >.button-s {
            display: flex;
            flex-wrap: wrap;
        }
    }
}

.btn {
    flex: 0 0;
    padding: 0 5px;
    font-size: 1rem;

    &:hover {
        box-shadow: 0 0 4px skyblue;
    }
}
</style>
