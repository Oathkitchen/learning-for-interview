// 输入 [1, 2, 3] 的全组合为：
// [
//   [1], [2], [3],          // k=1
//   [1,2], [1,3], [2,3],    // k=2
//   [1,2,3]                 // k=3
// ]

function combinations(arr) {
  const result = []
  // 要取出 n 个元素做排列组合
  function getResult(n){
    const nresult = []
    function backTrace(start, path){
      if(path.length === n) {
        nresult.push(path)
        return 
      }

      for(let i = start; i < arr.length; i++){
        backTrace(i + 1, [...path, arr[i]])
      }
    }
    backTrace(0, [])
    result.push(...nresult)
  }
  // 按照元素个数循环
  for(let i = 1; i <= arr.length; i++){
    getResult(i)
  }
  return result
}

export { combinations }