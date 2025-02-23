while (true) {
  const queue = getNextQueue();
  task = queue.pop();
  execute(task);

  while(mirotaskQueue.hasTasks()) {
    doMicrotask();

    if(isRepaintTime()) {
      animationTasks = animationQueue.copyT
    }
  }
}