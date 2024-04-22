import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useCreateStore from './modules/create';
import useStatStore from './modules/stat';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useCreateStore, useStatStore };
export default pinia;
