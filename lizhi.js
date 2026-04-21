// 优化版：精准匹配，减少对 Protobuf 的破坏
let body = $response.body;

if (body && $response.status == 200) {
    // 检查是否包含关键字段，避免在不相关的二进制流中乱改
    if (body.indexOf('"audition"') !== -1 || body.indexOf('"is_pay"') !== -1) {
        
        // 尝试用更柔和的方式替换
        body = body.replace(/"audition":\s*\d+/g, '"audition":0')
                   .replace(/"amount":\s*\d+/g, '"amount":0')
                   .replace(/"is_pay":\s*false/g, '"is_pay":true')
                   .replace(/"can_play":\s*0/g, '"can_play":1');
        
        console.log("检测到鉴权接口，已执行精准修改");
    }
}

$done({ body });
