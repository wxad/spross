'use client';

import React from 'react';
import Spross from 'spross';
import CodeBlock from '../CodeBlock';
import CodeBox from '../CodeBox';

const Basic = () => {
  return (
    <div>
      <CodeBox className="gap-2 flex-wrap">
        {(['info', 'success', 'warning', 'danger'] as const).map((intent) => (
          <button
            key={intent}
            className="button"
            onClick={() => {
              Spross.Message[intent](`This is a ${intent} message.`);
            }}
          >
            {intent}
          </button>
        ))}
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';

() => { Spross.Message.info('This is a info message.') }
() => { Spross.Message.success('This is a success message.') }
() => { Spross.Message.warning('This is a warning message.') }
() => { Spross.Message.danger('This is a danger message.') }`}</CodeBlock>
    </div>
  );
};

export default Basic;
