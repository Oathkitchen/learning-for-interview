function promiseAll(_promises) {
  return new Promise((resolve, reject) => {
    // Iterable => Array
    const promises = Array.isArray(_promises)
      ? _promises
      : Array.from(_promises);
    // 结果用一个数组维护
    const result = [];
    const len = promises.length;

    if (len === 0) return Promise.resolve([]);

    let count = 0;
    for (let i = 0; i < len; i++) {
      // Promise.resolve 确保把所有数据都转化为 Promise
      Promise.resolve(promises[i])
        .then((res) => {
          // 因为 promise 是异步的，保持数组一一对应
          result[i] = res;

          // 如果数组中所有 promise 都完成，则返回结果数组
          if (++count === len) {
            resolve(result);
          }
          // 当发生异常时，直接 reject
        })
        .catch((e) => reject(e));
    }
  });
}

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve) => {
  setTimeout(resolve, 100, "foo");
});

promiseAll([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// Expected output: Array [3, 42, "foo"]

const p3 = promiseAll([1, 2, 3, Promise.reject(555)]);

setTimeout(() => {
  console.log(p3);
});
