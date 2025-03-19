// Promise 的本质是一个 状态机 + 发布订阅模式。抓住这两个核心模式，就能理解大部分代码逻辑。

// 1. 状态机模型
// 三种状态：pending、fulfilled、rejected

// 单向不可逆：pending → fulfilled 或 pending → rejected

// 2. 发布订阅模式
// 当状态为 pending 时，将 then 的回调函数存入队列

// 状态变化时，触发队列中所有回调的执行

const STATE = {
  PENDING: "0",
  FULFILLED: "1",
  REJECTED: "2",
};

class MyPromise {
  constructor(executor) {
    this.state = STATE.PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledList = [];
    this.onRejectedList = [];

    const resolve = (value) => {
      if (this.state === STATE.PENDING) {
        this.state = STATE.FULFILLED;
        this.value = value;
        this.onFulfilledList.forEach((fn) => fn());
      }
    };

    const reject = (error) => {
      if (this.state === STATE.PENDING) {
        this.state = STATE.REJECTED;
        this.reason = error;
        this.onRejectedList.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (error) => {
            throw error;
          };

    const promise2 = new MyPromise((res, rej) => {
      const handle = (callback, value) => {
        queueMicrotask(() => {
          try {
            const result = callback(value);
            resolvePromise(promise2, result, res, rej);
          } catch (error) {
            rej(error);
          }
        });
      };
      if (this.state === STATE.PENDING) {
        this.onFulfilledList.push(() => handle(onFulfilled, this.value));
        this.onRejectedList.push(() => handle(onRejected, this.reason));
      } else if (this.state === STATE.FULFILLED) {
        handle(onFulfilled, this.value);
      } else {
        handle(onRejected, this.reason);
      }
    });

    return promise2;
  }

  catch(onRejected) {
    this.then(null, onRejected);
  }
}

// 处理循环引用和 thenable
function resolvePromise(promise2, result, resolve, reject) {
  if (result === promise2)
    return reject(new TypeError("Chaining cycle detected"));

  let called = undefined;
  if (
    result !== null &&
    (typeof result === "object" || typeof result === "function")
  ) {
    try {
      const then = result.then;
      if (typeof then === "function") {
        // thenable 需要递归处理
        then.call(
          result,
          (result2) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, result2, resolve, reject);
          },
          (error) => {
            if (called) return;
            called = true;
            reject(error);
          }
        );
      } else {
        // 不是 thenable
        resolve(result);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // 普通值
    resolve(result);
  }
}

MyPromise.resolve = function (value) {
  return new MyPromise((resolve) => resolve(value));
};

MyPromise.reject = function (value) {
  return new MyPromise((resolve, reject) => reject(value))
}

MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve, reject)
    });
  });
};

MyPromise.all = function (promises) {
  const result = []
  let count = 0
  return new MyPromise((resolve, reject) => {
    for(let i = 0; i < promises.length; i++){
      promises[i].then((value) => {
        result[i] = value
        count++
        if(count === promises.length){
          resolve(result)
        }
      }, (reason) => {
        reject(reason)
      })
    }
  })
}

export { MyPromise }