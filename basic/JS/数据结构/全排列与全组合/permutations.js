// 输入 [1, 2, 3] 的全排列为：
// [
//   [1,2,3], [1,3,2],
//   [2,1,3], [2,3,1],
//   [3,1,2], [3,2,1]
// ]

 function permutations(arr) {
  const result = [];
  function backtrace(path) {
    if (path.length === arr.length) {
      result.push(path);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if(path.includes(arr[i])) continue
      backtrace([...path, arr[i]]);
    }
  }
  backtrace([]);
  return result
}

export { permutations };
