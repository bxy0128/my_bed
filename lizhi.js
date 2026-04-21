/**
 * 荔枝 5763 专项 - 报警器解除版
 */

let body = $response.body;

if (body) {
    // 1. 找到那个触发 App 切歌的报错文字，将其替换为空
    // 这样即便 App 判定你没买，它也找不到“阻断指令”
    if (body.indexOf("你暂未支持该声音") !== -1) {
        console.log("检测到阻断指令，正在物理切除...");
        body = body.replace(/你暂未支持该声音/g, "");
    }

    // 2. 将 wk 状态原地翻转 (true -> fals 保持长度，防止这个接口也崩)
    if (body.indexOf('"wk":true') !== -1) {
        body = body.replace(/"wk":true/g, '"wk":false');
    }

    // 3. 将所有涉及试听 300 秒的数值抹除 (如果这个包里也有的话)
    body = body.replace(/"audition":300/g, '"audition":000');
    
    // 4. 将金额 60 改为 00
    body = body.replace(/"amount":60/g, '"amount":00');

    $done({ body });
} else {
    $done({});
}
