/**
 * 荔枝音频 - 付费详情页专项修复版
 * 采用纯二进制扫描，不破坏 Protobuf 结构，解决白屏/打不开问题
 */

let bodyBytes = $response.bodyBytes;
if (!bodyBytes) $done({});

let view = new Uint8Array(bodyBytes);
let modified = false;

// 1. 核心权限降级 (针对 5644 及其详情接口)
for (let i = 0; i < view.length - 3; i++) {
    // 抹除付费分级 0x08 0x02 -> 0x08 0x00
    if (view[i] === 0x08 && view[i+1] === 0x02 && view[i+2] === 0x10) {
        view[i+1] = 0x00;
        modified = true;
    }
    
    // 抹除价格标记 0x10 0x04 -> 0x10 0x00
    if (view[i] === 0x10 && view[i+1] === 0x04) {
        view[i+1] = 0x00;
        modified = true;
    }
}

// 2. 暴力抹除 audition:300 限制 (直接在二进制流中搜索 "audition")
// 这样可以避开 bodyBytes 和 body 之间的转换损耗
const searchStr = "audition";
const buffer = view;
for (let i = 0; i < buffer.length - searchStr.length; i++) {
    let match = true;
    for (let j = 0; j < searchStr.length; j++) {
        if (buffer[i + j] !== searchStr.charCodeAt(j)) {
            match = false;
            break;
        }
    }
    if (match) {
        // 找到了 "audition":300，我们将 300 (ASCII: 51 48 48) 改为 000 (ASCII: 48 48 48)
        // 这样不改变字节长度，App 解析不会崩溃
        let start = i + searchStr.length + 2; // 越过 "audition":
        if (buffer[start] >= 48 && buffer[start] <= 57) {
            buffer[start] = 48; // 3 -> 0
            if (buffer[start+1] >= 48 && buffer[start+1] <= 57) buffer[start+1] = 48; // 0 -> 0
            if (buffer[start+2] >= 48 && buffer[start+2] <= 57) buffer[start+2] = 48; // 0 -> 0
            modified = true;
        }
    }
}

if (modified) {
    console.log("--- 荔枝付费详情页注入成功 ---");
    $done({ bodyBytes: view.buffer });
} else {
    $done({});
}
