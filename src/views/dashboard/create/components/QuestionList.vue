<script setup lang="ts">
// TODO: 拖拽过程中，鼠标小手变不了。
import Sortable from 'sortablejs';
import { computed, onMounted, ref } from 'vue';
import { useCreateStore } from '@/store';
import type { QuestionItem } from '@/store/modules/create/types';
import AddQuestion from './AddQuestion.vue';
import { questionTypeMappingText, questionTypeMappingColor } from '@/store/modules/create/utils';
import AssignQuestionEdit from './assign-question-edit.vue';
const dragging = ref(false);
const createStore = useCreateStore();
const ul = ref();
const addBtn = ref();
const preSelected = ref<HTMLElement | null>(null);
const curSelectedQuestion = ref<QuestionItem | null>(null);

onMounted(() => {
    // initSortable(ul.value);
    // Sortable.create(ul.value);
});
/**
 * 经过实际测试，问卷的拖拽使用这种方式实现并对用户不友好。
 * 特别是当一个问题的长度过长时，拖拽时完全不知道是在拖拽什么。
 * 用户想要更好的实现拖拽，只能一次移动一个位置，这样操作起来才能让人接受。
 * 但这样一来，还不如实现一个上下移动的按钮呢！
 * 所以，想要更好的实现拖拽效果，最好还是在拖拽时将所有问题的高度设置为一行，
 * 这样才比较方便。
 *
 * 拖拽时的另一大问题就是滚动问题。拖拽过程中无法通过滚轮滚动界面，只能通过将鼠标移动
 * 到上方或者下方时才可以滚动。但这个滚动的速度又是不受控制的，还有的就是滚动的位置也是
 * 未知的——到底得将指针移动到哪里，才会发生滚动。
 */
// function initSortable(el: HTMLElement) {
//     new Sortable(el, {
//         // 动画
//         animation: 150,

//         // 选中元素时添加对应类名
//         chosenClass: 'chosen',

//         // 只能在 .move-icon 上进行拖拽
//         handle: '.move-icon',

//         onStart() {
//             clearStatus();
//             dragging.value = true;
//         },
//         onEnd(evt) {
//             // TODO:  evt.oldDraggableIndex 什么时候，可能会为 undefined ?
//             // @ts-ignore
//             createStore.swapQuestionOrder(evt.oldDraggableIndex, evt.newDraggableIndex);
//             dragging.value = false;
//         },
//     });
// }

// function clearStatus() {
//     if (preSelected.value !== null) {
//         preSelected.value.classList.remove('selected');
//     }
//     preSelected.value = null;
//     curSelectedQuestion.value = null;
//     dragging.value = false;
// }

function focusQuestion(evt: Event, question: QuestionItem) {
    curSelectedQuestion.value = question;
    const target = evt.currentTarget as HTMLElement;

    if (preSelected.value !== null) {
        preSelected.value.classList.remove('selected');
    }

    target.classList.add('selected');

    preSelected.value = target;
}

const addBtnOrder = computed(() => {
    return curSelectedQuestion.value ? curSelectedQuestion.value.order : createStore.questionList.length;
});
</script>
<template>
    <ul ref="ul" class="ul" :class="{ dragging }">
        <li
            v-for="(question, index) in createStore.survey.questionList"
            :key="question.id"
            class="li"
            :style="{
                order: question.order,
            }"
            :class="{
                required: question.required,
            }"
            @click="(evt) => focusQuestion(evt, question)"
            @focusin="(evt) => focusQuestion(evt, question)"
        >
            <a-tooltip :content="$t('点击进入拖拽操作')" position="right">
                <div class="move-icon hide-item" @click="createStore.showEditOrder = true">
                    <icon-font style="width: 26px; height: 26px" name="hand" />
                </div>
            </a-tooltip>
            <a-space class="li-top-title">
                <a-tag :color="questionTypeMappingColor[question.type]">
                    {{ $t(questionTypeMappingText[question.type]) }}
                </a-tag>
            </a-space>
            <a-space class="li-top-util hide-item">
                <a-button
                    shape="circle"
                    :disabled="index === 0"
                    @click="createStore.swapQuestionOrder(index, index - 1)"
                >
                    <template #icon>
                        <icon-caret-up style="font-size: 20px" />
                    </template>
                </a-button>
                <a-button
                    shape="circle"
                    :disabled="index === createStore.survey.questionList.length - 1"
                    @click="createStore.swapQuestionOrder(index, index + 1)"
                >
                    <template #icon>
                        <icon-caret-down style="font-size: 20px" />
                    </template>
                </a-button>

                <a-space size="mini" v-if="question.type !== 'desc'">
                    <a-switch type="line" size="small" v-model="question.required" />
                    <span>{{ question.required ? $t('必填') : $t('选填') }}</span>
                </a-space>
                <a-divider direction="vertical" :size="0"></a-divider>

                <a-popconfirm
                    v-if="createStore.config.confirmBeforeDel"
                    :content="$t('确认删除？')"
                    :okText="$t('⚠️删除')"
                    :cancelText="$t('取消')"
                    @ok="createStore.delQuestion(question.order)"
                >
                    <a-button type="primary" style="background-color: red" shape="circle" size="mini">
                        <template #icon>
                            <icon-font name="del" />
                        </template>
                    </a-button>
                </a-popconfirm>
                <a-button
                    v-else
                    @click="createStore.delQuestion(question.order)"
                    type="primary"
                    style="background-color: red"
                    shape="circle"
                    size="mini"
                >
                    <template #icon>
                        <icon-font name="del" />
                    </template>
                </a-button>
            </a-space>

            <span class="order">{{ question.order + 1 }}</span>
            <a-space direction="vertical" fill>
                <a-textarea class="question-title" auto-size v-model="question.title"></a-textarea>
                <assign-question-edit :question="question" :index="index" />
            </a-space>
            <a-space></a-space>
        </li>
        <div
            class="add-btn"
            ref="addBtn"
            :style="{
                order: addBtnOrder,
            }"
        >
            <AddQuestion :order="addBtnOrder" />
        </div>
    </ul>
</template>
<style></style>
<style scoped lang="less">
.ul {
    margin-top: 20px;
    list-style: none;
    padding-left: 30px;

    display: flex;
    flex-direction: column;

    .add-btn {
        margin: auto;
        margin-bottom: 20px;
    }
    .li {
        cursor: default;
        padding: 36px 10px 10px 30px;
        background-color: #eee;
        margin-bottom: 20px;
        position: relative;

        border-radius: 10px;

        .move-icon {
            cursor: grab;
            position: absolute;
            top: 0;
            left: 0;
            padding-top: 10px;
            padding-left: 10px;
        }
        .li-top-title {
            margin: 5px;
        }
        .li-top-util {
            position: absolute;
            top: 4px;
            right: 10px;
            height: 30px;
        }

        // 只在悬浮或者选中时显示的内容：
        .hide-item {
            visibility: hidden;
        }
        &:hover .hide-item {
            visibility: visible;
        }
        &.selected .hide-item {
            visibility: visible;
        }

        &.selected {
            box-shadow: 0 0 10px #eee;
            outline: 2px solid skyblue;
        }

        .order {
            position: absolute;
            top: 0;
            left: -2rem;
            font-size: 2rem;
        }
        &.required .order::before {
            content: '*';
            color: red;
            position: absolute;
            top: 3px;
            right: 1rem;
        }

        .question-title :deep(textarea) {
            font-weight: bold;
            font-size: 1.2rem;
        }
    }
    .li.chosen {
        opacity: 0.5;
    }
    .li {
        animation: show 1s;
    }
    @keyframes show {
        from {
            box-shadow: 0px 0px 34px 3px #5f6662;
        }
        to {
            box-shadow: none;
        }
    }
}
.dragging {
    .li {
        order: initial !important;
    }
    .hide-item {
        visibility: hidden !important;
    }
    .move-icon {
        visibility: hidden !important;
    }
    .add-btn {
        opacity: 0;
    }
}
</style>
