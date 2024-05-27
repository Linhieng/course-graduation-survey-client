<script setup lang="ts">
import type { QuestionItem } from '@/store/modules/create/types';
import { useCreateStore } from '@/store';
import { ref } from 'vue';
import { uniqueId } from 'lodash';
const createStore = useCreateStore();
const props = defineProps<{
    question: QuestionItem;
    questionIndex: number;
}>();

/** 这里会有点问题，就是不允许用户在单个标题中换行，尝试采用 \n 代替换行符 */
const batchStr = ref('');
const visible = ref(false);
const editType = ref<'titles' | 'options'>('options');

/** 批量编辑完成，更新到 state 中 */
const handleOk = () => {
    const data = batchStr.value.split(/\r?\n/).map((text, index) => {
        text = text.replace(/\\n/g, '\n');
        return { id: uniqueId(), text, url: '', index };
    });

    if (editType.value === 'titles') {
        createStore.survey.questionList[props.questionIndex].titles = data;
    } else if (editType.value === 'options') {
        createStore.survey.questionList[props.questionIndex].options = data;
    }
};
/** 点击批量编辑 titles 或 options */
const updateBatch = (type: 'titles' | 'options') => {
    editType.value = type;
    batchStr.value = createStore.survey.questionList[props.questionIndex][type]
        .map((item) => item.text.replace(/\r?\n/, '\\n'))
        .join('\n');
    visible.value = true;
};
</script>

<template>
    <a-space direction="vertical" fill>
        <a-textarea
            v-model="createStore.survey.questionList[questionIndex].desc"
            class="desc"
            :auto-size="{ minRows: 3 }"
            :placeholder="$t('在这里输入问题描述信息')"
        ></a-textarea>

        <div class="titles-container">
            <p class="font-h2">{{ $t('所有子问题的标题：') }}</p>
            <template v-if="createStore.survey.questionList[questionIndex].titles.length < 1">
                <a-button shape="circle" @click="createStore.addTitleItem(questionIndex, 0, question.type)">
                    <template #icon>
                        <icon-font :size="18" name="add" />
                    </template>
                </a-button>
            </template>
            <template v-else>
                <div
                    class="title-item-box"
                    v-for="(option, i) in createStore.survey.questionList[questionIndex].titles"
                    :key="option.id"
                >
                    <a-textarea
                        class="input"
                        auto-size
                        v-model="createStore.survey.questionList[questionIndex].titles[i].text"
                    ></a-textarea>
                    <a-space class="option-btns hide">
                        <a-button
                            type="dashed"
                            class="btn"
                            shape="circle"
                            size="small"
                            @click="createStore.addTitleItem(questionIndex, i, question.type)"
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
                            @click="createStore.removeTitleItem(questionIndex, i)"
                        >
                            <template #icon>
                                <icon-font :size="20" name="remove" />
                            </template>
                        </a-button>
                    </a-space>
                </div>
            </template>
            <div class="flex-right">
                <a-button @click="() => updateBatch('titles')">{{ $t('批量编辑') }}</a-button>
            </div>
        </div>

        <div class="options-container">
            <p class="font-h2">{{ $t('所有子问题的选项（相同）：') }}</p>
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
                        <icon-font
                            :size="18"
                            :name="props.question.type === 'matrix_single_select' ? 'circle' : 'square'"
                        />
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
            <div class="flex-right">
                <a-button @click="() => updateBatch('options')">{{ $t('批量编辑') }}</a-button>
            </div>
        </div>
    </a-space>
    <a-modal width="auto" v-model:visible="visible" @ok="handleOk" hide-title>
        <a-textarea class="a-textarea" v-model="batchStr"></a-textarea>
    </a-modal>
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

.title-item-box {
    position: relative;

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

.flex-right {
    display: flex;
    flex-direction: row-reverse;
}
.font-h2 {
    font-size: 1.1rem;
}
.a-textarea {
    :deep(textarea) {
        resize: both;
    }
}
</style>
