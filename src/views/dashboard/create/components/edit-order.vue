<script setup lang="ts">
import { useCreateStore } from '@/store';
import { questionTypeMappingColor, questionTypeMappingText } from '@/store/modules/create/utils';
import Sortable from 'sortablejs';
import { onMounted } from 'vue';

const createStore = useCreateStore();

onMounted(() => {
    const el = document.getElementById('id-edit-order-model') as HTMLElement;
    new Sortable(el, {
        animation: 150,
        // 选中元素时添加对应类名
        chosenClass: 'chosen',
        // 只能在 .drag-icon 上进行拖拽
        handle: '.drag-icon',
        onEnd(e: any) {
            const { oldDraggableIndex, newDraggableIndex } = e;
            createStore.swapQuestionOrder(oldDraggableIndex, newDraggableIndex);
        },
    });
});
</script>

<template>
    <div id="id-edit-order-model">
        <div
            v-for="(question, index) in createStore.$state.survey.questionList"
            :key="question.id"
            class="question-item"
        >
            <a-space>
                <div class="drag-icon">
                    <icon-drag-arrow />
                </div>
                <span>{{ index + 1 }}</span>
                <a-tag :color="questionTypeMappingColor[question.type]">
                    {{ $t(questionTypeMappingText[question.type]) }}
                </a-tag>
                <span class="title-limit">
                    {{ question.title }}
                </span>
            </a-space>
        </div>
    </div>
</template>

<style scoped lang="scss">
#id-edit-order-model {
    max-height: 70vh;
}
.question-item {
    padding: 4px 8px;
    border-radius: 4px;
}
.drag-icon {
    cursor: move;
}
.title-limit {
    width: 20rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.chosen {
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3);
}
</style>
