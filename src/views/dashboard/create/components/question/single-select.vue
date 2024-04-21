<script setup lang="ts">
import { QuestionItem } from '@/store/modules/create/types';
import { useCreateStore } from '@/store';
const createStore = useCreateStore();
defineProps<{
    question: QuestionItem;
    questionIndex: number;
}>();
</script>

<template>
    <a-space direction="vertical" fill>
        <a-textarea
            v-model="createStore.survey.questionList[questionIndex].desc"
            class="desc"
            :auto-size="{ minRows: 3 }"
            placeholder="在这里输入问题描述信息"
        ></a-textarea>

        <template v-if="createStore.survey.questionList[questionIndex].options.length < 1">
            <a-button shape="circle" @click="createStore.addOption(questionIndex, 0, question.type)">
                <template #icon>
                    <icon-font :size="18" name="add" />
                </template>
            </a-button>
        </template>
        <template v-else>
            <div
                class="option-item-box"
                v-for="(option, i) in createStore.survey.questionList[questionIndex].options"
                :key="option.id"
            >
                <a-textarea
                    class="input"
                    auto-size
                    v-model="createStore.survey.questionList[questionIndex].options[i].text"
                ></a-textarea>
                <span class="single-icon">
                    <icon-font :size="18" name="circle" />
                </span>
                <a-space class="option-btns hide">
                    <a-button
                        type="dashed"
                        class="btn"
                        shape="circle"
                        size="small"
                        @click="createStore.addOption(questionIndex, option.index, question.type)"
                    >
                        <template #icon>
                            <icon-font :size="20" name="add" />
                        </template>
                    </a-button>
                    <a-button
                        type="dashed"
                        class="btn"
                        shape="circle"
                        size="small"
                        @click="createStore.removeOption(questionIndex, option.index)"
                    >
                        <template #icon>
                            <icon-font :size="20" name="remove" />
                        </template>
                    </a-button>
                </a-space>
            </div>
        </template>
    </a-space>
</template>

<style scoped lang="less">
.option-item-box {
    border: 1px solid #eee;
    border-radius: 30px;
    display: flex;
    align-items: center;
    padding-left: 20px;

    background-color: #c5ddf0;
    &:hover {
        background-color: #bcd3e9;
    }

    position: relative;

    .input {
        background: none;
        background-color: transparent;
        outline: none;
        border: none;
    }
    .single-icon {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
    }
    .option-btns {
        position: absolute;
        top: 2px;
        right: 6px;
        z-index: 1;
    }

    .hide {
        visibility: hidden;
    }
    &:hover .hide {
        visibility: visible;
    }
}
</style>
