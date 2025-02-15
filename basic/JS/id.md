在 JavaScript 中，浏览器会**自动将 `id` 作为全局变量**，并将其绑定到相应的 DOM 元素。

---

## **1. 浏览器如何解析 `id` 为全局变量？**
当 HTML 页面被解析时：
1. 浏览器会为所有带 `id` 的元素自动创建**全局变量**，变量名就是 `id` 的值。
2. 这个变量的值是 `document.getElementById(id)` 的返回值，即对应的 DOM 元素。

### **示例**
```html
<input id="myInput" type="text">
<script>
  console.log(myInput); // ✅ 自动获取 <input> 元素
</script>
```
在 `script` 代码中，`myInput` **直接等于** `document.getElementById("myInput")`。

---

## **2. 为什么 `link` 直接可用？**
你的代码：
```html
<a download="hello.txt" href='#' id="link">Download</a>
<script>
  let blob = new Blob(["Hello, world!"], { type: 'text/plain' });
  link.href = URL.createObjectURL(blob); // ✅ 直接使用 link 变量
</script>
```
因为 `<a>` 标签的 `id="link"`，浏览器自动创建 `window.link` 变量，并指向该 `<a>` 元素，所以 `script` 代码中可以直接使用 `link` 变量。

## **3. 这个行为有哪些坑？**

虽然 `id` 自动绑定到全局变量很方便，但有一些**坑**需要注意：

### **(1) 如果变量名和 JavaScript 关键字/内置对象冲突**

💡 **建议：避免使用 `id="location"`、`id="name"` 等可能与全局对象冲突的名称！会造成混淆**

```html

<div id="location"></div>
<script>
  console.log(location); 
</script>
```

### **(2) 变量作用域问题**
如果你在 `script` 里声明了同名变量，会覆盖 `id` 绑定的全局变量：
```html
<a id="link"></a>
<script>
  let link = "Hello"; // 重新声明，覆盖了全局 link 变量
  console.log(link); // 输出 "Hello"，而不是 <a> 元素
</script>
```
💡 **解决方案**：手动获取 DOM 元素，避免依赖 `id` 自动绑定：
```js
let linkElement = document.getElementById("link");
```

---

## **4. 结论**
✅ **为什么 `link` 变量能直接用？**  
因为 `id="link"` 的元素，浏览器自动创建了 `window.link` 变量，并指向该 `<a>` 元素。

⚠️ **注意事项**
1. **变量名可能与 JavaScript 关键字/内置对象冲突**（如 `location`、`name`）。
2. **如果显式声明了同名变量**（`let link = ...`），会覆盖全局 `link` 变量。
3. **更推荐手动获取 DOM 元素**，比如：
   ```js
   let linkElement = document.getElementById("link");
   ```

🔹 **最佳实践：** **不要依赖 `id` 自动绑定全局变量，使用 `document.getElementById()` 更安全！** 🚀