import Mock from 'mockjs';

import './user';
import './message-box';

import '@/views/dashboard/workplace/mock';
/** simple */

import '@/views/user/info/mock';
import '@/views/user/setting/mock';
/** simple end */

Mock.setup({
    timeout: '600-1000',
});
