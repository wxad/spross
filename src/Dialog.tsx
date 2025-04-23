'use client';

import React, { useEffect, useRef } from 'react';
import { Modal, ModalContent } from './ModalBase';
import useClickPosition from './useModalPosition';

import { SprossDialogProps } from './types';

const defaultProps: SprossDialogProps = {
  visible: undefined,
  onVisibleChange: undefined,
  originAware: true,
  autoScale: true,
  autoScaleRange: [0.8, 1],
};

const Dialog: React.FC<SprossDialogProps> = ({
  visible = defaultProps.visible,
  onVisibleChange = defaultProps.onVisibleChange,
  children,
  originAware = defaultProps.originAware,
  autoScale = defaultProps.autoScale,
  autoScaleRange = defaultProps.autoScaleRange,
  style,
  className,
  ...props
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  useClickPosition({
    enabled: originAware,
    visible,
    modalContentRef,
  });

  const handleResize = () => {
    if (!modalContentRef.current || !visible || !autoScale) {
      return;
    }

    const { clientWidth, clientHeight } = modalContentRef.current;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // 计算需要的空间（包括边距）
    const requiredWidth = clientWidth;
    const requiredHeight = clientHeight;

    // 计算宽度和高度的缩放比例
    const widthScale = windowWidth / requiredWidth;
    const heightScale = windowHeight / requiredHeight;

    // 取较小的缩放比例，确保内容完全可见
    const scale = Math.min(widthScale, heightScale);

    // 限制在指定范围内
    const clampedScale = Math.min(Math.max(scale, autoScaleRange[0]), autoScaleRange[1]);

    // @ts-ignore
    modalContentRef.current.style.zoom = `${clampedScale}`;
  };

  useEffect(() => {
    setTimeout(() => {
      handleResize();
    }, 0);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [modalContentRef, visible, autoScaleRange, autoScale]);

  return (
    <Modal open={visible} onOpenChange={onVisibleChange} {...props}>
      <ModalContent type="dialog" data-spross-dialog-content-wrapper ref={modalContentRef}>
        <div style={style} className={className} data-spross-dialog-content>
          {children}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default Dialog;
