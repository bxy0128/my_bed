/**
 * 荔枝音频 - 网关模式精准过滤版
 */

const url = $request.url;
const headers = $request.headers;
let bodyBytes = $response.bodyBytes;

// 1. 尝试从 Header 中寻找接口标识（荔枝常见的标识位）
// 优先检查 X-Action 或请求路径末尾的 ID
const apiAction = headers['X-Action'] || headers['action'] || url;

// 2. 识别“主播主页”和“用户配置”相关的关键字
// 如果你观察到主播主页的请求有特定规律，请补充到这个正则里
const isUserPage = /user|profile|home|follow/i.test(apiAction);

// 3. 逻辑判断
if (isUserPage || !bodyBytes) {
    // 如果是主播主页相关，或者是心跳包，直接放行，不做任何字节修改
    console.log(`放行非音频接口: ${apiAction}`);
    $done({ bodyBytes: bodyBytes });
} else {
    // 只有非主页接口（假定为音频列表/详情）才执行字节修改
    let view = new Uint8Array(bodyBytes);
    let modified = false;

    for (let i = 0; i < view.length - 1; i++) {
        // 降低权限位 (0x18 0x04 -> 0x18 0x02)
        if (view[i] === 0x18 && view[i+1] === 0x04) {
            view[i+1] = 0x02;
            modified = true;
        }
        // 降低类型位 (0x10 0x02 -> 0x10 0x00)
        if (view[i] === 0x10 && view[i+1] === 0x02) {
            view[i+1] = 0x00;
            modified = true;
        }
    }

    if (modified) console.log(`音频接口已降级: ${apiAction}`);
    $done({ bodyBytes: view.buffer });
}
