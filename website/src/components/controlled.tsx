import React, { useState } from 'react';
import Spross from 'spross';
import CodeBox from './CodeBox';
import CodeBlock from './CodeBlock';

const Basics = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <h2>API：外部控制 Controlled</h2>
      <p>
        <code>visible</code> & <code>onVisibleChange</code> 参数的使用：
      </p>
      <CodeBox>
        <Spross
          visible={visible}
          popup="这是一个弹出层"
          onVisibleChange={(visible) => {
            setVisible(visible);
          }}
        >
          <button className="button">controlled</button>
        </Spross>
      </CodeBox>
      <CodeBlock initialHeight={270}>{`import Spross from 'spross'

// ${visible ? 'true' : 'false'}
const [visible, setVisible] = useState(true);

<Spross
  popup="这是一个弹出层"
  visible={visible}
  onVisibleChange={(bool, e, reason) => {
    setVisible(bool);
  }}
>
  controlled
</Spross>`}</CodeBlock>
    </div>
  );
};

export default Basics;
