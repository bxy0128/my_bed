/*
* 荔枝 App 脚本 - 适配 Protobuf
*/

let body = $response.body;

if (typeof body !== 'undefined' && body !== null) {
    // 1. 移除/修改试听限制 (audition)
    // 匹配 "audition":210 这种结构，将其改为 0 或极大值
    body = body.replace(/"audition":\s?\d+/g, '"audition":0');
    
    // 2. 修改金额 (amount)
    body = body.replace(/"amount":\s?\d+/g, '"amount":0');
    
    // 3. 强制解锁购买状态 (is_pay / is_bought)
    body = body.replace(/"is_pay":\s?false/g, '"is_pay":true')
               .replace(/"is_bought":\s?false/g, '"is_bought":true')
               .replace(/"can_play":\s?0/g, '"can_play":1');

    // 4. (可选) 针对你抓到的 boughtInfoText 进行美化
    body = body.replace(/"boughtInfoText":\s?".*?"/g, '"boughtInfoText":"已成功解锁"');

    $done({ body });
} else {
    $done({});
}
