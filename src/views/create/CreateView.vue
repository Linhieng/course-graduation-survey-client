<script setup lang="ts">
import CreateViewHeader from './CreateViewHeader.vue'
import CreateViewAside from './CreateViewAside.vue'
import CreateViewMain from './CreateViewMain.vue'
import HeaderAsideMain from '@/layout/HeadAsideMain.vue'

import { useStoreSurvey } from '@/store'
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
            <CreateViewMain class="create-container" />
        </template>
    </HeaderAsideMain>
</template>

<style scoped lang="scss">
@mixin w600 {
    @media screen and (min-width: 600px) {
        @content;
    }
}

.create-container {
    @include w600 {
        margin: auto;
        max-width: 600px;
        box-shadow: 0 0 20px #eee;
    }
}
</style>
