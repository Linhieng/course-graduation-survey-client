<script setup lang="ts">
import Sortable from 'sortablejs';
import { onMounted, ref } from 'vue';
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
        <li class="li">1</li>
        <li class="li">2</li>
        <li class="li">3</li>
        <li class="li">4</li>
        <li class="li">5</li>
        <li class="li">6</li>
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
