/**
 * 荔枝 5641 权限终极抹除
 */

let body = $response.body;

if (body) {
    // 1. 查找并替换含有 audition 的整段 JSON，将其伪装成免费版的空对象
    // 这比改数字更彻底，因为 App 会认为这首歌根本没有“试听”这一说
    body = body.replace(/\{"audition":300,"amount":60,"voiceId":\d+\}/g, '{}');
    
    // 2. 通用兜底：如果 JSON 结构有变，强制覆盖所有限制字段
    body = body.replace(/"audition":\d+/g, '"audition":0');
    body = body.replace(/"amount":\d+/g, '"amount":0');
    
    // 3. 抹除“购买人数”等诱导文字，彻底隐藏付费包特征
    body = body.replace(/"boughtInfoText":".+?"/g, '"boughtInfoText":""');
    
    // 4. 数值修改：满足你对 99 的偏好，同时防止 App 逻辑报错
    body = body.replace(/"score":\d+/g, '"score":99');
    body = body.replace(/"rcmd":\d+/g, '"rcmd":99');

    $done({ body });
} else {
    $done({});
}
