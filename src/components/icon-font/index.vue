<script setup lang="ts">
import { Icon } from '@arco-design/web-vue';

const IconFont = Icon.addFromIconFontCn({ src: 'https://at.alicdn.com/t/c/font_4516350_8dd5go7vmzo.js' });

defineProps<{
    name: string;
}>();
</script>

<template>
    <icon-font :type="`icon-${name}`" style="color: skyblue"></icon-font>
</template>
