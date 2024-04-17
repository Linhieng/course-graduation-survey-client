<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
const props = defineProps<{
    route: RouteRecordRaw
}>()
</script>

<template>
    <template v-if="props.route?.children && props.route?.children.length > 0">
        <el-sub-menu :index="props.route.path">
            <template #title>
                <el-icon :size="20">
                    <component :is="props.route.meta.icon" />
                </el-icon>
                <span>{{ $t(props.route.meta.locale) }}</span>
            </template>
            <template v-for="route in props.route.children">
                <sub-menu :route />
            </template>
        </el-sub-menu>
    </template>
    <template v-else>
        <el-menu-item :index="props.route.path">
            <el-icon :size="20">
                <component :is="props.route.meta.icon" />
            </el-icon>
            <template #title>
                {{ $t(props.route.meta.locale) }}
            </template>
        </el-menu-item>
    </template>
</template>

<style scoped lang="scss"></style>
