<script setup lang="ts">
import { Icon } from '@arco-design/web-vue';

const IconFont = Icon.addFromIconFontCn({ src: 'https://at.alicdn.com/t/c/font_4516350_rq30fbg8vio.js' });

defineProps<{
    name: string;
}>();
</script>

<template>
    <icon-font :type="`icon-${name}`"></icon-font>
</template>
