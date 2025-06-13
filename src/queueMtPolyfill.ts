'use client';

/**
 * floating-ui 依赖 window.queueMicrotask，在低版本浏览器中不支持，需要 polyfill
 * 使用 Promise fallback，如果 Promise 也不支持，则使用 setTimeout 覆盖 window.queueMicrotask
 */
export const queueMicrotaskPolyfill = () => {
  if (typeof window === 'undefined') return;  // 防止 SSR 执行
  if (typeof window.queueMicrotask === 'function') {
    return;
  }
  if (typeof Promise === 'function') {
    window.queueMicrotask = (fn: () => void) => {
      Promise.resolve().then(fn);
    };
  } else {
    window.queueMicrotask = (fn: () => void) => {
      setTimeout(fn, 0);
    };
  }
};
