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

## `search` vs `indexOf`:

1. 正则表达式支持：

   - `search()` 方法支持正则表达式，因此适用于需要复杂匹配规则的场景。
   - `indexOf()` 方法只支持简单的子字符串匹配，不支持正则表达式。

2. 区分大小写：

  - `search()` 方法可以通过正则表达式的标志（如 `i`）来控制是否区分大小写。
  - `indexOf()` 方法始终区分大小写。

3. 匹配位置：

   - `search()` 方法返回匹配的第一个子字符串的起始位置。
   - `indexOf()` 方法也返回匹配的第一个子字符串的起始位置，但可以通过 `fromIndex` 参数指定从哪个位置开始搜索。

## String.prototype.match 

- 如果你需要知道一个字符串是否与一个正则表达式 `RegExp` 匹配，请使用 `RegExp.prototype.test()`。
- 如果你只想获取第一个匹配项，你可能需要使用 `RegExp.prototype.exec()`。
- 如果你想要获取捕获组，并且全局标志已设置，你需要使用 `RegExp.prototype.exec()` 或 `String.prototype.matchAll()`。