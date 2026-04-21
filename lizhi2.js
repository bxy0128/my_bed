/**
 * 荔枝定长替换脚本
 */
let body = $response.body;

if (body && body.indexOf('"audition":') !== -1) {
    // 假设 audition 的值是 3 位数（如 210）
    // 我们把它改成 000，而不是 0，这样总长度不变
    body = body.replace(/"audition":\d{3}/g, '"audition":000');
    
    // 假设 amount 是 2 位数（如 60）
    // 我们把它改成 00
    body = body.replace(/"amount":\d{2}/g, '"amount":00');

    console.log("执行了定长替换，尝试维持二进制结构");
}

$done({ body });
