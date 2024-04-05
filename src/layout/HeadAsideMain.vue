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
$headerHeight: 70px;
$toggleShowWidth: 50px;
$asideWidth: 150px;

.container {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;

    header {
        flex: none;
        width: 100%;
        height: $headerHeight;
        border-bottom: 1px solid #eee;

        display: grid;
        align-items: center;
    }

    section {
        flex: auto;
        width: 100%;
        overflow: hidden;

        display: flex;

        &,
        aside,
        .aside-content,
        .toggle-show {
            transition: all 300ms;
        }


        aside {
            transition: width 300ms;
            flex: none;
            width: $asideWidth;
            padding-bottom: $toggleShowWidth;
            overflow: hidden;

            z-index: 10;
            border-right: 1px solid #eee;

            .aside-content {
                width: $asideWidth;
                overflow: auto;
            }
        }

        main {
            flex: 1;
            overflow-y: auto;

            .main-content {
                min-height: 100%;
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
            aside {
                width: 0;
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
