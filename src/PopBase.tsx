'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SprossPopoverProps } from './types';
import {
  useFloating,
  useHover,
  useFocus,
  useClick,
  useInteractions,
  FloatingPortal,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useMergeRefs,
  useTransitionStatus,
  arrow,
  Placement,
  limitShift,
  size,
  autoPlacement,
} from '@floating-ui/react';

const ARROW_OFFSET = 10;

const placementMap = {
  top: 'top',
  topLeft: 'top-start',
  topRight: 'top-end',
  bottom: 'bottom',
  bottomLeft: 'bottom-start',
  bottomRight: 'bottom-end',
  left: 'left',
  leftTop: 'left-start',
  leftBottom: 'left-end',
  right: 'right',
  rightTop: 'right-start',
  rightBottom: 'right-end',
} as const;

export const defaultProps: SprossPopoverProps = {
  autoPlacements: [],
  arrowed: true,
  children: undefined,
  mouseEnterDelay: 0,
  mouseLeaveDelay: 0,
  offset: undefined,
  onVisibleChange: undefined,
  placement: 'top',
  popup: undefined,
  popupClassName: '',
  popupStyle: {},
  portal: true,
  size: undefined,
  trigger: 'hover',
  visible: undefined,
  zIndex: undefined,
};

const getTransformOrigin = ({ placement, x, y }: { placement: Placement; x: number; y: number }) => {
  let xOrigin = '50%';
  let yOrigin = '50%';

  if (placement.includes('top')) {
    xOrigin = x === undefined ? '50%' : `${x + ARROW_OFFSET}px`;
    yOrigin = 'calc(100% + 8px)';
  } else if (placement.includes('bottom')) {
    xOrigin = x === undefined ? '50%' : `${x + ARROW_OFFSET}px`;
    yOrigin = '-8px';
  } else if (placement.includes('left')) {
    xOrigin = 'calc(100% + 8px)';
    yOrigin = y === undefined ? '50%' : `${y + ARROW_OFFSET}px`;
  } else if (placement.includes('right')) {
    xOrigin = '-8px';
    yOrigin = y === undefined ? '50%' : `${y + ARROW_OFFSET}px`;
  }

  return `${xOrigin} ${yOrigin}`;
};

const PopBase: React.FC<SprossPopoverProps & { type: 'popover' | 'tooltip' }> = ({
  autoPlacements = defaultProps.autoPlacements,
  arrowed = defaultProps.arrowed,
  children = defaultProps.children,
  mouseEnterDelay = defaultProps.mouseEnterDelay,
  mouseLeaveDelay = defaultProps.mouseLeaveDelay,
  offset: offsetProp = defaultProps.offset,
  onVisibleChange = defaultProps.onVisibleChange,
  placement: placementProp = defaultProps.placement,
  popup = defaultProps.popup,
  popupClassName = defaultProps.popupClassName,
  popupStyle = defaultProps.popupStyle,
  portal = defaultProps.portal,
  size: sizeProp = defaultProps.size,
  trigger = defaultProps.trigger,
  type,
  visible = defaultProps.visible,
  zIndex = defaultProps.zIndex,
}) => {
  const [isOpen, setIsOpen] = useState(visible);
  const arrowRef = useRef<SVGSVGElement>(null);

  const { refs, floatingStyles, context, middlewareData, placement } = useFloating({
    placement: placementMap[placementProp],
    open: isOpen,
    onOpenChange: (bool, e, reason) => {
      if (onVisibleChange) {
        onVisibleChange(bool, e, reason);
      }
      if (visible === undefined) {
        setIsOpen(bool);
      }
    },
    whileElementsMounted: autoUpdate,
    middleware: [
      !!offsetProp && offset(offsetProp),
      autoPlacements?.length
        ? autoPlacement({
            allowedPlacements: autoPlacements.map((placement) => placementMap[placement]),
          })
        : flip(),
      shift({
        limiter: limitShift({
          offset: 4,
        }),
        padding: 4,
      }),
      !!sizeProp &&
        size({
          apply({ availableWidth, availableHeight }: { availableWidth: number; availableHeight: number }) {
            sizeProp({
              availableWidth,
              availableHeight,
            });
          },
        }),
      arrow({
        element: arrowRef,
        padding: 12,
      }),
    ],
  });

  const { isMounted, status } = useTransitionStatus(context);

  const hover = useHover(context, {
    move: false,
    enabled: trigger === 'hover',
    delay: {
      open: mouseEnterDelay * 1000,
      close: (mouseLeaveDelay + 0.1) * 1000,
    },
  });
  const focus = useFocus(context, { enabled: trigger === 'focus' });
  const click = useClick(context, { enabled: trigger === 'click' });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, click, dismiss]);

  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, childrenRef]);

  let child = null;
  if (React.isValidElement(children) && children.type !== React.Fragment) {
    child = React.cloneElement(
      children,
      getReferenceProps({
        ref,
        ...children.props,
        'data-spross-open': context.open ? true : undefined,
      }),
    );
  }

  useEffect(() => {
    if (visible !== undefined) {
      setIsOpen(visible);
    }
  }, [visible]);

  const popupEl = (
    <>
      {isMounted && (
        <div
          data-spross-popup
          data-status={status}
          data-placement={placement}
          data-arrowed={arrowed}
          data-type={type}
          ref={refs.setFloating}
          style={{
            zIndex,
            ...(floatingStyles || {}),
          }}
          {...getFloatingProps()}
        >
          <div
            className={popupClassName}
            data-spross-popup-content
            data-placement={placement}
            data-status={status}
            data-arrowed={arrowed}
            style={{
              transformOrigin: getTransformOrigin({
                placement,
                x: middlewareData.arrow?.x,
                y: middlewareData.arrow?.y,
              }),
              ...popupStyle,
            }}
          >
            {arrowed && (
              <svg
                data-spross-popup-arrow
                data-placement={placement}
                ref={arrowRef}
                width="20"
                height="10"
                viewBox="0 0 20 10"
                fill="none"
                style={{
                  top: middlewareData.arrow?.y,
                  left: middlewareData.arrow?.x,
                }}
              >
                <path
                  d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
                  data-spross-popup-arrow-fill
                />
                <path
                  d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
                  data-spross-popup-arrow-outer-stroke
                />
                <path
                  d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
                  data-spross-popup-arrow-inner-stroke
                />
              </svg>
            )}
            {popup}
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {child || (
        <div data-spross-reference ref={refs.setReference} {...getReferenceProps()}>
          {children}
        </div>
      )}
      {portal ? <FloatingPortal>{popupEl}</FloatingPortal> : popupEl}
    </>
  );
};

export * from './types';

export default PopBase;
