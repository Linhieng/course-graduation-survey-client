<script setup lang="ts">
// TODO: 拖拽过程中，鼠标小手变不了。
import Sortable from 'sortablejs';
import { computed, onMounted, ref } from 'vue';
import { useCreateStore } from '@/store';
import { QuestionItem } from '@/store/modules/create/types';
import AddQuestion from './AddQuestion.vue';
import { questionTypeMappingText } from '@/store/modules/create/utils';
const dragging = ref(false);
const createStore = useCreateStore();
const ul = ref();
const addBtn = ref();
const preSelected = ref<HTMLElement | null>(null);
const curSelectedQuestion = ref<QuestionItem | null>(null);

onMounted(() => {
    initSortable(ul.value);
    Sortable.create(ul.value);
});
function initSortable(el: HTMLElement) {
    new Sortable(el, {
        // 动画
        animation: 150,

        // 选中元素时添加对应类名
        chosenClass: 'chosen',

        // 只能在 .move-icon 上进行拖拽
        handle: '.move-icon',

        onStart() {
            clearStatus();
            dragging.value = true;
        },
        onEnd(evt) {
            // TODO:  evt.oldDraggableIndex 什么时候，可能会为 undefined ?
            // @ts-ignore
            createStore.swapQuestionOrder(evt.oldDraggableIndex, evt.newDraggableIndex);
            dragging.value = false;
        },
    });
}

function clearStatus() {
    if (preSelected.value !== null) {
        preSelected.value.classList.remove('selected');
    }
    preSelected.value = null;
    curSelectedQuestion.value = null;
    dragging.value = false;
}

function clickQuestion(evt: MouseEvent, question: QuestionItem) {
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
            v-for="question in createStore.$state.survey.questionList"
            :key="question.id"
            class="li"
            :style="{
                order: question.order,
            }"
            :class="{
                required: question.required,
            }"
            @click="(evt) => clickQuestion(evt, question)"
        >
            <div class="move-icon hide-item">
                <icon-font style="width: 26px; height: 26px" name="hand" />
            </div>
            <a-space class="li-top-title">
                <p>{{ $t(questionTypeMappingText[question.type]) }}</p>
            </a-space>
            <a-space class="li-top-util hide-item">
                <a-space size="mini">
                    <a-switch type="line" size="small" v-model="question.required" />
                    <span>{{ question.required ? $t('必填') : $t('选填') }}</span>
                </a-space>
                <a-divider direction="vertical" :size="0"></a-divider>
                <a-button type="primary" style="background-color: red" shape="circle" size="mini">
                    <template #icon>
                        <icon-font name="del" />
                    </template>
                </a-button>
            </a-space>

            <span class="order">{{ question.order + 1 }}</span>
            <a-textarea class="question-title" v-model="question.title"></a-textarea>
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
