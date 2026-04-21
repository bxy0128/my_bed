/**
 * 荔枝音频 5644 接口精准解锁 (彻底修复主页白屏)
 */

const url = $request.url;
let bodyBytes = $response.bodyBytes;

if (url.indexOf('/5644') === -1 || !bodyBytes) {
    $done({ bodyBytes: bodyBytes });
} else {
    let view = new Uint8Array(bodyBytes);
    let modified = false;

    // 1. 寻找付费独有的特征序列并降级
    // 我们寻找 0x18 0x27 (付费 Tag) 或 0x08 0x02 (限制等级)
    for (let i = 0; i < view.length - 2; i++) {
        
        // 核心修改 1：将 AccessLevel 从 0x02 (付费) 改为 0x01 (免费)
        // 特征码通常是 0x08 0x02 后面跟着 0x10 0x04
        if (view[i] === 0x08 && view[i+1] === 0x02 && view[i+2] === 0x10) {
            view[i+1] = 0x01; // 改为免费等级
            if (view[i+3] === 0x04) view[i+3] = 0x00; // 抹掉价格
            modified = true;
        }

        // 核心修改 2：精准抹除独家/精品标记位 (防止 App 弹出购买弹窗)
        // 查找二进制中的 0x18 0x27 (27 是 ASCII 的 ' 字符，对应你提供的付费样本)
        if (view[i] === 0x18 && view[i+1] === 0x27) {
            view[i+1] = 0x00; 
            modified = true;
        }
    }

    // 2. 修复主页白屏：如果检测到是主页头部信息，不做深度过滤
    // 主页头部通常较短，音频列表通常很长。
    if (view.length < 500) {
        $done({ bodyBytes: bodyBytes });
    } else {
        if (modified) console.log("--- 荔枝 5644 列表权限已重置 ---");
        $done({ bodyBytes: view.buffer });
    }
}
