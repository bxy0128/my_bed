/*
脚本功能：荔枝 App 解锁试听限制
*/

let body = $response.body;

if (body) {
    // 1. 将试听秒数从 210 (或任何数字) 修改为 0 (代表无限制或欺骗 App)
    // 同时也尝试改为一个超大数字 99999
    body = body.replace(/"audition":\d+/g, '"audition":0');
    
    // 2. 将金额改为 0
    body = body.replace(/"amount":\d+/g, '"amount":0');
    
    // 3. 修改已购买状态（基于你之前看到的 is_pay）
    body = body.replace(/"is_pay":\s?false/g, '"is_pay":true');
    body = body.replace(/"can_play":\s?0/g, '"can_play":1');
    
    // 4. 针对 Protobuf 的二进制特征（可选）
    // 有时直接替换文本能生效，因为 QX 会尝试将响应体转为字符串处理
    console.log("荔枝鉴权已修改");
}

$done({ body });
