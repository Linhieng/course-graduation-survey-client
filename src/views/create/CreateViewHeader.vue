<script setup lang="ts">
import WidgetBack from '@/components/WidgetBack.vue'
import { useStoreSurvey } from '@/stores'
import { ref } from 'vue'

const storeSurvey = useStoreSurvey()
const newTime = ref<Date>()
storeSurvey.$onAction(({name, after}) => {
    if (name === 'setNewCacheTime') {
        after((time) => {
            newTime.value = time
        })
    }
})
</script>

<template>
    <el-row class="header">
        <el-col :xs="5" :sm="8" class="header__left flex-align-center-left">
            <el-icon size="50">
                <WidgetBack class="flex-align-center-left" />
            </el-icon>
        </el-col>
        <el-col :xs="10" :sm="8" class="header__mid flex-all-center">
            <h1> 创建问卷 </h1>
        </el-col>
        <el-col :xs="9" :sm="8" class="header__right flex-align-center-right">
            <div>{{ newTime ?
                `已于 ${newTime.toLocaleTimeString()} 缓存` :
                '未缓存' }}
            </div>
        </el-col>
    </el-row>
</template>

<style scoped lang="scss">
.header {
    min-height: var(--layout-header-height);

    &__left,
    &__right {
        padding: 0 10px;
    }
}
</style>
