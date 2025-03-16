function throttle(fn, wait) {
  let timer = null

  return function throttled(...args){
    if(timer) return 
    fn.apply(this, args)
    timer = setTimeout(() => {
      timer = null
    }, wait)
  }
}

export { throttle };
