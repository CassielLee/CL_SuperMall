// 函数防抖
export const debounce = (fn, delay = 100, leading = false) => {
  let timerID, result;
  return function(...args) {
    timerID && clearTimeout(timerID);
    if (leading) {
      if (!timerID) result = fn.apply(this, args);
      timerID = setTimeout(() => {
        timerID = null;
      }, delay);
    } else {
      timerID = setTimeout(() => {
        result = fn.apply(this, args);
      }, delay);
    }
    return result;
  };
};

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
