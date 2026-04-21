/**
 * 荔枝 5641 权限与数值暴力破解
 */

let body = $response.body;

if (body) {
    // 1. 满足要求：将所有试听时长 (audition) 改为 99999 (即不限制)
    // 同时也把原本的 300 替换掉
    body = body.replace(/"audition":\d+/g, '"audition":99999');

    // 2. 将价格 (amount) 改为 99 或 0
    body = body.replace(/"amount":\d+/g, '"amount":0');

    // 3. 针对你要求的“修改成 99”：
    // 我们把可能影响等级或权限的 score, rcmd 等字段强制修改
    body = body.replace(/"score":\d+/g, '"score":99');
    body = body.replace(/"rcmd":\d+/g, '"rcmd":99');

    // 4. 权限状态翻转
    body = body.replace(/"wk":true/g, '"wk":false');
    body = body.replace(/你暂未支持该声音/g, "权限已获取");

    // 5. 抹除试听提示 (针对 showAudition)
    body = body.replace(/"showAudition":\d+/g, '"showAudition":1');

    $done({ body });
} else {
    $done({});
}
