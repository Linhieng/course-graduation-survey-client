<script setup lang="ts">
import TopHeader from './components/TopHeader.vue'
import SidebarMenu from '@/components/sidebar-menu/index.vue'
import { useAppStore } from '@/store'
import PageLayout from './page-layout.vue'
const appStore = useAppStore()
</script>

<template>
    <section class="layout" :class="{ mobile: appStore.hideMenu }">
        <!-- 顶部 -->
        <header class="layout-header">
            <TopHeader />
        </header>
        <!-- 主体容器 -->
        <section class="layout-main container">
            <!-- 侧边栏 -->
            <nav class="container-sidebar">
                <SidebarMenu />
            </nav>
            <!-- 主体 -->
            <section class="container-content content">
                <!-- 这里用到了一种特殊的布局技巧 -->
                <div class="width-0">
                    <!-- 顶部标签 -->
                    <!-- <TabBar class="content-tabbar" /> -->
                    <!-- 同时也是路由渲染的主体 -->
                    <main class="content-main">
                        <PageLayout />
                    </main>
                    <!-- 底部版权 -->
                    <footer class="content-footer"></footer>
                </div>
            </section>
        </section>
    </section>
</template>

<style scoped lang="scss">
.layout {
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    min-height: 100vh;

    .layout-header {
        min-height: 60px;
        border-bottom: 1px solid #eee;
    }
    .layout-main {
        flex: 1 0 auto;

        display: flex;
    }
}
.layout-main.container {
    .container-sidebar {
        // min-width: 150px;
        width: auto;
        flex: 0 0 auto;
    }
    .container-content {
        flex: 1 0 auto;
        padding: 20px;

        display: flex;
        flex-direction: column;
    }
}

.container-content.content {
    // 当子元素不超出大小时，这个盒子的宽度就能够由父元素控制
    // 也就是始终撑满剩余宽度。
    // 当子元素溢出时，就会导致这里的盒子也溢出，但我们又不能把这里的盒子写死
    // 那么解决方案就是让子元素宽度永远为 0
    // 这样我们就能保证该元素的宽度始终等于
    overflow: auto;

    .width-0 {
        // 因为子元素宽度为 0，那么当孙子元素溢出时，他也影响不到 .content 盒子的宽度
        // 这样就可以只在 content 中生成滚动条。
        width: 0;
    }
}
</style>
