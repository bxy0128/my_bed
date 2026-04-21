/**
 * 荔枝音频 - 5644 接口精准降级版
 * 仅对音频列表接口执行字节修改，确保不干扰主播主页等其他功能
 */

const url = $request.url;
let bodyBytes = $response.bodyBytes;

// 1. 精准判断：只拦截以 5644 结尾的接口
// 如果你的 URL 全称是 .../op/5644，可以用 endsWith
const isAudioListApi = url.indexOf('/5644') !== -1;

if (!isAudioListApi || !bodyBytes) {
    // 非目标接口（如主播主页信息），原样返回，不做任何解密重新封装的操作
    $done({ bodyBytes: bodyBytes });
} else {
    // 2. 目标接口：执行字节级权限修改
    let view = new Uint8Array(bodyBytes);
    let modified = false;

    // 遍历字节流，寻找特定的 Tag 序列进行降级
    for (let i = 0; i < view.length - 1; i++) {
        // 修改权限控制位 (0x18 0x04 -> 0x18 0x02)
        if (view[i] === 0x18 && view[i+1] === 0x04) {
            view[i+1] = 0x02;
            modified = true;
        }
        // 修改鉴权类型位 (0x10 0x02 -> 0x10 0x00)
        if (view[i] === 0x10 && view[i+1] === 0x02) {
            view[i+1] = 0x00;
            modified = true;
        }
    }

    if (modified) {
        console.log("检测到音频列表接口 (5644)，已执行二进制权限降级");
    }
    $done({ bodyBytes: view.buffer });
}
