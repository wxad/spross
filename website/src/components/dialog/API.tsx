const props = [
  {
    name: 'visible',
    type: 'boolean',
    default: 'undefined',
    description: '是否显示对话框',
    enDescription: 'Whether to show the dialog',
  },
  {
    name: 'onVisibleChange',
    type: 'function',
    default: 'undefined',
    description: '对话框显示状态变化时的回调函数',
    enDescription: 'Callback function when the dialog display status changes',
  },
  {
    name: 'originAware',
    type: 'boolean',
    default: 'true',
    description: '是否根据点击位置显示对话框',
    enDescription: 'Whether to show the dialog based on the click position',
  },
  {
    name: 'autoScale',
    type: 'boolean',
    default: 'true',
    description: '是否自动缩放对话框',
    enDescription: 'Whether to automatically scale the dialog',
  },
  {
    name: 'autoScaleRange',
    type: 'array',
    default: '[0.75, 1]',
    description: '自动缩放对话框的范围',
    enDescription: 'The range of the dialog content',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    default: 'undefined',
    description: '对话框的内容',
    enDescription: 'The content of the dialog',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: '对话框的类名',
    enDescription: 'The class name of the dialog',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    default: 'undefined',
    description: '对话框的样式',
    enDescription: 'The style of the dialog',
  },
  {
    name: 'zIndex',
    type: 'number',
    default: 'undefined',
    description: '对话框的z-index',
    enDescription: 'The z-index of the dialog',
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
