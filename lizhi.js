let body = $response.body;
if (body && body.indexOf("audition") !== -1) {
    // 不改数字，直接把这几个字母换成随机乱码，让 App 找不到这个字段
    // 保持长度完全一致
    body = body.replace(/audition/g, "xxxxxxxx"); 
    body = body.replace(/"wk":true/g, '"wk":fals');
    $done({ body });
} else {
    $done({});
}
