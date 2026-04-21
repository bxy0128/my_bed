/**
 * 荔枝音频 - 全量二进制权限降级 (防止断网 + 绕过鉴权)
 */
let bodyBytes = $response.bodyBytes;

if (bodyBytes) {
    let view = new Uint8Array(bodyBytes);
    let modified = false;

    // 遍历字节流，寻找权限控制 Tag (0x18, 0x10, 0x04 等关键点)
    for (let i = 0; i < view.length - 1; i++) {
        // 1. 寻找 AccessPermission 标记位 (通常在十六进制 18 04 附近)
        // 将 0x04 (需付费) 强制改为 0x02 (公开)
        if (view[i] === 0x18 && view[i+1] === 0x04) {
            view[i+1] = 0x02;
            modified = true;
        }

        // 2. 寻找 AccessType 标记位 (通常在十六进制 10 02 附近)
        // 将 0x02 (鉴权模式) 强制改为 0x00 (自由模式)
        if (view[i] === 0x10 && view[i+1] === 0x02) {
            view[i+1] = 0x00;
            modified = true;
        }

        // 3. 寻找并抹除 audition (试听) 倒计时特征码
        // 荔枝二进制中试听通常由特定长字节引导，我们尝试将数值位清零
        if (view[i] === 0x30 && view[i+1] > 0x80) { 
            // 匹配到高位数值字节，强制抹为 0
            view[i+1] = 0x00;
            modified = true;
        }
    }

    if (modified) console.log("--- 荔枝二进制权限已全量降级 ---");
    $done({ bodyBytes: view.buffer });
} else {
    $done({});
}
