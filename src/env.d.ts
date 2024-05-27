/// <reference types="vite/client" />

// 不需要自动手动声明组件类型，这样粗暴的生成后，反而无法知道哪些组件未创建存在。
// declare module '*.vue' {
//     import { DefineComponent } from 'vue';
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
//     const component: DefineComponent<{}, {}, any>;
//     export default component;
// }
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
}
