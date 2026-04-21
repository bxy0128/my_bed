/**
 * 荔枝账户余额注入
 */

let body = $response.body;

if (body) {
    // 1. 修改余额 (0.0 -> 999.0)
    // 尽量保持长度接近。如果 999.0 报错，就改回 9.00
    if (body.indexOf('"balance":"0.0"') !== -1) {
        console.log("检测到贫穷，正在注入金币...");
        body = body.replace(/"balance":"0.0"/g, '"balance":"999.0"');
    }
    
    // 2. 备用：修改 RCode 确保请求是“成功”的
    body = body.replace(/"rCode":\d+/g, '"rCode":0');

    $done({ body });
} else {
    $done({});
}
