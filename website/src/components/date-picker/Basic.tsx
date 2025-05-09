'use client';

import React, { useState } from 'react';
import Spross from 'spross';
import CodeBlock from '../CodeBlock';
import CodeBox from '../CodeBox';

const Basic = () => {
  const [value, setValue] = useState('1');

  return (
    <div>
      <CodeBox className="gap-2 flex-wrap">
        <Spross.DatePicker />
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';`}</CodeBlock>
    </div>
  );
};

export default Basic;
