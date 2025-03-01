// 节流（throttle） 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

function throttle(fn, wait) {
  let timer = null
  return function(...args){
    if(timer) return 
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}

export { throttle }