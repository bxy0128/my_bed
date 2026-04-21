/**
 * 荔枝音频 - 详情+列表全能解锁版
 */

let bodyBytes = $response.bodyBytes;
if (!bodyBytes) $done({});

let view = new Uint8Array(bodyBytes);
let content = $response.body; // 获取文本形式用于处理 JSON 段
let modified = false;

// --- 逻辑 A: 处理二进制 Tag (解决列表角标和进入权限) ---
for (let i = 0; i < view.length - 2; i++) {
    // 1. 抹除付费分级 (找到 0x10 0x04 改为 0x10 0x00)
    if (view[i] === 0x10 && view[i+1] === 0x04) {
        view[i+1] = 0x00;
        modified = true;
    }
    // 2. 抹除精品/独家标记 (针对 0x08 0x02 序列)
    if (view[i] === 0x08 && view[i+1] === 0x02 && view[i+2] === 0x10) {
        view[i+1] = 0x00;
        modified = true;
    }
}

// --- 逻辑 B: 处理文本段 (解决 300s 试听限制和购买弹窗) ---
if (content && content.indexOf('audition') !== -1) {
    // 1. 将 "audition":300 改为 0 (或者一个极大的数值如 99999)
    content = content.replace(/"audition":\d+/g, '"audition":0');
    // 2. 抹除购买人数提示，让 App 认为这是免费音频
    content = content.replace(/"boughtInfoText":".+?"/g, '"boughtInfoText":""');
    // 3. 将价格 amount 改为 0
    content = content.replace(/"amount":\d+/g, '"amount":0');
    
    // 如果文本被修改，需要重新转回二进制
    $done({ body: content });
} else if (modified) {
    $done({ bodyBytes: view.buffer });
} else {
    $done({});
}
