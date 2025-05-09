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
        <Spross.Select
          open
          value={value}
          onChange={setValue}
          options={[
            {
              label: <span>manager</span>,
              title: 'manager',
              options: [
                { label: <span>Jack</span>, value: '1' },
                { label: <span>Lucy</span>, value: '2' },
              ],
            },
            {
              label: <span>engineer</span>,
              title: 'engineer',
              options: [
                { label: <span>Chloe</span>, value: '3' },
                { label: <span>Lucas</span>, value: '4' },
              ],
            },
          ]}
        />
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';`}</CodeBlock>
    </div>
  );
};

export default Basic;
