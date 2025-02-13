`DOMContentLoaded` 和 `window.onload` 是 JavaScript 中两个重要的事件，它们分别表示页面加载的不同阶段。理解它们的区别对于优化页面性能和用户体验非常重要。

---

### **1. `DOMContentLoaded` 事件**
- **触发时机**：  
  当 HTML 文档**完全解析并构建完成 DOM 树**时触发。此时：
  - HTML 文档已解析完毕。
  - CSS 和 JavaScript 可能仍在加载或执行。
  - 图片、样式表、iframe 等外部资源可能尚未加载完成。

- **适用场景**：  
  需要在 DOM 树构建完成后立即执行的逻辑，例如：
  - 绑定事件监听器。
  - 操作 DOM 元素。
  - 初始化页面交互逻辑。

- **代码示例**：
  ```javascript
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 已加载完成！');
  });
  ```

---

### **2. `window.onload` 事件**
- **触发时机**：  
  当页面**所有资源（包括图片、样式表、脚本、iframe 等）完全加载完成**时触发。此时：
  - DOM 树已构建完成。
  - 所有外部资源已加载完毕。
  - 页面完全渲染完成。

- **适用场景**：  
  需要在页面完全加载后执行的逻辑，例如：
  - 依赖于图片尺寸的操作。
  - 依赖于外部资源加载的初始化逻辑。

- **代码示例**：
  ```javascript
  window.onload = function() {
    console.log('页面所有资源已加载完成！');
  };
  ```

---

### **主要区别**
| 特性                  | `DOMContentLoaded`                | `window.onload`                    |
|-----------------------|-----------------------------------|-------------------------------------|
| **触发时机**           | DOM 树构建完成时触发              | 页面所有资源加载完成后触发          |
| **依赖资源**           | 不等待图片、样式表等外部资源加载  | 等待所有资源（图片、样式表等）加载  |
| **执行速度**           | 更快                              | 较慢                                |
| **适用场景**           | DOM 操作、事件绑定等              | 依赖外部资源的操作（如图片尺寸）    |

---

### **执行顺序**
1. HTML 解析完成，DOM 树构建完成 → 触发 `DOMContentLoaded`。
2. 页面所有资源（图片、样式表等）加载完成 → 触发 `window.onload`。

---

### **代码示例对比**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DOMContentLoaded vs onload</title>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      console.log('DOMContentLoaded: DOM 已加载完成！');
    });

    window.onload = function() {
      console.log('window.onload: 页面所有资源已加载完成！');
    };
  </script>
</head>
<body>
  <h1>Hello, World!</h1>
  <img src="large-image.jpg" alt="Large Image">
</body>
</html>
```

- **输出顺序**：
  1. `DOMContentLoaded: DOM 已加载完成！`
  2. （图片加载完成后）`window.onload: 页面所有资源已加载完成！`

---

### **总结**
- **`DOMContentLoaded`**：DOM 树构建完成后触发，适合操作 DOM 或绑定事件。
- **`window.onload`**：页面所有资源加载完成后触发，适合依赖外部资源的操作。
- 根据需求选择合适的事件，可以优化页面性能和用户体验。