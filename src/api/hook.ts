import { ref, UnwrapRef } from 'vue';
import { HttpResponse } from './axios';
import useLoading from '@/hooks/loading';

// /** 目的是在前一个请求没成功前，不需要再次请求 */
// export async function wrapRequest<T>(asyncRequest: () => Promise<T>) {
//     let isLoading = false;

//     const wrappedRequest = async (): Promise<T | undefined> => {
//         if (isLoading) {
//             return;
//         }
//         asyncRequest()
//     };

//     return wrappedRequest;
// }

// use to fetch list
// Don't use async function. It doesn't work in async function.
// Use the bind function to add parameters
// example: useRequest(api.bind(null, {}))
export function useMyRequest<T>(
    // 这里是否有办法让类型自动从 api 中获取？因为我的类型已经在 api 中指定了。
    api: () => Promise<HttpResponse<T>>,
    defaultValue = [] as unknown as T,
    isLoading = true,
) {
    const { loading, setLoading } = useLoading(isLoading);
    const response = ref<T>(defaultValue);
    api()
        .then((res) => {
            response.value = res.data as unknown as UnwrapRef<T>;
        })
        .finally(() => {
            setLoading(false);
        });
    return { loading, response };
}
