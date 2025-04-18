import { MutableRefObject, useEffect, useRef, useLayoutEffect } from 'react';

export default function useClickPosition({
  visible,
  modalContentRef,
  enabled,
}: {
  visible: boolean;
  modalContentRef: MutableRefObject<HTMLElement>;
  enabled: boolean;
}) {
  const mousePosRef = useRef(null);
  const getClickPosition = (e: MouseEvent) => {
    if (!enabled) return;
    mousePosRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
    setTimeout(() => {
      mousePosRef.current = null;
    }, 100);
  };

  useLayoutEffect(() => {
    if (!enabled) return;
    window.addEventListener('click', getClickPosition, true);
    return () => {
      window.removeEventListener('click', getClickPosition, true);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    setTimeout(() => {
      if (!visible) return;
      // 动画渲染初始位置
      if (mousePosRef.current && modalContentRef.current) {
        modalContentRef.current.style.transformOrigin = `${mousePosRef.current.x - modalContentRef.current.offsetLeft}px ${mousePosRef.current.y - modalContentRef.current.offsetTop
          }px`;
      }
    }, 0)
  }, [visible, modalContentRef, enabled]);
}