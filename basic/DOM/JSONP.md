### **JSONP 原理**

**JSONP**（JSON with Padding）是一种跨域请求数据的技术，通常用于浏览器中的 `<script>` 标签，它突破了浏览器的同源策略限制。其原理是利用 `<script>` 标签可以跨域加载外部资源的特点，将跨域请求的返回数据通过一个回调函数进行包装，并通过该回调函数将数据传递给前端。

#### **JSONP 的工作原理：**
1. **前端发起请求**：通过动态创建一个 `<script>` 标签，将请求的 URL 作为 `src` 属性的值。这个请求通常包含一个回调函数的名称。
2. **服务器处理请求**：服务器根据请求返回数据，并将数据包装成指定格式的 JavaScript 代码，这段代码调用前端传入的回调函数，并将数据作为参数传入。
3. **前端接收数据**：浏览器加载 `<script>` 标签中的 JavaScript 代码，执行回调函数，并处理数据。

---

### **JSONP 示例**

#### 1. **前端代码（发起请求）**

假设我们需要从 `http://example.com/api` 获取数据，且服务器要求使用回调函数 `myCallback`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JSONP Example</title>
</head>
<body>
  <script>
    function myCallback(data) {
      console.log('Received data:', data);
    }

    // 动态创建一个 <script> 标签
    var script = document.createElement('script');
    script.src = 'http://example.com/api?callback=myCallback';  // 带回调函数的请求
    document.body.appendChild(script);
  </script>
</body>
</html>
```

#### 2. **服务器端代码（返回数据）**

假设服务器返回的数据是 JSON 格式的 `{ "message": "Hello, world!" }`，并将其包装成回调函数。

```javascript
// 假设这是服务器端的响应
// 数据需要包装在回调函数中
const data = { message: "Hello, world!" };

// 将返回数据包装在回调函数 myCallback 中
const callback = req.query.callback;  // 获取请求中的回调函数名
const responseData = `${callback}(${JSON.stringify(data)})`;

// 返回 JavaScript 代码
res.setHeader('Content-Type', 'application/javascript');
res.send(responseData);
```

---

### **JSONP 的优缺点**

#### **优点**
1. **突破同源策略**：通过 `<script>` 标签的跨域特性，JSONP 可以解决浏览器的跨域请求限制。
2. **简单易用**：前端实现非常简单，只需动态创建一个 `<script>` 标签并指定回调函数。
3. **支持 GET 请求**：通常 JSONP 仅支持 `GET` 请求，但对于一些只需要 `GET` 请求的场景非常有效。

#### **缺点**
1. **仅支持 GET 请求**：由于是通过 `<script>` 标签发起的请求，不能发送 `POST` 请求，因此不适用于需要提交数据的场景。
2. **安全性问题**：JSONP 请求可能引发 XSS 攻击，因为它执行的 JavaScript 代码来自外部服务器。如果外部服务被攻击或被篡改，恶意代码可能被执行。
3. **无法处理错误**：JSONP 在请求失败时没有内建的错误处理机制，因此无法像常规的 AJAX 请求那样处理错误（例如网络问题、404 等）。
4. **数据暴露**：回调函数中的数据是公开的，不能避免数据泄露。

---

### **总结**

- **JSONP** 是一个解决跨域问题的技术，特别适用于需要从不同域获取数据的情况。
- 它通过动态创建 `<script>` 标签的方式，利用 JavaScript 跨域加载的特性，绕过浏览器的同源策略限制。
- 但是 JSONP 仅支持 **GET** 请求，且存在一些安全性问题，因此在现代 Web 开发中，通常推荐使用 **CORS**（跨域资源共享）替代 JSONP，尤其是在涉及 POST 请求或敏感数据时。