'use client';

import React, { useState } from 'react';
import Spross from 'spross';
import CodeBlock from '../CodeBlock';
import CodeBox from '../CodeBox';

const Basic = () => {
  const [value, setValue] = useState<Date | undefined>(new Date());

  return (
    <div>
      <CodeBox className="gap-2 flex-wrap">
        <Spross.DatePicker value={value} onChange={setValue} />
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';`}</CodeBlock>
    </div>
  );
};

export default Basic;
