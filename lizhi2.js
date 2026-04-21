/**
 * 荔枝音频 - 5763 接口专项解锁 (解决自动跳歌/暂未支持)
 */

let body = $response.body;
let modified = false;

if (body) {
    // 1. 强力抹除权限报警文字
    if (body.indexOf("你暂未支持该声音") !== -1) {
        body = body.replace(/你暂未支持该声音/g, "已获得播放权限");
        modified = true;
    }

    // 2. 翻转已购/未购状态 (wk 字段)
    // 免费音频通常 wk 为 false 或不存在，付费音频为 true
    if (body.indexOf('"wk":true') !== -1) {
        body = body.replace(/"wk":true/g, '"wk":false');
        modified = true;
    }

    // 3. 解除试听限制标志
    if (body.indexOf('"showAudition":0') !== -1) {
        body = body.replace(/"showAudition":0/g, '"showAudition":1');
        modified = true;
    }

    // 4. 清理可能存在的支付跳转 URL
    // 将引导支付的 H5 链接改为一个无效地址，防止 App 弹出支付框
    if (body.indexOf("guard_pay.html") !== -1) {
        body = body.replace(/guard_pay\.html[^"]+/g, "success.html");
        modified = true;
    }
}

if (modified) {
    console.log("--- 荔枝 5763 权限校验已重置 ---");
    $done({ body });
} else {
    $done({});
}
