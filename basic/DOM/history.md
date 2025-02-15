### `history.scrollRestoration` 作用和用法解析  

`history.scrollRestoration` 是 **`History API`** 的一个属性，用于控制当用户**导航（前进/后退）**时，页面的滚动位置是否应该恢复到之前的状态。

---

## **1. 作用**
在默认情况下，浏览器在使用 `history.back()` 或 `history.forward()` 进行页面导航时，会**自动恢复**滚动位置。`history.scrollRestoration` 允许开发者手动控制这个行为。

- **`"auto"`（默认值）**：浏览器**自动**恢复滚动位置（通常是回到用户离开时的位置）。
- **`"manual"`**：开发者**手动**管理滚动位置，浏览器不会自动恢复。

---

## **2. 语法**
```js
// 获取当前 scrollRestoration 值
console.log(history.scrollRestoration); 

// 设置为手动模式，阻止浏览器自动恢复滚动
history.scrollRestoration = 'manual';

// 设置为自动模式，让浏览器恢复滚动位置
history.scrollRestoration = 'auto';
```

---

## **3. 使用场景**
### **(1) 单页面应用（SPA）**
在 `SPA`（比如 Vue、React）中，前进/后退时默认不会触发完整的页面刷新，但**浏览器仍会自动恢复滚动位置**，可能会导致不符合用户预期的行为。

**示例：在 Vue Router 中控制滚动**
```js
const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    history.scrollRestoration = 'manual'; // 禁用自动滚动恢复
    return { x: 0, y: 0 }; // 每次导航都滚动到页面顶部
  }
});
```
✅ **这样可以确保切换路由时，每次都滚动到顶部，而不是保持上次的滚动位置。**

---

### **(2) 复杂的滚动控制**
如果你的页面中有**自定义滚动区域**，你可能希望**自己管理滚动状态**，而不是让浏览器自动恢复。

```js
// 监听前进/后退按钮，手动控制滚动位置
window.addEventListener('popstate', (event) => {
  console.log('用户点击了前进或后退');
  window.scrollTo({ top: 0, behavior: 'smooth' }); // 平滑滚动到顶部
});
```

---

## **4. 注意事项**
1. **不是所有浏览器都支持**
   - `history.scrollRestoration` 是现代浏览器支持的特性，IE 可能不支持，使用前建议检测：
     ```js
     if ('scrollRestoration' in history) {
       history.scrollRestoration = 'manual';
     }
     ```
   
2. **只影响浏览器导航**
   - `scrollRestoration` 只影响 `history.back()` 和 `history.forward()`，不会影响普通的 `pushState()` 或 `replaceState()`。

3. **在 `manual` 模式下，浏览器不会记住滚动位置**
   - 如果 `scrollRestoration = "manual"`，则需要手动存储和恢复滚动位置：
     ```js
     window.addEventListener('beforeunload', () => {
       sessionStorage.setItem('scrollY', window.scrollY);
     });

     window.addEventListener('load', () => {
       const scrollY = sessionStorage.getItem('scrollY');
       if (scrollY) window.scrollTo(0, scrollY);
     });
     ```

---

## **5. 总结**
| 模式 | 说明 | 适用场景 |
|------|------|--------|
| `auto` (默认) | 浏览器**自动恢复**滚动位置 | 适用于普通网页，不需要额外控制滚动行为 |
| `manual` | 禁止浏览器自动恢复，**开发者手动管理滚动** | 适用于 SPA 或自定义滚动管理 |

💡 **推荐**：
- 如果你的应用是传统的多页面网站，通常**不需要修改** `history.scrollRestoration`，默认 `"auto"` 即可。
- 如果是 **SPA（Vue、React 等）**，建议**手动管理**滚动行为，避免路由切换时的不合理滚动恢复。


### `history.pushState()` 方法详解  

`history.pushState()` 是 `History API` 的一个方法，主要用于 **修改浏览器地址栏的 URL**，但不会触发页面刷新。这使得它成为 **单页面应用（SPA）** 实现前端路由的重要手段。

---

## **1. 作用**
- **更改 URL**（地址栏会更新）。
- **不会触发页面刷新**（与 `window.location.href = "xxx"` 不同）。
- **不会向服务器发送请求**（仅修改浏览器历史记录）。
- **配合 `popstate` 事件，可实现前进/后退功能**。

---

## **2. 语法**
```js
history.pushState(state, title, url);
```
- **`state`**（对象）：存储一些状态数据（可用于 `popstate` 事件）。
- **`title`**（字符串，**目前大多数浏览器忽略此参数**）：建议传 `""` 或 `document.title`。
- **`url`**（字符串）：新的 URL（必须是同源的，否则会报错）。

---

## **3. 使用示例**
### **(1) 修改 URL 而不刷新页面**
```js
history.pushState({}, '', '/new-page');
console.log(window.location.pathname); // "/new-page"
```
✅ **地址栏更新，但页面不会刷新。**

---

### **(2) 存储状态信息**
```js
history.pushState({ page: 1 }, '', '/page1');
history.pushState({ page: 2 }, '', '/page2');

window.addEventListener('popstate', (event) => {
  console.log('用户点击了后退或前进', event.state);
});
```
✅ **可以存储一些数据（`event.state`），当用户前进/后退时可获取该状态。**

---

### **(3) 实现前端路由（SPA）**
单页面应用（SPA）通常使用 `pushState()` 实现**无刷新的路由跳转**。

```js
// 假设是 Vue、React 这样的前端框架
function navigateTo(url) {
  history.pushState({}, '', url);
  renderPage(url); // 根据 URL 渲染不同的组件
}

document.querySelector("#link").addEventListener("click", () => {
  navigateTo("/about");
});
```
✅ **前端修改 URL 并手动切换组件，浏览器不会刷新。**

---

## **4. 与 `replaceState()` 的区别**
| 方法 | 作用 | 影响 |
|------|------|------|
| `pushState()` | 添加新历史记录 | 后退按钮可回到上一个状态 |
| `replaceState()` | 替换当前历史记录 | 后退不会回到上一个状态 |

```js
history.pushState({}, '', '/page1');  // 访问 /page1
history.replaceState({}, '', '/page2');  // 替换为 /page2
```
✅ **最终地址是 `/page2`，但回退时不会回到 `/page1`。**

---

## **5. `pushState()` 不会触发 `popstate` 事件**
### **(1) `popstate` 事件**
- **触发时机**：用户点击**前进/后退**按钮。
- **不会触发**：`pushState()` 或 `replaceState()`。

```js
window.addEventListener('popstate', (event) => {
  console.log('后退或前进触发', event.state);
});
```

### **(2) `hashchange` vs `popstate`**
- `hashchange` 只适用于 `#` 变化（如 `example.com/#about`）。
- `pushState()` 和 `replaceState()` 不会触发 `hashchange` 事件
- 用户点击**前进/后退**按钮,会触发 `hashchange` 事件
- `location.assign` 会使得浏览器直接向后端请求页面

```js
window.addEventListener('hashchange', () => {
  console.log('Hash 变化:', location.hash);
});
```

---

## **6. 总结**
✅ `pushState()` 的主要用途：
1. **修改 URL，但不刷新页面**。
2. **前端路由（SPA）**：配合 `popstate` 事件，实现前进/后退功能。
3. **存储状态数据**，在 `popstate` 事件中获取。

💡 **适用于单页面应用（SPA）**，避免页面刷新，提高用户体验。