<template>
    <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in" appear>
            <!-- LAYOUT: 控制是否缓存页面数据，也就是 state 不会清空。 -->
            <component :is="Component" v-if="route.meta.ignoreCache" :key="route.fullPath" />
            <keep-alive v-else :include="cacheList">
                <component :is="Component" :key="route.fullPath" />
            </keep-alive>
        </transition>
    </router-view>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useTabBarStore } from '@/store';

const tabBarStore = useTabBarStore();

const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="scss"></style>
