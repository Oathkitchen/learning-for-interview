
### **一、事件循环的核心流程**
我们用更准确的术语重新描述你的伪代码逻辑：
```javascript
// 事件循环永不停歇
while (true) {
  // 1. 从宏任务队列（MacroTask Queue）中取出一个任务队列（如 setTimeout、DOM 事件队列）
  const macroTaskQueue = getNextMacroTaskQueue();
  const macroTask = macroTaskQueue.pop();
  execute(macroTask); // 执行宏任务（如 script 脚本、setTimeout 回调）

  // 2. 清空微任务队列（MicroTask Queue）
  while (microTaskQueue.hasTasks()) {
    const microTask = microTaskQueue.pop();
    doMicrotask(microTask); // 执行微任务（如 Promise、MutationObserver）

    // 3. 检查是否到达渲染时机（通常以 60Hz 屏幕刷新率为周期，约 16.6ms）
    if (isRepaintTime()) {
      // 执行动画任务（requestAnimationFrame 回调）
      const animationTasks = animationQueue.copyTasks();
      for (const task of animationTasks) {
        doAnimationTask(task);
      }

      // 执行 UI 渲染（样式计算、布局、绘制）
      repaint();
    }
  }
}
```

### **二、关键概念详解**
#### **1. 宏任务（MacroTask）**
- **来源**：`script` 整体代码、`setTimeout/setInterval`、`I/O` 操作、`UI 渲染`、`DOM 事件回调`（如点击事件）。
- **执行规则**：  
  - 每次事件循环只执行 **一个** 宏任务（伪代码中 `macroTaskQueue.pop()`）。
  - 不同宏任务队列有优先级（如用户交互事件队列优先级高于网络请求队列）。

#### **2. 微任务（MicroTask）**
- **来源**：`Promise.then/catch/finally`、`MutationObserver`、`queueMicrotask`。
- **执行规则**：  
  - 每个宏任务执行后，必须 **清空微任务队列**（伪代码中的 `while` 循环）。
  - 微任务执行期间产生的新微任务会继续加入当前队列，直到队列为空。

#### **3. 动画任务（Animation Tasks）**
- **来源**：`requestAnimationFrame` 注册的回调。
- **执行规则**：  
  - 在浏览器 **渲染前（Before Render）** 执行，确保动画帧与屏幕刷新同步。
  - 同一帧内的多次 `requestAnimationFrame` 回调会合并执行。

#### **4. 渲染（Rendering）**
- **触发时机**：浏览器根据屏幕刷新率（通常 60Hz）或页面活动状态决定是否渲染。
- **执行步骤**：  
  1. **样式计算**（Recalculate Style）  
  2. **布局**（Layout/Reflow）  
  3. **绘制**（Paint）  
  4. **合成**（Composite Layers）

---

### **三、场景示例分析**
假设有以下代码：
```javascript
// 宏任务 1：script 整体代码
console.log("Script Start");

// 宏任务 2：setTimeout 回调
setTimeout(() => {
  console.log("setTimeout");
}, 0);

// 微任务：Promise 回调
Promise.resolve().then(() => {
  console.log("Promise");
});

// 动画任务：requestAnimationFrame 回调
requestAnimationFrame(() => {
  console.log("requestAnimationFrame");
});

console.log("Script End");
```

#### **执行流程**：
1. **执行宏任务 1（script）**：  
   - 输出 `Script Start` → `Script End`  
   - 宏任务队列中加入 `setTimeout` 回调（宏任务 2）  
   - 微任务队列中加入 `Promise` 回调  
   - 动画队列中加入 `requestAnimationFrame` 回调  

2. **清空微任务队列**：  
   - 执行 `Promise` 回调 → 输出 `Promise`

3. **检查渲染时机**：  
   - 假设此时需要渲染，执行动画任务 → 输出 `requestAnimationFrame`  
   - 执行 UI 渲染

4. **下一轮事件循环**：  
   - 执行宏任务 2（`setTimeout`） → 输出 `setTimeout`

---

### **四、关键特性总结**
| **阶段**         | 任务类型         | 执行规则                                                                 | 示例                          |
|------------------|----------------|-------------------------------------------------------------------------|-------------------------------|
| **宏任务**       | 低优先级        | 每次事件循环执行一个，不同队列按优先级调度                                | `setTimeout`、`DOM 事件`       |
| **微任务**       | 高优先级        | 每个宏任务后必须清空队列，支持链式触发                                   | `Promise`、`MutationObserver` |
| **动画任务**     | 渲染前同步执行  | 与浏览器刷新率同步，确保流畅动画                                         | `requestAnimationFrame`        |
| **渲染**         | UI 更新        | 合并样式计算、布局、绘制操作，可能跳过不必要的渲染                         | `repaint`、`reflow`           |

---

### **五、常见问题**
#### **1. 为什么 `Promise` 比 `setTimeout` 先执行？**
- `Promise` 是微任务，会在当前宏任务结束后立即执行；`setTimeout` 是宏任务，需等待下一轮事件循环。

#### **2. `requestAnimationFrame` 属于宏任务还是微任务？**
- 它既不是宏任务也不是微任务，而是 **动画任务**，在渲染前执行。

#### **3. 微任务队列清空期间会阻塞渲染吗？**
- 是的！微任务执行是同步的，如果微任务队列过长，会延迟渲染，导致页面卡顿。

#### **4. 如何手动触发渲染？**
- 现代浏览器会自动优化渲染时机，但可通过读取布局属性（如 `offsetHeight`）强制同步布局（慎用）。

---

### **六、浏览器实现差异**
- **Node.js vs 浏览器**：Node.js 的事件循环阶段划分更复杂（如 `I/O`、`check` 阶段），无渲染逻辑。  
- **旧版 IE**：微任务支持不完整，`Promise` 和 `MutationObserver` 行为不一致。
