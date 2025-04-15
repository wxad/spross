const props = [
  {
    name: 'arrowed',
    type: 'boolean',
    default: 'true',
    description: '是否显示箭头',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    default: 'undefined',
    description: '子元素',
  },
  {
    name: 'mouseEnterDelay',
    type: 'number',
    default: 'undefined',
    description: 'mouseEnter 显示的延时，单位：s，只在 trigger="hover" 时有效',
  },
  {
    name: 'mouseLeaveDelay',
    type: 'number',
    default: 'undefined',
    description: 'mouseLeave 隐藏的延时，单位：s，只在 trigger="hover" 时有效',
  },
  {
    name: 'offset',
    type: 'number | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null }',
    default: 'undefined',
    description: '偏移量',
  },
  {
    name: 'onVisibleChange',
    type: '(visible: boolean, e?: Event, reason?: OpenChangeReason) => void',
    default: 'undefined',
    description: '显示发生变化时的 handler',
  },
  {
    name: 'placement',
    type: '"top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"',
    default: 'top',
    description: '弹出层位置',
  },
  {
    name: 'popup',
    type: 'React.ReactNode',
    default: 'undefined',
    description: '弹出层内容',
  },
  {
    name: 'popupClassName',
    type: 'string',
    default: 'undefined',
    description: '弹出层内容的 className',
  },
  {
    name: 'popupStyle',
    type: 'React.CSSProperties',
    default: 'undefined',
    description: '弹出层内容的 style',
  },
  {
    name: 'portal',
    type: 'boolean',
    default: 'true',
    description: '是否使用 portal 渲染到 body',
  },
  {
    name: 'size',
    type: '(availableWidth: number, availableHeight: number) => void',
    default: 'undefined',
    description: '自适应大小，组件会吐出可用空间，需业务侧自行使用',
  },
  {
    name: 'trigger',
    type: '"hover" | "focus" | "click"',
    default: 'hover',
    description: '触发方式',
  },
  {
    name: 'visible',
    type: 'boolean',
    default: 'undefined',
    description: '外层控制是否显示',
  },
];

const API = () => {
  return (
    <div>
      <h2>API</h2>
      <table>
        <thead>
          <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td>{prop.name}</td>
              <td>{prop.description}</td>
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
