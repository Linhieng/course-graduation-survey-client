<script setup lang="ts">
import Sortable from 'sortablejs';
import { onMounted, ref } from 'vue';
import { useCreateStore } from '@/store';
const createStore = useCreateStore();
const ul = ref();

onMounted(() => {
    initSortable(ul.value);
    Sortable.create(ul.value);
});

function initSortable(el: HTMLElement) {
    var sortable = new Sortable(el, {
        animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
    });
}
</script>
<template>
    <ul ref="ul" class="ul">
        <li v-for="question in createStore.questionList" :key="question.id">
            {{ question.title }}
        </li>
    </ul>
</template>

<style scoped lang="less">
.ul {
    li {
        padding: 20px;
        background-color: skyblue;
        margin: 20px;
    }
}
</style>
