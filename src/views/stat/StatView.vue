<script setup lang="ts">
import StatViewHeader from './StatViewHeader.vue'
import StatViewAside from './StatViewAside.vue'
import StatViewMain from './StatViewMain.vue'
import HeaderAsideMain from '@/layout/HeadAsideMain.vue'

import { useStoreStat } from '@/stores'

const storeStat = useStoreStat()
const props = defineProps<{
    surveyId: string
}>()

storeStat.setSurveyId(props.surveyId)
</script>

<template>
    <HeaderAsideMain asideWidth="150px">
        <template #header>
            <StatViewHeader />
        </template>

        <template #aside>
            <StatViewAside />
        </template>
        <template #main>
            <StatViewMain />
        </template>
    </HeaderAsideMain>
</template>

<style scoped lang="scss">
.stat-layout {
    .el-header {
        background-color: #c6e2ff;
    }

    .el-aside {
        background-color: #d9ecff;
    }

    .el-main {
        background-color: #ecf5ff;
    }
}
</style>
