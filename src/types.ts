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

type SprossMessageIntent = "info" | "success" | "warning" | "danger";

export interface SprossMessage
  extends React.ForwardRefExoticComponent<SprossMessageProps & React.RefAttributes<HTMLDivElement>> {
  info: SprossMessageFunc;
  success: SprossMessageFunc;
  warning: SprossMessageFunc;
  danger: SprossMessageFunc;
}

export interface SprossMessageState {
  collapsed: boolean;
  collapsible: boolean;
  sameCollapsible: boolean;
  sameCollapsed: boolean;
  messages: { id: string; intent: SprossMessageIntent }[];
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
  intent?: SprossMessageIntent;
  // onClose
  onClose?: () => void;
  // onMouseEnter
  onMouseEnter?: () => void;
  // onMouseLeave
  onMouseLeave?: () => void;
  // set collapsible to true to collapse all messages
  collapsible?: boolean;
  // set sameCollapsible to true to collapse all messages with the same intent
  sameCollapsible?: boolean;
}

export interface SprossDialogProps {
  children?: React.ReactNode;
  // The className of the dialog content
  className?: string;
  // The style of the dialog content
  style?: React.CSSProperties;
  // Whether to show the dialog
  visible?: boolean;
  // The z-index of the dialog
  zIndex?: number | string;
  // onVisibleChange callback
  onVisibleChange?: (visible: boolean) => void;
  // Whether to transform from the click position
  originAware?: boolean;
  // Whether to scale the dialog content
  autoScale?: boolean;
  // The range of the dialog content
  autoScaleRange?: [number, number];
}

export interface SprossDrawerProps {
  children?: React.ReactNode;
  // The className of the drawer content
  className?: string;
  // Whether to elevate the drawer
  elevated?: boolean;
  // Whether to show the mask
  maskVisible?: boolean;
  // onVisibleChange callback
  onVisibleChange?: (visible: boolean) => void;
  // The padding of the drawer content
  padding?: number;
  // The placement of the drawer
  placement?: "top" | "left" | "right" | "bottom";
  // The style of the drawer content
  style?: React.CSSProperties;
  // Whether to show the drawer
  visible?: boolean;
  // The z-index of the drawer
  zIndex?: number | string;

  // The steps of the drawer transition
  steps?: React.ReactNode[];
  // The current step of the drawer transition
  step?: number;
  // The type of the drawer transition
  stepTransitionType?: "slide" | "fade";
}
