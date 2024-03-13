<script setup lang="ts">
import { type StyleValue, ref } from 'vue'
import IconExpand from '@icon/IconExpand.vue'
import IconShrink from '@/components/icons/IconShrink.vue'

const props = defineProps<{
    headerStyle?: StyleValue,
    sectionStyle?: StyleValue,
    asideStyle?: StyleValue,
    mainStyle?: StyleValue,
}>()

const isExpand = ref(true)

const evtToggleShow = () => {
    isExpand.value = !isExpand.value
}
</script>

<template>
    <div class="container">
        <header :style="props.headerStyle">
            <slot name="header"></slot>
        </header>
        <section :style="[props.sectionStyle]" :class="{ shrink: !isExpand }">
            <aside :style="props.asideStyle">
                <div class="aside-content">
                    <slot name="aside"></slot>
                </div>
            </aside>
            <main :style="props.mainStyle">
                <div class="main-content">
                    <slot name="main"></slot>
                    <footer>
                        <p>Copyright &copy; 2024 by linhieng</p>
                    </footer>
                </div>
            </main>
            <div class="toggle-show flex-all-center" @click="evtToggleShow">
                <el-icon size="30">
                    <IconExpand v-show="!isExpand" />
                    <IconShrink v-show="isExpand" />
                </el-icon>
            </div>
        </section>
    </div>
</template>

<style scoped lang="scss">
:global(.container) {
    --layout-header-height: 70px;
}

$toggleShowWidth: 50px;
$asideWidth: 150px;

.container {
    width: 100vw;
    height: 100vh;

    header {
        width: 100%;
        height: var(--layout-header-height);
        border-bottom: 1px solid #eee;
        overflow: auto;
    }

    section {
        width: 100%;
        height: calc(100vh - var(--layout-header-height));
        overflow: hidden;

        display: grid;
        grid-template-columns: $asideWidth 1fr;

        &,
        aside,
        .aside-content,
        .toggle-show {
            transition: all 300ms;
        }


        aside {
            width: $asideWidth;
            height: calc(100vh - var(--layout-header-height));
            padding-bottom: $toggleShowWidth;
            overflow: auto;

            z-index: 10;
            border-right: 1px solid #eee;

            .aside-content {
                width: $asideWidth;
            }
        }

        main {
            height: calc(100vh - var(--layout-header-height));
            overflow-y: auto;

            .main-content {
                min-height: calc(100vh - var(--layout-header-height));
                position: relative;
                padding-bottom: $toggleShowWidth;

                footer {
                    position: absolute;
                    bottom: 10px;
                    right: 20px;
                    color: #666;
                    font-size: 12px;
                }
            }

        }

        .toggle-show {
            width: $toggleShowWidth;
            height: $toggleShowWidth;
            border-top-left-radius: var(--br-round);
            border-bottom-left-radius: var(--br-round);

            background-color: #eee;
            box-shadow: var(--bs-base);

            position: fixed;
            z-index: 12;
            bottom: 20px;
            left: $asideWidth - $toggleShowWidth;

            cursor: pointer;
        }

        &.shrink {
            grid-template-columns: 0 1fr;

            aside {
                transform: translateX(-100%);

                .aside-content {
                    opacity: 0;
                }
            }

            .toggle-show {
                left: 0;
                border-radius: 0;
                border-top-right-radius: var(--br-round);
                border-bottom-right-radius: var(--br-round);
            }
        }
    }
}
</style>
