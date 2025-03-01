// 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoked = false;

  function debounced(...args) {
    if (immediate && !isInvoked) {
      fn.apply(this, args);
      isInvoked = true;
    } else {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (immediate) {
        isInvoked = false;
      } else {
        fn.apply(this, args);
      }
    }, delay);
  }

  debounced.cancel = () => {
    clearTimeout(timer);
    isInvoked = false;
  };

  return debounced;
}

export { debounce };
