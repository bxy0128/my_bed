/**
 * 荔枝 5641 零损伤脚本
 */
let body = $response.body;

// 如果是免费包，里面搜不到 audition，直接 $done({})，不碰任何数据
if (!body || body.indexOf("audition") === -1) {
    // 关键：这里直接写空，QX 会原封不动地转发原始二进制包，不产生任何破坏
    $done({}); 
} else {
    // 只有付费包（含有 audition）才进入这个逻辑
    console.log("付费包，尝试等长替换...");
    // 这里的空格数量必须和原始 JSON 字符串完全一致
    body = body.replace(/\{"audition":\d+,"amount":60,"voiceId":\d+\}/g, '{"audition":0}                                 ');
    $done({ body });
}
