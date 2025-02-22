字符串基本上表示为 UTF-16 码元的序列。在 UTF-16 编码中，每个码元都是 16 位长。这意味着最多有 2^16 个或 65536 个可能的字符可表示为单个 UTF-16 码元。该字符集称为 [基本多语言平面（BMP）](https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84)，包含最常见的字符，如拉丁字母、希腊字母、西里尔字母以及许多东亚字符。每个码元都可以用以 `\u` 开头的 4 个十六进制数字写在一个字符串中。

然而，整个 Unicode 字符集比 65536 大得多。额外的字符以 `代理对`（surrogate pair）的形式存储在 UTF-16 中，代理对是 **一对** 16 位码元，表示一个单个字符。为了避免歧义，配对的两个部分必须介于 `0xD800` 和 `0xDFFF` 之间，并且这些码元不用于编码单码元字符。（更准确地说，前导代理，也称为高位代理，其值在 `0xD800` 和 `0xDBFF` 之间（含），而后尾代理，也称为低位代理，其值在 `0xDC00` 和 `0xDFFF` 之间（含）。）每个 Unicode 字符由一个或者两个 UTF-16 码元组成，也称为 Unicode **码位（code point）**。每个 Unicode 码位都可以使用 `\u{xxxxxx}` 写成一个字符串，其中 `xxxxxx` 表示 1–6 个十六进制数字。

“单独代理项（lone surrogate）”是指满足以下描述之一的 16 位码元：

- 它在范围 `0xD800` 到 `0xDBFF` 内（含）（即为前导代理），但它是字符串中的最后一个码元，或者下一个码元不是后尾代理。
- 它在范围 `0xDC00` 到 `0xDFFF` 内（含）（即为后尾代理），但它是字符串中的第一个码元，或者前一个码元不是前导代理。

**单独代理项** 不代表任何 Unicode 字符。尽管大多数 JavaScript 内置方法都可以正确处理它们，因为它们都是基于 UTF-16 码元工作的，但是在与其他系统交互时，单独代理项通常不是有效的值。例如，`encodeURI()` 会为单独代理项抛出 `URIError`，因为 `URI` 编码使用 UTF-8 编码，而 UTF-8 没有任何编码单独代理项的方法。**不包含任何单独代理项** 的字符串称为 `规范的字符串`，并且可以安全地与不处理 UTF-16 的函数一起使用，例如 `encodeURI()` 或 `TextEncoder` 。你可以使用 `isWellFormed()` 方法检查字符串是否规范，或使用 `toWellFormed()` 方法清除单独代理项。

除了 Unicode 字符之外，还有某些 Unicode 字符序列应视为一个 **视觉单元**，被称为 **字素簇（grapheme cluster）**。最常见的情况是 emoji：许多具有多种变体的 emoji 实际上是由多个 emoji 组成的，通常由 <ZWJ>（`U+200D`）字符连接。

你必须小心迭代字符级别。例如，`split("")` 将按照 UTF-16 码元分割并将代理对分开。字符串索引也是指的每个 UTF-16 码元的索引。另一方面，`[Symbol.iterator]()` 按 Unicode 码位迭代。遍历字素簇将需要一些自定义代码。

```javascript
"😄".split(""); // ['\ud83d', '\ude04']; splits into two lone surrogates

// "Backhand Index Pointing Right: Dark Skin Tone"
[..."👉🏿"]; // ['👉', '🏿']
// splits into the basic "Backhand Index Pointing Right" emoji and
// the "Dark skin tone" emoji

// "Family: Man, Boy"
[..."👨‍👦"]; // [ '👨', '‍', '👦' ]
// splits into the "Man" and "Boy" emoji, joined by a ZWJ

// The United Nations flag
[..."🇺🇳"]; // [ '🇺', '🇳' ]
// splits into two "region indicator" letters "U" and "N".
// All flag emojis are formed by joining two region indicator letters
```