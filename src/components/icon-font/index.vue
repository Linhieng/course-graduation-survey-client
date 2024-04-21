<script setup lang="ts">
import { Icon } from '@arco-design/web-vue';
import { computed } from 'vue';

const IconFont = Icon.addFromIconFontCn({ src: 'https:' + import.meta.env.VITE_ICON_FONT_URL });

const props = defineProps<{
    name: string;
    size?: number | string;
    width?: number | string;
    height?: number | string;
}>();

const _width = computed(() => {
    if (typeof props.width === 'number') return props.width + 'px';
    if (typeof props.width === 'string') return props.width;
    if (typeof props.size === 'number') return props.size + 'px';
    if (typeof props.size === 'string') return props.size;
});
const _height = computed(() => {
    if (typeof props.height === 'number') return props.height + 'px';
    if (typeof props.height === 'string') return props.height;
    if (typeof props.size === 'number') return props.size + 'px';
    if (typeof props.size === 'string') return props.size;
});
</script>

<template>
    <icon-font
        :type="`icon-${name}`"
        style="color: skyblue"
        :style="{
            width: _width,
            height: _height,
        }"
    ></icon-font>
</template>
