let body = $response.body;
if (body) {
    // 1. 只改 audition，不改 status。将数字改为 0，但在前面补位以维持部分结构稳定
    // 尝试最简单的精准匹配
    if (body.indexOf('"audition":') !== -1) {
        body = body.replace(/"audition":\d+/g, '"audition":0');
        console.log("已尝试原地修改试听字段");
    }
}
$done({ body });
