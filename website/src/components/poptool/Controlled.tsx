'use client';

import React, { useState } from 'react';
import Spross from 'spross';
import CodeBox from '../CodeBox';
import CodeBlock from '../CodeBlock';

const Basics = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <CodeBox>
        <Spross.Popover
          visible={visible}
          popup="This is a popup."
          onVisibleChange={(visible) => {
            setVisible(visible);
          }}
        >
          <button className="button">controlled</button>
        </Spross.Popover>
      </CodeBox>
      <CodeBlock initialHeight={270}>{`import Spross from 'spross'

// ${visible ? 'true' : 'false'}
const [visible, setVisible] = useState(true);

<Spross
  popup="This is a popup."
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
