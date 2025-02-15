String.fromCodePoint() 静态方法将根据指定的码位序列返回一个字符串。

`BMP`（Basic Multilingual Plane，基本多文种平面）是 Unicode 标准中的第一个平面，包含了从 `U+0000` 到 `U+FFFF` 范围内的字符。
BMP 范围内的字符可以用一个 16 位的代码单元表示，
因此可以直接使用 `String.fromCharCode` 方法来创建这些字符。

BMP 范围内的字符包括：

- 常见的拉丁字母、数字和标点符号
- 大多数常用的符号和标点
- 各种语言的字符，如西里尔字母、希腊字母、汉字等

## fromCharCode vs fromCodePoint

- `String.fromCharCode` 只能处理 `BMP` 范围内的字符。
- `String.fromCodePoint` 可以处理所有 Unicode 字符，包括超出 BMP 范围的字符。