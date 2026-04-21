/**
 * 逻辑验证脚本：将免费音频伪装成付费音频
 */
let body = $response.body;

// 检查是否是 142 期（免费）或其它免费音频
// 免费包通常结尾是 *{}
if (body && body.indexOf("audition") === -1) {
    console.log("检测到免费包，正在植入‘付费基因’进行逻辑测试...");

    // 模拟 143 期的付费 JSON 结构
    // 我们把 audition 设为 30 秒，这样验证起来最快
    let fakePaidJson = '{"audition":30,"amount":60,"voiceId":3160442193210518534}';
    
    // 寻找免费包末尾的 {} 并替换
    // 注意：这可能会破坏 Protobuf 结构导致网络异常，但这是验证“报错机制”的一部分
    body = body.replace(/\{\}/g, fakePaidJson);
    
    // 强制把 wk 改为 true
    if (body.indexOf('"wk":fals') !== -1) {
        body = body.replace(/"wk":fals/g, '"wk":true');
    } else {
        // 如果原本没有 wk，尝试硬塞（这步风险极大）
        body = body + ',"wk":true';
    }

    $done({ body });
} else {
    $done({});
}
