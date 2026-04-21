/**
 * 荔枝音频字节级解锁 (防止断网)
 */

let bodyBytes = $response.bodyBytes;

if (bodyBytes) {
    let uint8View = new Uint8Array(bodyBytes);
    let strBody = $response.body; // 仅用于定位，不修改

    // 搜索 "audition" 对应的字节序列 (61 75 64 69 74 69 6f 6e)
    let key = "audition";
    let pos = strBody.indexOf(key);

    if (pos !== -1) {
        // 在字节流中找到 audition 后面紧跟的数值区域
        // 我们在原字节数组上直接修改，不改变数组长度，不破坏偏移
        for (let i = pos; i < pos + 30; i++) {
            // 寻找数字的 ASCII 码 (48-57 对应 0-9)
            // 将试听秒数数值位强制改为 0 (ASCII 48)
            if (uint8View[i] >= 48 && uint8View[i] <= 57) {
                uint8View[i] = 48; 
            }
            // 碰到逗号或右括号停止，防止改过头
            if (uint8View[i] === 44 || uint8View[i] === 125) break;
        }
        console.log("字节级修改完成：audition -> 0");
    }

    $done({ bodyBytes: uint8View.buffer });
} else {
    $done({});
}
