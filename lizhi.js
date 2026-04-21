/**
 * 荔枝 5641 精准正则替换
 */

let body = $response.body;

if (body) {
    // 这里使用了真正的正则表达式 /.../
    // 它能识别任何数字 ID，并将其替换为 {}
    let regex = /\{"audition":\d+,"amount":\d+,"voiceId":\d+\}/g;
    
    if (regex.test(body)) {
        console.log("成功匹配到付费 JSON 块，正在执行正则替换...");
        // 执行替换，后面加空格是为了对齐长度，防止 App 网络异常
        body = body.replace(regex, "{}                                   ");
    }
    
    $done({ body });
} else {
    $done({});
}
