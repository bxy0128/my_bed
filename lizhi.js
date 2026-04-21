/**
 * 荔枝 App 远程解锁脚本
 */
let body = $response.body;

if (body && $response.status == 200) {
    if (body.indexOf('"audition"') !== -1 || body.indexOf('"is_pay"') !== -1) {
        try {
            // 使用正则精准替换，不破坏二进制结构
            body = body.replace(/"audition":\s*\d+/g, '"audition":0')
                       .replace(/"amount":\s*\d+/g, '"amount":0')
                       .replace(/"is_pay":\s*false/g, '"is_pay":true')
                       .replace(/"can_play":\s*0/g, '"can_play":1')
                       .replace(/"is_bought":\s*false/g, '"is_bought":true');

            console.log("GitHub 远程脚本：荔枝鉴权已修改");
        } catch (e) {
            console.log("脚本执行异常: " + e);
        }
    }
}

$done({ body });
