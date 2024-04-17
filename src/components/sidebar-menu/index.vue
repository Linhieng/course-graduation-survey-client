<script setup lang="ts">
import SubMenu from './sub-menu.vue'
import IconExpand from '@icon/IconExpand.vue'
import IconShrink from '@icon/IconShrink.vue'
import { ref } from 'vue'
import appClientMenus from '@/router/app-menus'

const isCollapse = ref(false)
const menuTree = appClientMenus
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
