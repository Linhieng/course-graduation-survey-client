
const debug = import.meta.env.MODE !== 'production'

// 为了方便开启和关闭数据模拟功能，每个 Mock 都会被 setupMock.setup 包裹，setupMock 如下：
const setupMock =  ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
    if (mock !== false && debug) setup()
}
export default setupMock
