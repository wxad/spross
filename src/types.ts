import React from 'react';
import { OpenChangeReason } from '@floating-ui/react';

export interface SprossProps {
  // 是否显示箭头
  arrowed?: boolean;
  children?: React.ReactNode;
  // mouseEnter 显示的延时，单位：s，只在 trigger="hover" 时有效
  mouseEnterDelay?: number;
  // mouseLeave 隐藏的延时，单位：s，只在 trigger="hover" 时有效
  mouseLeaveDelay?: number;
  // offset 偏移量
  offset?: number
  | {
    mainAxis?: number;
    crossAxis?: number;
    alignmentAxis?: number | null;
  };
  // 显示发生变化时的 handler
  onVisibleChange?: (visible: boolean, e?: Event, reason?: OpenChangeReason) => void;
  // 弹出层位置 enum oneOf ["top", "left", "right", "bottom", "topLeft", "topRight", "bottomLeft", "bottomRight", "leftTop", "leftBottom", "rightTop", "rightBottom"]
  placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom";
  // 弹出层内容
  popup: React.ReactNode;
  // 弹出层内容的 className
  popupClassName?: string;
  // 弹出层内容的 style
  popupStyle?: React.CSSProperties;
  // 是否使用 portal 渲染
  portal?: boolean;
  // 自适应大小，组件会吐出可用空间，需业务侧自行使用
  size?: (availableWidth: number, availableHeight: number) => void;
  // 触发方式 enum oneOf ["hover", "focus", "click"]
  trigger?: "hover" | "focus" | "click";
  // popover or tooltip
  type?: "popover" | "tooltip";
  // 外层控制是否显示
  visible?: boolean;
}