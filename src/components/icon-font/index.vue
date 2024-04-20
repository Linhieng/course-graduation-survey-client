<script setup lang="ts">
import { Icon } from '@arco-design/web-vue';

const IconFont = Icon.addFromIconFontCn({ src: 'https:' + import.meta.env.VITE_ICON_FONT_URL });

defineProps<{
    name: string;
}>();
</script>

<template>
    <icon-font :type="`icon-${name}`" style="color: skyblue"></icon-font>
</template>
