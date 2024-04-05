<script setup lang="ts">
import CreateViewHeader from './CreateViewHeader.vue'
import CreateViewAside from './CreateViewAside.vue'
import CreateViewMain from './CreateViewMain.vue'
import HeaderAsideMain from '@/layout/HeadAsideMain.vue'

import { useStoreSurvey } from '@/stores'
const storeSurvey = useStoreSurvey()

const props = defineProps<{
    id: string
}>()

storeSurvey.setSurveyId(props.id)
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

<style scoped lang="scss"></style>
