<script setup lang="ts">
defineProps<{
    loading: boolean;
    val: number;
}>();
</script>

<template>
    <template v-if="loading">
        <div class="box">
            <div class="item" style="--duration: 300ms">
                <span v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">{{ i }}</span>
            </div>
        </div>
        <div class="box">
            <div class="item" style="--duration: 200ms">
                <span v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">{{ i }}</span>
            </div>
        </div>
        <div class="box">
            <div class="item" style="--duration: 100ms">
                <span v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">{{ i }}</span>
            </div>
        </div>
    </template>
    <span v-else style="font-size: 20px">{{ val }}</span>
</template>

<style scoped lang="less">
.box {
    font-size: 20px;
    width: 1em;
    height: 1em;
    overflow: hidden;
    margin: -3px;
}
.item {
    font-size: 20px;
    width: 1em;
    height: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    letter-spacing: 0.5em;
    animation: load var(--duration) linear infinite;
}
@keyframes load {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(1000%);
    }
    100% {
        transform: translateY(0%);
    }
}
</style>
