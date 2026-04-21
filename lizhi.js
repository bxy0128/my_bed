/**
 * 荔枝音频 - 5644 接口高稳定性增强版
 */

const url = $request.url;
let bodyBytes = $response.bodyBytes;

// 1. 更加严谨的过滤：只要包含 /5644 且不是空数据就处理
const isTarget = /\/5644($|\?)/.test(url);

if (!isTarget || !bodyBytes) {
    // 凡是不确定的，通通原封不动放行，确保不影响主页加载
    $done({ bodyBytes: bodyBytes });
} else {
    try {
        // 使用 slice 拷贝一份内存，防止高并发下多个请求互相干扰
        let uint8View = new Uint8Array(bodyBytes.slice(0));
        let modified = false;

        // 字节级循环：寻找权限特征位
        for (let i = 0; i < uint8View.length - 1; i++) {
            // 降级 AccessPermission (18 04 -> 18 02)
            if (uint8View[i] === 0x18 && uint8View[i+1] === 0x04) {
                uint8View[i+1] = 0x02;
                modified = true;
            }
            // 降级 AccessType (10 02 -> 10 00)
            if (uint8View[i] === 0x10 && uint8View[i+1] === 0x02) {
                uint8View[i+1] = 0x00;
                modified = true;
            }
        }

        if (modified) {
            console.log("--- 5644 接口权限注入成功 ---");
            $done({ bodyBytes: uint8View.buffer });
        } else {
            // 如果没找到特征位，也要原样返回，否则 App 会转圈
            $done({ bodyBytes: bodyBytes });
        }
    } catch (e) {
        console.log("脚本执行异常，紧急放行: " + e);
        $done({ bodyBytes: bodyBytes });
    }
}
