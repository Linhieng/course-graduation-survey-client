<script setup lang="ts">
import HomeViewHeader from './HomeViewHeader.vue'
import HomeViewAside from './HomeViewAside.vue'
import HomeViewMain from './HomeViewMain.vue'
import HeaderAsideMain from '@/layout/HeadAsideMain.vue'

import { apiGetAllSurveys } from '@/api/survey'

apiGetAllSurveys()
</script>

<template>
    <HeaderAsideMain :asideWidth="150">

        <template #header>
            <HomeViewHeader />
        </template>

        <template #aside>
            <HomeViewAside />
        </template>
        <template #main>
            <HomeViewMain />
        </template>

    </HeaderAsideMain>
</template>

<style scoped lang="scss">
</style>
