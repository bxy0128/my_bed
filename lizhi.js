/**
 * 荔枝 5641 - 等长数值测试 (300 -> 400)
 */

let body = $response.body;

if (body) {
    // 1. 测试点：将 300 修改为 400
    // 字符长度依然是 3，不会破坏二进制结构
    if (body.indexOf('"audition":300') !== -1) {
        console.log("检测到 audition:300，正在修改为 400...");
        body = body.replace(/"audition":300/g, '"audition":400');
    }


    $done({ body });
} else {
    $done({});
}
