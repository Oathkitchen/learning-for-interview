// Promise 的本质是一个 状态机 + 发布订阅模式。抓住这两个核心模式，就能理解大部分代码逻辑。

// 1. 状态机模型
// 三种状态：pending、fulfilled、rejected

// 单向不可逆：pending → fulfilled 或 pending → rejected

// 2. 发布订阅模式
// 当状态为 pending 时，将 then 的回调函数存入队列

// 状态变化时，触发队列中所有回调的执行


class VPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        // 发布：执行所有成功回调（类似触发订阅事件）
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        // 发布：执行所有成功回调（类似触发订阅事件）
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // 订阅逻辑 + 返回新 Promise
  then(onFulfilled, onRejected) {
    // 处理透传：默认函数实现值/异常的穿透
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    // 关键：返回新 Promise（链式调用核心）
    let promise2 = new VPromise((resolve, reject) => {
      // 统一封装处理函数
      const handle = (callback, value) => {
        queueMicrotask(() => {
          try {
            const x = callback(value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      if (this.state === "fulfilled") {
        handle(onFulfilled, this.value);
      }
      if (this.state === "rejected") {
        handle(onRejected, this.reason);
      }
      if (this.state === "pending") {
        this.onResolvedCallbacks.push(() => handle(onFulfilled, this.value));
        this.onRejectedCallbacks.push(() => handle(onRejected, this.reason));
      }
    });
    return promise2;
  }
  catch(fn) {
    return this.then(null, fn);
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用检测
  if (x === promise2) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }
  let called;
  if (x != null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (err) => {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
//resolve方法
VPromise.resolve = function (val) {
  return new VPromise((resolve, reject) => {
    resolve(val);
  });
};
//reject方法
VPromise.reject = function (val) {
  return new VPromise((resolve, reject) => {
    reject(val);
  });
};
//race方法
VPromise.race = function (promises) {
  return new VPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
VPromise.all = function (promises) {
  let arr = [];
  let i = 0;
  function processData(index, data, resolve) {
    arr[index] = data;
    i++;
    if (i == promises.length) {
      resolve(arr);
    }
  }
  return new VPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => {
        processData(i, data, resolve);
      }, reject);
    }
  });
};

export { VPromise };
