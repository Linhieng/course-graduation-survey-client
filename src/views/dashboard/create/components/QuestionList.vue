<script setup lang="ts">
// TODO: 拖拽过程中，鼠标小手变不了。
import Sortable from 'sortablejs';
import { computed, onMounted, ref } from 'vue';
import { useCreateStore } from '@/store';
import { QuestionItem } from '@/store/modules/create/types';
import AddQuestion from './AddQuestion.vue';
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
    console.log(target);
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
            v-for="question in createStore.questionList"
            :key="question.id"
            class="li"
            :style="{
                order: question.order,
            }"
            @click="(evt) => clickQuestion(evt, question)"
        >
            <div class="move-icon">
                <icon-font style="width: 26px; height: 26px" name="hand" />
            </div>
            <a-space> </a-space>

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

    display: flex;
    flex-direction: column;

    .add-btn {
        margin-bottom: 10px;
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
            visibility: hidden;
        }
        &:hover .move-icon {
            visibility: visible;
        }
        &.selected .move-icon {
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

        .question-title :deep(textarea) {
            font-weight: bold;
        }
    }
    .li.chosen {
        opacity: 0.5;
    }
}
.dragging {
    .li {
        order: initial !important;
    }
    .move-icon {
        visibility: hidden !important;
    }
}
</style>
