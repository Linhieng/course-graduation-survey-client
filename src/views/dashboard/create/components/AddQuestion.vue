<script setup lang="ts">
defineProps<{
    order: number;
}>();
</script>

<template>
    <a-button class="btn">{{ $t('在这里添加一个问题') }} + {{ order }}</a-button>
</template>

<style scoped lang="less">
.btn {
    color: black;
}
</style>
