<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'


const router = useRouter()
const route = useRoute()
const questionnaireId = route.params.id


if (!questionnaireId) {
    router.replace({
        name: 'NotFound',
        query: {
            msg: '问卷不存在'
        }
    })
}

</script>

<template>

'{{ questionnaireId }}'
<h1>填写问卷</h1>

</template>

<style scoped lang="scss">

</style>
