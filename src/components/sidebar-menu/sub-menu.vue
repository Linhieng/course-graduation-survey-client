<script setup lang="ts">
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { useRouter } from 'vue-router'
const props = defineProps<{
    route: RouteRecordRaw & { meta: RouteMeta }
}>()
const router = useRouter()
const goRoute = (route: RouteRecordRaw) => {
    router.push({
        path: route.path,
    })
}
</script>

<template>
    <template v-if="props.route?.children && props.route?.children.length > 0">
        <el-sub-menu :index="props.route.path">
            <template #title>
                <el-icon :size="20" v-if="props.route.meta.icon">
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
        <el-menu-item
            :index="props.route.path"
            @click="() => goRoute(props.route)"
        >
            <el-icon :size="20" v-if="props.route.meta.icon">
                <component :is="props.route.meta.icon" />
            </el-icon>
            <template #title>
                {{ $t(props.route.meta.locale) }}
            </template>
        </el-menu-item>
    </template>
</template>

<style scoped lang="scss"></style>
