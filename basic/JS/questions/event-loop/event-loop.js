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
