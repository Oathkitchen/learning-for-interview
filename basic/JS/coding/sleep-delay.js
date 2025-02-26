function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demo() {
  console.log("开始执行");
  await sleep(2000); // 暂停 2 秒
  console.log("2 秒后执行");
}

// demo();

function delay(func, ms, ...args) {
  if (typeof func !== "function") {
    return Promise.reject(new TypeError("Expected a function"));
  }

  const sanitizedMs = Math.max(Number(ms) || 0, 0);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = func(...args)
        Promise.resolve(result).then(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }, sanitizedMs);
  });
}

async function demo2() {
  // 在 3s 之后返回 hello, world
  let result = await delay((str) => str, 3000, "hello, world");
  console.log(result);

  // 在 3s 之后返回 hello, world，第一个函数可返回 promise
  result = await delay((str) => Promise.resolve(str), 3000, "hello, world");
  console.log(result);

  result = await delay(
    () => new Promise((resolve) => setTimeout(() => resolve("hello"), 1000)),
    1000
  );
  console.log(result);
}

demo2();
