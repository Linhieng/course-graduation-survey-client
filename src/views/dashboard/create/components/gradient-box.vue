<script setup lang="ts">
const props = defineProps<{
    bg: string;
}>();
</script>

<template>
    <div
        :style="{
            backgroundImage: bg,
        }"
    ></div>
</template>

<style scoped>
div {
    width: 35px;
    height: 35px;
    box-shadow: 0 0 3px 3px #eee;
}
</style>
