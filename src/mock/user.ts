import Mock from 'mockjs';
import setupMock, { successResponseWrap, failResponseWrap } from '@/utils/setup-mock';

import type { MockParams } from '@/types/mock';
import { isLogin } from '@/utils/auth';

setupMock({
    setup() {
        // Mock.XHR.prototype.withCredentials = true;

        // 用户的服务端菜单
        Mock.mock(new RegExp('/api/user/menu'), () => {
            const menuList = [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    meta: {
                        locale: 'menu.server.dashboard',
                        requiresAuth: true,
                        icon: 'icon-dashboard',
                        order: 1,
                    },
                    children: [
                        {
                            path: 'workplace',
                            name: 'Workplace',
                            meta: {
                                locale: 'menu.server.workplace',
                                requiresAuth: true,
                            },
                        },
                        {
                            path: 'https://arco.design',
                            name: 'arcoWebsite',
                            meta: {
                                locale: 'menu.arcoWebsite',
                                requiresAuth: true,
                            },
                        },
                    ],
                },
            ];
            return successResponseWrap(menuList);
        });
    },
});
