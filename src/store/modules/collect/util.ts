/**
 * 生成文件并下载
 * @param buffer
 * @param filename
 * @param bom window 系统中，需要添加 bom 前缀，不然会乱码。
 */
export function downloadFile(buffer: BlobPart, filename: string, bom: boolean) {
    let blob;
    // 如果 `bom` 为真，向内容前添加 '\ufeff'
    if (bom) {
        blob = new Blob([new TextEncoder().encode('\ufeff'), buffer]);
    } else {
        blob = new Blob([buffer]);
    }

    // const blob = new Blob([buffer]);
    const a = document.createElement('a');
    a.download = filename;
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
        setTimeout(() => {
            URL.revokeObjectURL(a.href);
            a.remove();
        }, 3 * 1000);
    });
    a.click();
}

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
