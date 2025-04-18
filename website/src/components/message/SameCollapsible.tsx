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
              Spross.Message[intent]({
                content: `This is a ${intent} message.`,
                sameCollapsible: true,
                collapsible: false,
                duration: 5,
                closable: true,
              });
            }}
          >
            {intent}
          </button>
        ))}
        <i className="mx-2 w-px h-4 bg-neutral-200" />
        <button
          className="button"
          onClick={() => {
            Spross.Message.info({
              content: 'This is a info message.',
              sameCollapsible: false,
              collapsible: false,
            });
          }}
        >
          expanded
        </button>
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';

() => {
  Spross.Message.info({
    content: 'This is a info message.',
    sameCollapsible: true,
    duration: 5,
    closable: true,
  });
}`}</CodeBlock>
    </div>
  );
};

export default Basic;
