<template>
    <div></div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const gotoPath = route.params.path as string;
// TODO: 重定向这里，应该可以提供 name 的，
// 不是非得 path。不过考虑到其他地方有用到该组件，就暂时不动它。
console.log(`重定向到: ${gotoPath}`);
router.replace({ path: gotoPath });
</script>

<style scoped lang="scss"></style>
