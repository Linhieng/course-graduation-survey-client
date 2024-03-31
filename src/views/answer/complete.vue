<script setup lang="ts">
import IconComplete from '@/components/icons/IconComplete.vue'
const props = defineProps<{
    msg: string
}>()
</script>

<template>
    <div class="wrap">
        <el-icon :size="100">
            <IconComplete />
        </el-icon>
        <p>{{ props.msg }}</p>
        <el-button type="primary">创建问卷</el-button>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
        text-align: center;
        font-size: 2rem;
        margin: 30px;
    }
}
</style>
