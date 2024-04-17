<template>
    <router-view></router-view>
    <!-- 下面这种有点问题，似乎和缓存有关，导致得刷新后才会生效。 -->
    <!-- <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in" appear>
            <component
                :is="Component"
                v-if="route.meta.ignoreCache"
                :key="route.fullPath"
            />
            <keep-alive v-else>
                <component :is="Component" :key="route.fullPath" />
            </keep-alive>
        </transition>
    </router-view> -->
</template>

<script lang="ts" setup>
//   import { computed } from 'vue';
//   import { useTabBarStore } from '@/store';

//   const tabBarStore = useTabBarStore();

//   const cacheList = computed(() => tabBarStore.getCacheList);
</script>
