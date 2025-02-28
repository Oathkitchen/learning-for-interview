class MyPromise {
  static resolve(value) {
    if (value && value.then) {
      return value;
    }
    return new MyPromise((resolve) => resolve(value));
  }
 
  constructor(callback) {
    this.value = undefined;
    this.reason = undefined;
    this.status = "PENDING";
 
    // 维护一个 resolve/pending 的函数队列
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
 
    const resolve = (value) => {
      // 注意此处的 setTimeout
      setTimeout(() => {
        this.status = "RESOLVED";
        this.value = value;
        this.resolveCallbacks.forEach(
          ({ fn, resolve: res }) => res(fn(value)),
        );
      });
    };
 
    const reject = (e) => {
      setTimeout(() => {
        this.status = "REJECTED";
        this.reason = e;
        this.rejectCallbacks.forEach(({ fn, reject: rej }) =>
          rej(fn(e)),
        );
      });
    };
 
    callback(resolve, reject);
  }
 
  then(callback) {
    if (this.status === "RESOLVED") {
      const result = callback(this.value);
      // 需要返回一个 Promise
      // 如果状态为 resolved，直接执行
      return MyPromise.resolve(result);
    }
    if (this.status === "PENDING") {
      // 也是返回一个 Promise
      return new MyPromise((resolve, reject) => {
        // 推进队列中，resolved 后统一执行
        this.resolveCallbacks.push({ fn: callback, resolve, reject });
      });
    }
  }
 
  catch(callback) {
    if (this.status === "REJECTED") {
      const result = callback(this.value);
      return MyPromise.resolve(result);
    }
    if (this.status === "PENDING") {
      return new MyPromise((resolve, reject) => {
        this.rejectCallbacks.push({ fn: callback, resolve, reject });
      });
    }
  }
}
 
MyPromise.resolve(10)
  .then((o) => o * 10)
  .then((o) => o + 10)
  .then((o) => {
    console.log(o);
  });
 
new MyPromise((resolve, reject) => reject("Error")).catch((e) => {
  console.log("Error", e);
});

const p = MyPromise.resolve(123)
p.then((value) => {
  console.log(`first call then${value}`)
})

p.then((value) => {
  console.log(`second call then${value}`)
})