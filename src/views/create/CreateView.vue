<script setup lang="ts">
import CreateViewHeader from './CreateViewHeader.vue'
import CreateViewAside from './CreateViewAside.vue'
import CreateViewMain from './CreateViewMain.vue'
import HeaderAsideMain from '@/layout/HeadAsideMain.vue'

import { useRoute, useRouter } from 'vue-router'
import { useStoreSurvey } from '@/stores'
const route = useRoute()
const router = useRouter()
const storeSurvey = useStoreSurvey()
const id = Number(route.query.surveyId)

if (Number.isNaN(id)) {
    router.replace({ name: 'home' })
}

storeSurvey.setSurveyId(id)
</script>


<template>
    <HeaderAsideMain asideWidth="150px">

        <template #header>
            <CreateViewHeader />
        </template>

        <template #aside>
            <CreateViewAside />
        </template>
        <template #main>
            <CreateViewMain />
        </template>

    </HeaderAsideMain>
</template>

<style scoped lang="scss">
</style>
