<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'

const props = withDefaults(
    defineProps<{
        minWidth?: number
        size?: number | string
    }>(),
    {
        minWidth: 600,
        size: '70%',
    },
)

const showDrawer = ref(false)

const { width } = useWindowSize()
</script>

<template>
    <template v-if="width > props.minWidth">
        <ul class="row">
            <slot></slot>
        </ul>
    </template>
    <template v-else>
        <el-button @click="showDrawer = !showDrawer"> 设置 </el-button>
        <el-drawer
            v-model="showDrawer"
            title="设置"
            direction="rtl"
            :size="props.size"
        >
            <ul class="column">
                <slot></slot>
            </ul>
        </el-drawer>
    </template>
</template>

<style scoped lang="scss">
ul {
    list-style: none;
    display: flex;
}

.row {
    align-items: center;
}
.column {
    flex-direction: column;
    justify-content: center;
}
</style>
