/**
 * 荔枝通路测试脚本 (不修改数据)
 */

// 打印日志，带上时间戳方便辨别
console.log("--- 荔枝通路测试成功 ---");
console.log("拦截到的 URL: " + $request.url);

// 原封不动传回数据，不做任何 replace
$done({});
