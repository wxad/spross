'use client';

import React, { useEffect, useRef } from 'react';
import { Modal, ModalContent } from './ModalBase';

import { SprossDrawerProps } from './types';

const defaultProps: SprossDrawerProps = {
  visible: undefined,
  onVisibleChange: undefined,
  placement: 'right',
  padding: 0,
  elevated: false,
  steps: undefined,
  step: undefined,
  stepTransitionType: 'slide',
};

const Drawer: React.FC<SprossDrawerProps> = ({
  visible = defaultProps.visible,
  onVisibleChange = defaultProps.onVisibleChange,
  placement = defaultProps.placement,
  padding = defaultProps.padding,
  elevated = defaultProps.elevated,
  children,
  steps = defaultProps.steps,
  step = defaultProps.step,
  stepTransitionType = defaultProps.stepTransitionType,
}) => {
  const paddingStylePack: React.CSSProperties = {
    borderRadius: padding,
  };

  const stepsRef = useRef<HTMLDivElement>(null);

  if (placement === 'top' || placement === 'bottom') {
    paddingStylePack.left = padding;
    paddingStylePack.right = padding;
  } else {
    paddingStylePack.top = padding;
    paddingStylePack.bottom = padding;
  }

  if (placement === 'top') {
    paddingStylePack.top = padding;
  } else if (placement === 'bottom') {
    paddingStylePack.bottom = padding;
  } else if (placement === 'left') {
    paddingStylePack.left = padding;
  } else if (placement === 'right') {
    paddingStylePack.right = padding;
  }

  const resetStyle = () => {
    const wrapper = document.querySelector('[data-spross-drawer-wrapper]') as HTMLDivElement | undefined;
    if (wrapper) {
      wrapper.style.backgroundColor = '';
      wrapper.style.borderRadius = '';
      wrapper.style.transform = '';
    }

    document.body.style.backgroundColor = '';
  };

  useEffect(() => {
    const wrapper = document.querySelector('[data-spross-drawer-wrapper]') as HTMLDivElement | undefined;

    if (!wrapper) {
      return;
    }

    if (elevated) {
      if (visible) {
        document.body.style.backgroundColor = '#000';
        const isVertical = placement === 'top' || placement === 'bottom';
        let x = '0';
        let y = '0';
        let transformOrigin = '';

        if (placement === 'top') {
          y = '-14px';
          transformOrigin = '50% 100%';
        } else if (placement === 'bottom') {
          y = '14px';
          transformOrigin = '50% 0%';
        } else if (placement === 'left') {
          x = '-14px';
          transformOrigin = '100% 50%';
        } else if (placement === 'right') {
          x = '14px';
          transformOrigin = '0% 50%';
        }

        const scale = !isVertical
          ? (window.innerHeight - 26) / window.innerHeight
          : (window.innerWidth - 26) / window.innerWidth;

        wrapper.style.backgroundColor = '#fff';
        wrapper.style.borderRadius = '8px';
        wrapper.style.transform = `scale(${scale}) translate3d(${x}, ${y}, 0)`;
        wrapper.style.transformOrigin = transformOrigin;
        wrapper.style.transitionProperty = 'transform, border-radius';
        wrapper.style.transitionDuration = '0.4s';
        wrapper.style.transitionTimingFunction = 'cubic-bezier(0.32, 0.72, 0, 1)';
      } else {
        resetStyle();
      }
    } else {
      resetStyle();
    }
  }, [elevated, visible]);

  useEffect(() => {
    return () => {
      resetStyle();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (stepsRef.current) {
        const currentStepEl = stepsRef.current.querySelector(
          `[data-spross-drawer-step][data-spross-drawer-step-index="${step}"]`,
        ) as HTMLDivElement | undefined;

        if (currentStepEl) {
          stepsRef.current.style.height = `${currentStepEl.clientHeight}px`;
        }
      }
    }, 0);
  }, [steps, step]);

  return (
    <Modal open={visible} onOpenChange={onVisibleChange}>
      <ModalContent
        data-spross-drawer-content
        data-spross-drawer-placement={placement}
        style={elevated ? {} : paddingStylePack}
        type="drawer"
      >
        {steps ? (
          <div data-spross-drawer-steps data-spross-drawer-step-transition-type={stepTransitionType} ref={stepsRef}>
            {steps.map((currentStep, index) => (
              <div
                key={index}
                data-spross-drawer-step
                data-spross-drawer-step-index={index}
                data-spross-drawer-step-active={step === index}
                data-spross-drawer-step-prev={step < index}
                data-spross-drawer-step-next={step > index}
                data-spross-drawer-step-transition-type={stepTransitionType}
              >
                {currentStep}
              </div>
            ))}
          </div>
        ) : (
          children
        )}
      </ModalContent>
    </Modal>
  );
};

export default Drawer;
