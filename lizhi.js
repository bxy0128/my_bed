let body = $response.body;

if (body && $response.status == 200) {
    try {
        // 只有包含关键字段时才尝试替换，减少对原始二进制流的破坏
        if (body.indexOf("audition") !== -1) {
            body = body.replace(/"audition":\d+/g, '"audition":0')
                       .replace(/"amount":\d+/g, '"amount":0');
            console.log("荔枝鉴权字段已修改");
        }
        $done({ body });
    } catch (e) {
        console.log("脚本运行报错: " + e);
        $done({}); // 报错时原样返回，防止断网
    }
} else {
    $done({});
}
