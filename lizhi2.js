/**
 * 荔枝二进制兼容测试
 * 使用 bodyBytes 避免字符串转换导致的结构损坏
 */

let bytes = $response.bodyBytes;

if (bytes) {
    console.log("检测到原始字节流，长度: " + bytes.byteLength);
    // 此时我们不进行任何 replace 操作，只原样返回原始字节
    $done({ bodyBytes: bytes });
} else {
    $done({});
}
