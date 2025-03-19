const STATE = {
  PENDING: "0",
  FULFILLED: "1",
  REJECTED: "2",
};

class XPromise {
  constructor(executor) {
    this.state = STATE.PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.resolveCallbackList = [];
    this.rejectCallbackList = [];

    const resolve = (value) => {
      if (this.state === STATE.PENDING) {
        this.value = value;
        this.state = STATE.FULFILLED;
        this.resolveCallbackList.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === STATE.PENDING) {
        this.reason = reason;
        this.state = STATE.REJECTED;
        this.rejectCallbackList.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulFilled, onRejected) {
    // 参数透传
    onFulFilled =
      typeof onFulFilled === "function" ? onFulFilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 链式调用
    const promise2 = new XPromise((resolve, reject) => {
      const handle = function (callback, value) {
        queueMicrotask(() => {
          try {
            const x = callback(value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      // 根据状态进行处理
      if (this.state === STATE.FULFILLED) {
        handle(onFulFilled, this.value);
      } else if (this.state === STATE.REJECTED) {
        handle(onRejected, this.reason);
      } else {
        this.resolveCallbackList.push(() => handle(onFulFilled, this.value));
        this.rejectCallbackList.push(() => handle(onRejected, this.reason));
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// 解决循环引用和 thenable 问题
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError("循环引用了"));
  }

  // 非普通值
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // thenable
    const then = x.then;
    // 避免 then 实现不规范，多次调用
    let called = false;
    if (typeof then === "function") {
      try {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (e) => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      // 不是 thenable
      resolve(x);
    }
  } else {
    // 普通值
    resolve(x);
  }
}

XPromise.resolve = function (value) {
  return new XPromise((resolve) => resolve(value));
};

XPromise.reject = function (reason) {
  return new XPromise((resolve, reject) => reject(reason));
};

XPromise.race = function (promises) {
  return new XPromise((resolve, reject) => {
    for (let index = 0; index < promises.length; index++) {
      promises[index].then(resolve, reject);
    }
  });
};

XPromise.all = function (promises) {
  const result = [];
  let count = 0;
  return new XPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise.then(
        (value) => {
          result[i] = value;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    }
  });
};

export { XPromise }