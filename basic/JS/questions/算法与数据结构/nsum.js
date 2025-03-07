export function fn(arr, n, sum) {
  arr.sort((a, b) => a - b);
  const result = [];
  function backtrack(start, path, currentSum) {
    // 基本校验
    if (path.length === n) {
      if (currentSum === sum) {
        result.push(path);
      }
      return;
    }

    // 开始一层一层的找
    for (let i = start; i < arr.length; i++) {
      if (i > start && arr[i] === arr[i - 1]) continue;
      if (currentSum + arr[i] > sum) break;
      const remaining = n - path.length;
      if (arr.length - i - 1 < remaining) break;

      backtrack(i + 1, [...path, arr[i]], currentSum + arr[i]);
    }
  }
  backtrack(0, [], 0);
  return result;
}
