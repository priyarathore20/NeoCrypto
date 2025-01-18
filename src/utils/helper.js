export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function truncateToTwoDecimals(num) {
  return Math.trunc(num * 100) / 100;
}
