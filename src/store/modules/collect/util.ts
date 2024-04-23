/**
 * 获取时间描述，多少秒、分、时
 * @param time 单位秒
 */
export function getTimeDesc(time: number) {
    if (time < 1) return '小于1秒';
    if (time < 60) return `${time} 秒`;
    if (time < 3600) return `大约${~~(time / 60)}分`;
    if (time < 86400) return `大约${~~(time / 3600)}小时`;
    return `大约${~~(time / 86400)}天`;
}
