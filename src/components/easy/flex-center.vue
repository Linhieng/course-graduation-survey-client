<template>
    <div :style="{ width: size, height: size }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    size: string;
}>();
</script>

<style scoped lang="less">
div {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
