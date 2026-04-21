/**
 * 荔枝音频 - 精准二进制降级 (修复主播主页无法显示问题)
 */

const url = $request.url;
let bodyBytes = $response.bodyBytes;

// 1. 定义需要修改的接口特征（只有这些接口才执行修改）
// 列表接口：section-detail, 详情接口：detail
const isTarget = url.indexOf('detail') !== -1 || url.indexOf('list') !== -1;

// 2. 如果不是目标接口（比如是 user/profile 或 home），直接放行
if (!isTarget || !bodyBytes) {
    console.log("非音频详情接口，跳过修改以保持兼容性");
    $done({ bodyBytes: bodyBytes });
} else {
    // 3. 只对音频相关接口执行字节修改
    let view = new Uint8Array(bodyBytes);
    let modified = false;

    for (let i = 0; i < view.length - 1; i++) {
        // 降低权限位 0x18 0x04 -> 0x18 0x02
        if (view[i] === 0x18 && view[i+1] === 0x04) {
            view[i+1] = 0x02;
            modified = true;
        }
        // 降低类型位 0x10 0x02 -> 0x10 0x00
        if (view[i] === 0x10 && view[i+1] === 0x02) {
            view[i+1] = 0x00;
            modified = true;
        }
    }

    if (modified) console.log("音频数据权限已精准降级");
    $done({ bodyBytes: view.buffer });
}
