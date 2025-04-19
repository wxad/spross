const props = [
  {
    name: 'visible',
    type: 'boolean',
    default: 'undefined',
    description: '是否显示对话框',
    enDescription: 'Whether to show the drawer',
  },
  {
    name: 'onVisibleChange',
    type: 'function',
    default: 'undefined',
    description: '对话框显示状态变化时的回调函数',
    enDescription: 'Callback function when the drawer display status changes',
  },
  {
    name: 'padding',
    type: 'number',
    default: 'undefined',
    description: '对话框的padding',
    enDescription: 'The padding of the drawer',
  },
  {
    name: 'placement',
    type: '"top" | "left" | "right" | "bottom"',
    default: 'right',
    description: '对话框的位置',
    enDescription: 'The placement of the drawer',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    default: 'undefined',
    description: '对话框的内容',
    enDescription: 'The content of the drawer',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: '对话框的类名',
    enDescription: 'The class name of the drawer',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    default: 'undefined',
    description: '对话框的样式',
    enDescription: 'The style of the drawer',
  },
  {
    name: 'zIndex',
    type: 'number',
    default: 'undefined',
    description: '对话框的z-index',
    enDescription: 'The z-index of the drawer',
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
