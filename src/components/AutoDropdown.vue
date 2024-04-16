<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { ArrowDown, Setting } from '@element-plus/icons-vue'

const { width } = useWindowSize()
const props = withDefaults(
    defineProps<{
        minWidth?: number
        size?: number | string
        slotItems: Array<any>
        titleShow: string
    }>(),
    {
        minWidth: 600,
        size: '70%',
    },
)
</script>

<template>
    <template v-if="width > props.minWidth">
        <ul class="row">
            <li v-for="item in props.slotItems">
                <slot name="item" v-bind="item"></slot>
            </li>
        </ul>
    </template>
    <template v-else>
        <el-dropdown>
            <el-button>
                <el-icon size="20">
                    <Setting />
                </el-icon>
                &nbsp; {{ titleShow }} &nbsp;
                <el-icon size="20">
                    <ArrowDown />
                </el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="item in props.slotItems">
                        <slot name="item" v-bind="item"></slot>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </template>
</template>

<style scoped lang="scss">
.row {
    display: flex;
}
</style>
