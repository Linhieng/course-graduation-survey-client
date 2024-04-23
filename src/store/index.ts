import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useCreateStore from './modules/create';
import useStatStore from './modules/stat';
import useCollectStore from './modules/collect';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useCreateStore, useStatStore, useCollectStore };
export default pinia;
