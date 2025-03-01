Array.prototype.myReduce = function (callbackFn, ...initialValue) {
  let accumulator = initialValue.length ? initialValue[0] : this[0];
  for (let i = initialValue.length ? 0 : 1; i < this.length; i++)
    accumulator = callbackFn(accumulator, this[i], i);
  return accumulator;
};

// => 55
console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].myReduce((x, y) => x + y));

// => 155
console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].myReduce((x, y) => x + y, 100));

// => NaN
console.log(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].myReduce((x, y) => x + y, undefined)
);
