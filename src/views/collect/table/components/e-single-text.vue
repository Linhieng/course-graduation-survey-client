<script setup lang="ts">
const props = defineProps<{
    echartData: string[];
}>();
</script>
<template>
    <div class="wrap">
        <a-tag style="margin: 10px" size="large" v-for="val of echartData">{{ val }}</a-tag>
    </div>
</template>

<style scoped lang="less">
.wrap {
    width: 100%;
    background-color: #fff;
}
</style>
