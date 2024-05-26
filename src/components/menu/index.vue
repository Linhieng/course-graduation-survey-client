<script lang="tsx">
import { defineComponent, ref, h, compile, computed, resolveComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { RouteMeta } from 'vue-router';
import { useAppStore } from '@/store';
import { listenerRouteChange } from '@/utils/route-listener';
import { openWindow, regexUrl } from '@/utils';
import useMenuTree from './use-menu-tree';
import type { JSX } from 'vue/jsx-runtime';

export default defineComponent({
    emit: ['collapse'],
    setup() {
        const { t } = useI18n();
        const appStore = useAppStore();
        const router = useRouter();
        const route = useRoute();
        const { menuTree } = useMenuTree();
        const collapsed = computed({
            get() {
                if (appStore.device === 'desktop') return appStore.menuCollapse;
                return false;
            },
            set(value: boolean) {
                appStore.updateSettings({ menuCollapse: value });
            },
        });

        const topMenu = computed(() => appStore.topMenu);
        const openKeys = ref<string[]>([]);
        const selectedKey = ref<string[]>([]);

        const goto = (item: RouteRecordRaw) => {
            // Open external link
            if (regexUrl.test(item.path)) {
                openWindow(item.path);
                selectedKey.value = [item.name as string];
                return;
            }
            // Eliminate external link side effects
            const { hideInMenu, activeMenu } = item.meta as RouteMeta;
            if (route.name === item.name && !hideInMenu && !activeMenu) {
                selectedKey.value = [item.name as string];
                return;
            }
            // Trigger router change
            router.push({
                name: item.name,
            });
        };
        const findMenuOpenKeys = (target: string) => {
            const result: string[] = [];
            let isFind = false;
            const backtrack = (item: RouteRecordRaw, keys: string[]) => {
                if (item.name === target) {
                    isFind = true;
                    result.push(...keys);
                    return;
                }
                if (item.children?.length) {
                    item.children.forEach((el) => {
                        backtrack(el, [...keys, el.name as string]);
                    });
                }
            };
            menuTree.value.forEach((el: RouteRecordRaw) => {
                if (isFind) return; // Performance optimization
                backtrack(el, [el.name as string]);
            });
            return result;
        };
        listenerRouteChange((newRoute) => {
            const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
            if (requiresAuth && (!hideInMenu || activeMenu)) {
                const menuOpenKeys = findMenuOpenKeys((activeMenu || newRoute.name) as string);

                const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
                openKeys.value = [...keySet];

                selectedKey.value = [activeMenu || menuOpenKeys[menuOpenKeys.length - 1]];
            }
        }, true);
        const setCollapse = (val: boolean) => {
            if (appStore.device === 'desktop') appStore.updateSettings({ menuCollapse: val });
        };

        const renderSubMenu = () => {
            const IconLaunchEl = resolveComponent('icon-launch');
            const IconLaunch = h(IconLaunchEl, { class: 'icon-external' });

            function menuItemContent(text: string, isExternal: boolean): JSX.Element {
                return (
                    <>
                        {text}
                        {isExternal ? IconLaunch : null}
                    </>
                );
            }

            function travel(_route: RouteRecordRaw[], nodes: JSX.Element[] = []) {
                if (!_route) return;

                _route.forEach((element) => {
                    const disabled = element?.meta?.disabled || false;
                    const title = t(element?.meta?.locale || '');
                    const iconComp = element?.meta?.icon ? resolveComponent(element.meta.icon) : null;
                    const icon = iconComp ? () => h(iconComp) : undefined;
                    const node =
                        element?.children && element?.children.length > 0 ? (
                            <a-sub-menu
                                key={element?.name}
                                v-slots={{
                                    title: () => title,
                                    icon,
                                }}
                                title={title}
                            >
                                {travel(element?.children)}
                            </a-sub-menu>
                        ) : (
                            <a-menu-item
                                key={element?.name}
                                onClick={() => goto(element)}
                                v-slots={{ icon }}
                                disabled={disabled}
                            >
                                {menuItemContent(t(element?.meta?.locale || ''), !!element?.meta?.isExternal)}
                            </a-menu-item>
                        );
                    nodes.push(node);
                });
                return nodes;
            }
            return travel(menuTree.value);
        };

        return () => (
            <a-menu
                mode={topMenu.value ? 'horizontal' : 'vertical'}
                v-model:collapsed={collapsed.value}
                v-model:open-keys={openKeys.value}
                show-collapse-button={appStore.device !== 'mobile'}
                auto-open={false}
                selected-keys={selectedKey.value}
                auto-open-selected={true}
                level-indent={34}
                style="height: 100%;width:100%;"
                onCollapse={setCollapse}
            >
                {renderSubMenu()}
            </a-menu>
        );
    },
});
</script>

<style lang="scss" scoped>
:deep(.arco-menu-inner) {
    .arco-menu-inline-header {
        display: flex;
        align-items: center;
    }
}
:deep(&:not(.arco-icon-down)) {
    font-size: 18px;
}
.icon-external {
    font-size: 13px;
    margin-left: 1px;
    transform: translateY(-0.5rem);
}
</style>
