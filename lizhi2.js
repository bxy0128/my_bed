/**
 * 荔枝音频字节级属性欺骗
 */
let bodyBytes = $response.bodyBytes;

if (bodyBytes) {
    let uint8View = new Uint8Array(bodyBytes);
    let strBody = $response.body; // 仅用于检索位置

    // 定义需要欺骗的字段及其目标值
    const modifyMap = {
        '"audition"': "0",
        '"amount"': "0",
        '"is_pay"': "true ", // 加个空格保持5位长度，对齐 false 的长度
        '"can_play"': "1"
    };

    for (let key in modifyMap) {
        let pos = strBody.indexOf(key);
        if (pos !== -1) {
            let startModify = pos + key.length + 1; // 跳过冒号
            let targetVal = modifyMap[key];
            
            // 执行字节覆盖
            for (let i = 0; i < targetVal.length; i++) {
                let currentPos = startModify + i;
                if (currentPos < uint8View.length) {
                    // 将目标位置的字节替换为我们伪造的 ASCII 码
                    uint8View[currentPos] = targetVal.charCodeAt(i);
                }
            }
            console.log(`字段欺骗成功: ${key}`);
        }
    }

    $done({ bodyBytes: uint8View.buffer });
} else {
    $done({});
}
