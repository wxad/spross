const props = [
  {
    name: 'collapsible',
    type: 'boolean',
    default: 'false',
    description: '是否可折叠',
    enDescription: 'Whether collapsible',
  },
  {
    name: 'sameCollapsible',
    type: 'boolean',
    default: 'false',
    description: '是否可折叠，如果设置为 true，则所有相同 intent 的消息会一起折叠',
    enDescription: 'Whether collapsible if all messages with the same intent',
  },
  {
    name: 'duration',
    type: 'number',
    default: '3',
    description: '消息显示时间，单位：秒',
    enDescription: 'The duration of the message, unit: second',
  },
  {
    name: 'getContainer',
    type: '() => HTMLElement',
    default: '() => document.body',
    description: '消息容器',
    enDescription: 'The container of the message',
  },
  {
    name: 'intent',
    type: 'info | success | warning | danger',
    default: 'info',
    description: '消息类型',
    enDescription: 'The intent of the message',
  },
  {
    name: 'onClose',
    type: '() => void',
    default: 'undefined',
    description: '关闭消息时的回调',
    enDescription: 'The callback when the message is closed',
  },
  {
    name: 'onMouseEnter',
    type: '() => void',
    default: 'undefined',
    description: '鼠标进入消息时的回调',
    enDescription: 'The callback when the mouse enters the message',
  },
  {
    name: 'onMouseLeave',
    type: '() => void',
    default: 'undefined',
    description: '鼠标离开消息时的回调',
    enDescription: 'The callback when the mouse leaves the message',
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
