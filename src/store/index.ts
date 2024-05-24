import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useCreateStore from './modules/create';
import useStatStore from './modules/stat';
import useCollectStore from './modules/collect';
import useMessageStore from './modules/message';
import useAiStore from './modules/ai';

const pinia = createPinia();

export {
    useAppStore,
    useUserStore,
    useTabBarStore,
    useCreateStore,
    useStatStore,
    useCollectStore,
    useMessageStore,
    useAiStore,
};
export default pinia;
