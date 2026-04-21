/**
 * 荔枝 5641 保护版 - 仅针对付费包修改，不误伤免费包
 */

let body = $response.body;

// 保险丝 1：如果 body 为空或者是纯二进制乱码（不含 JSON 关键字），直接放行
if (!body || body.indexOf('{') === -1) {
    $done({});
}

// 保险丝 2：只有检测到包含 "audition" 限制的包才执行修改
if (body.indexOf('"audition":') !== -1) {
    console.log("检测到付费限制包，执行精准修改...");
    
    // 尝试等长修改 300 -> 900 (15分钟) 或 300 -> 300 (原地踏步测试)
    // 如果 300 改成 300 依然网络异常，说明接口有 MD5/签名校验，不能改 Body
    body = body.replace(/"audition":300/g, '"audition":300');
    
    // 保持 wk 长度不变
    body = body.replace(/"wk":true/g, '"wk":fals');
    
    $done({ body });
} else {
    // 如果是免费音频（包里没 audition），直接原样返回，不做任何操作
    console.log("检测为普通包/免费包，原样放行，防止误伤");
    $done({});
}
