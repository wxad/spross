'use client';

import React from 'react';
import Spross from 'spross';
import CodeBlock from '../CodeBlock';
import CodeBox from '../CodeBox';

const Basic = () => {
  return (
    <div>
      <CodeBox className="gap-2 flex-wrap">
        <button
          className="button"
          onClick={() => {
            Spross.Message.warning({
              content: 'This is a warning message.',
              collapsible: true,
              sameCollapsible: false,
            });
          }}
        >
          collapsed
        </button>
        <button
          className="button"
          onClick={() => {
            Spross.Message.info({
              content: 'This is a info message.',
              collapsible: false,
              sameCollapsible: false,
            });
          }}
        >
          expanded
        </button>
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';

() => {
  Spross.Message.warning({
    content: 'This is a warning message.',
    collapsible: true,
  });
}

() => {
  Spross.Message.info({
    content: 'This is a info message.',
    collapsible: false,
  });
}`}</CodeBlock>
    </div>
  );
};

export default Basic;
