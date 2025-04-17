'use client';

import React from 'react';
import Spross from 'spross';
import CodeBox from '../CodeBox';

const Basic = () => {
  return (
    <div>
      <CodeBox>
        <button
          className="button"
          onClick={() => {
            Spross.Message.success('This is a message.');
          }}
        >
          message
        </button>
      </CodeBox>
    </div>
  );
};

export default Basic;
