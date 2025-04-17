import React from 'react';
import { OpenChangeReason } from '@floating-ui/react';

export interface SprossPopoverProps {
  // Whether to show the arrow
  arrowed?: boolean;
  // The child element
  children?: React.ReactNode;
  // The delay time for mouseEnter, unit: s, only effective when trigger="hover"
  mouseEnterDelay?: number;
  // The delay time for mouseLeave, unit: s, only effective when trigger="hover"
  mouseLeaveDelay?: number;
  // The offset
  offset?: number
  | {
    mainAxis?: number;
    crossAxis?: number;
    alignmentAxis?: number | null;
  };
  // The handler when the display changes
  onVisibleChange?: (visible: boolean, e?: Event, reason?: OpenChangeReason) => void;
  // The position of the popup, enum oneOf ["top", "left", "right", "bottom", "topLeft", "topRight", "bottomLeft", "bottomRight", "leftTop", "leftBottom", "rightTop", "rightBottom"]
  placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom";
  // The popup content
  popup: React.ReactNode;
  // The className of the popup content
  popupClassName?: string;
  // The style of the popup content
  popupStyle?: React.CSSProperties;
  // Whether to use portal to render
  portal?: boolean;
  // The size of the popup content, the component will spit out the available space, and the business side needs to use it by itself
  size?: (availableWidth: number, availableHeight: number) => void;
  // The trigger of the popup content
  trigger?: "hover" | "focus" | "click";
  // The outer control of the popup content
  visible?: boolean;
  // The z-index of the popup content
  zIndex?: number | string;
}

type SprossMessageFunc = (config: SprossMessageProps | string) => void;

export interface SprossMessage
  extends React.ForwardRefExoticComponent<SprossMessageProps & React.RefAttributes<HTMLDivElement>> {
  normal: SprossMessageFunc;
  primary: SprossMessageFunc;
  success: SprossMessageFunc;
  warning: SprossMessageFunc;
  danger: SprossMessageFunc;
}

export interface SprossMessageState {
  collapsable: false;
  sameCollapsable: false;
  messages: { id: string }[];
}

declare global {
  interface Window {
    sprossMessageState: SprossMessageState;
  }
}

export interface SprossMessageProps {
  // className
  className?: string;
  // style
  style?: React.CSSProperties;
  // Whether to show the close button, can combine with duration 0 to close only on click
  closable?: boolean
  // content
  content: React.ReactNode;
  // duration
  duration?: number;
  // getContainer, default to document.body
  getContainer?: () => HTMLElement;
  // intent
  intent?: "normal" | "primary" | "success" | "warning" | "danger";
  // onClose
  onClose?: () => void;

}
