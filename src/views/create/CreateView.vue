<script setup lang="ts">
import CreateViewHeader from './CreateViewHeader.vue'
import CreateViewAside from './CreateViewAside.vue'
import CreateViewMain from './CreateViewMain.vue'
import HeaderAsideMain from '@/layout/HeadAsideMain.vue'

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
