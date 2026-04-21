/**
 * 荔枝音频 - 列表属性深度欺骗 (精准等长版)
 */

let bodyBytes = $response.bodyBytes;

if (bodyBytes) {
    let uint8View = new Uint8Array(bodyBytes);
    let strBody = $response.body; // 用于定位

    // 定义替换规则：[搜索关键词, 替换目标, 保持长度]
    const rules = [
        ['"userHadBuy":false', '"userHadBuy":true '],
        ['"accessPermission":4', '"accessPermission":2'],
        ['"accessType":2', '"accessType":0'],
        ['"voiceAuditionProperty":300', '"voiceAuditionProperty":000'],
        ['"voicePrice":60', '"voicePrice":00'],
        ['"originPrice":60', '"originPrice":00']
    ];

    rules.forEach(([search, replace]) => {
        let pos = strBody.indexOf(search);
        // 使用 while 循环处理列表中可能存在的多个音频项
        while (pos !== -1) {
            for (let i = 0; i < replace.length; i++) {
                uint8View[pos + i] = replace.charCodeAt(i);
            }
            console.log(`已成功覆盖字段: ${search}`);
            // 继续寻找下一个同名标签
            pos = strBody.indexOf(search, pos + replace.length);
        }
    });

    $done({ bodyBytes: uint8View.buffer });
} else {
    $done({});
}
