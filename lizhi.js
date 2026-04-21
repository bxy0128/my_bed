/**
 * 仅请求测试 - 绝不动 Body
 */
console.log("拦截到请求: " + $request.url);
$done({});
