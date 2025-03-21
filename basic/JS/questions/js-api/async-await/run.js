function run(generator, ...args) {
  const it = generator(...args);
  return new Promise((resolve) => {
    function step(value) {
      const result = it.next(value);
      if (result.done) {
        Promise.resolve(result.value).then((value) => resolve(value)).catch(error => it.throw(error));
      } else {
        Promise.resolve(result.value).then((value) => step(value)).catch(error => it.throw(error));
      }
    }
    step();
  });
}

export default run;
