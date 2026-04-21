/**
 * 荔枝 余额与金币伪装
 */

let body = $response.body;

if (body) {
    // 1. 将余额 0.0 修改为 999999.0
    // 保持格式一致，预防长度校验（如果 999999 报错，就改成 99.0）
    if (body.indexOf('"balance":"0.0"') !== -1) {
        console.log("检测到贫穷，正在充值...");
        body = body.replace(/"balance":"0.0"/g, '"balance":"9999.0"');
    }

    // 2. 针对 5763 的老逻辑继续保留
    if (body.indexOf("你暂未支持该声音") !== -1) {
        body = body.replace(/你暂未支持该声音/g, "");
    }

    $done({ body });
} else {
    $done({});
}
