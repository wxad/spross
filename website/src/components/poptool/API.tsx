const props = [
  {
    name: 'arrowed',
    type: 'boolean',
    default: 'true',
    description: '是否显示箭头',
    enDescription: 'Whether to show the arrow',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    default: 'undefined',
    description: '子元素',
    enDescription: 'The child element',
  },
  {
    name: 'mouseEnterDelay',
    type: 'number',
    default: 'undefined',
    description: 'mouseEnter 显示的延时，单位：s，只在 trigger="hover" 时有效',
    enDescription: 'The delay time for mouseEnter, unit: s, only effective when trigger="hover"',
  },
  {
    name: 'mouseLeaveDelay',
    type: 'number',
    default: 'undefined',
    description: 'mouseLeave 隐藏的延时，单位：s，只在 trigger="hover" 时有效',
    enDescription: 'The delay time for mouseLeave, unit: s, only effective when trigger="hover"',
  },
  {
    name: 'offset',
    type: 'number | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null }',
    default: 'undefined',
    description: '偏移量',
    enDescription: 'The offset',
  },
  {
    name: 'onVisibleChange',
    type: '(visible: boolean, e?: Event, reason?: OpenChangeReason) => void',
    default: 'undefined',
    description: '显示发生变化时的 handler',
    enDescription: 'The handler when the display changes',
  },
  {
    name: 'placement',
    type: '"top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"',
    default: 'top',
    description: '弹出层位置',
    enDescription: 'The position of the popup',
  },
  {
    name: 'popup',
    type: 'React.ReactNode',
    default: 'undefined',
    description: '弹出层内容',
    enDescription: 'The content of the popup',
  },
  {
    name: 'popupClassName',
    type: 'string',
    default: 'undefined',
    description: '弹出层内容的 className',
    enDescription: 'The className of the popup content',
  },
  {
    name: 'popupStyle',
    type: 'React.CSSProperties',
    default: 'undefined',
    description: '弹出层内容的 style',
    enDescription: 'The style of the popup content',
  },
  {
    name: 'portal',
    type: 'boolean',
    default: 'true',
    description: '是否使用 portal 渲染到 body',
    enDescription: 'Whether to use portal to render to body',
  },
  {
    name: 'size',
    type: '(availableWidth: number, availableHeight: number) => void',
    default: 'undefined',
    description: '自适应大小，组件会吐出可用空间，需业务侧自行使用',
    enDescription:
      'Adapt to size, the component will push out the available space, and the business side needs to use it by itself',
  },
  {
    name: 'trigger',
    type: '"hover" | "focus" | "click"',
    default: 'hover',
    description: '触发方式',
    enDescription: 'The trigger method',
  },
  {
    name: 'visible',
    type: 'boolean',
    default: 'undefined',
    description: '外层控制是否显示',
    enDescription: 'The outer control whether to display',
  },
  {
    name: 'zIndex',
    type: 'number | string',
    default: 'undefined',
    description: '设置 z-index',
    enDescription: 'Set z-index',
  },
];

const API = () => {
  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Props</th>
            <th>Description</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td>{prop.name}</td>
              <td>{prop.enDescription}</td>
              <td>{prop.type}</td>
              <td>{prop.default}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default API;
