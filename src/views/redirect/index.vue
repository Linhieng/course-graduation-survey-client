<!-- 这个组件仅仅用于重定向。里面的逻辑只跳转，这和函数式组件有关系吗？  -->
<template>
    <div>重定向到 {{ gotoPath }}</div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const gotoPath = route.params.path as string
console.log('??? ', gotoPath)
router.replace({ path: gotoPath })
</script>
