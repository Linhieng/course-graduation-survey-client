<script setup lang="ts">
import SubMenu from './sub-menu.vue'
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import IconExpand from '@icon/IconExpand.vue'
import IconShrink from '@icon/IconShrink.vue'
import IconDashboard from '@icon/IconDashboard.vue'
import { ref } from 'vue'
import appClientMenus from '@/router/app-menus'

const isCollapse = ref(false)

const menuTree = appClientMenus
console.log(appClientMenus)

// const menuTree: RouteRecordNormalized = [
//     {
//         path: '/dashboard',
//         name: 'menu.dashboard',
//         meta: {
//             locale: '',
//             icon: IconDashboard,
//             hideInMenu: false,
//             activeMenu: false,
//         },
//         children: [
//             {
//                 path: '/dashboard/workplace',
//                 name: 'menu.dashboard.workplace',
//                 meta: {
//                     locale: '',
//                     icon: IconDashboard,
//                     hideInMenu: false,
//                     activeMenu: false,
//                 },
//             },
//         ],
//     },
//     {
//         path: '/survey',
//         name: 'menu.survey',
//         meta: {
//             locale: '',
//             icon: IconDashboard,
//             hideInMenu: false,
//             activeMenu: false,
//         },
//         children: [
//             {
//                 path: '/dashboard/workplace',
//                 name: 'menu.survey.draft',
//                 meta: {
//                     locale: '',
//                     icon: IconDashboard,
//                     hideInMenu: false,
//                     activeMenu: false,
//                 },
//             },
//             {
//                 path: '/dashboard/workplace',
//                 name: 'menu.survey.publish',
//                 meta: {
//                     locale: '',
//                     icon: IconDashboard,
//                     hideInMenu: false,
//                     activeMenu: false,
//                 },
//             },
//             {
//                 path: '/dashboard/workplace',
//                 name: 'menu.survey.stop',
//                 meta: {
//                     locale: '',
//                     icon: IconDashboard,
//                     hideInMenu: false,
//                     activeMenu: false,
//                 },
//             },
//             {
//                 path: '/dashboard/workplace',
//                 name: 'menu.survey.dump',
//                 meta: {
//                     locale: '',
//                     icon: IconDashboard,
//                     hideInMenu: false,
//                     activeMenu: false,
//                 },
//             },
//         ],
//     },
//     {
//         path: '/answer',
//         name: 'menu.answer',
//         meta: {
//             locale: '',
//             icon: IconDashboard,
//             hideInMenu: false,
//             activeMenu: false,
//         },
//         children: [
//             {
//                 path: '/dashboard/workplace',
//                 name: 'menu.answer.analysis',
//                 meta: {
//                     locale: '',
//                     icon: IconDashboard,
//                     hideInMenu: false,
//                     activeMenu: false,
//                 },
//             },
//             {
//                 path: '/dashboard/workplace',
//                 name: 'menu.answer.visualization',
//                 meta: {
//                     locale: '',
//                     icon: IconDashboard,
//                     hideInMenu: false,
//                     activeMenu: false,
//                 },
//             },
//         ],
//     },
// ]
</script>

<template>
    <el-menu style="height: 100%" :collapse="isCollapse">
        <div class="btn-box">
            <template v-if="isCollapse">
                <el-button text @click="isCollapse = false">
                    <el-icon :size="20">
                        <IconExpand />
                    </el-icon>
                </el-button>
            </template>
            <template v-else>
                <el-button text @click="isCollapse = true">
                    <el-icon :size="20">
                        <IconShrink />
                    </el-icon>
                </el-button>
            </template>
        </div>

        <template v-for="route in menuTree">
            <SubMenu :route />
        </template>
    </el-menu>
</template>

<style scoped lang="scss">
.btn-box {
    width: 100%;
    display: flex;
    justify-content: end;
    padding-bottom: 5px;
}
</style>
