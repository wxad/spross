'use client';

import React, { useState } from 'react';
import Spross from 'spross';
import CodeBox from '../CodeBox';

const Overflow = () => {
  return (
    <div>
      <CodeBox className="px-0 pt-8 h-[200px] overflow-auto">
        <div className="flex-none flex items-center justify-center w-[200%] py-32">
          <Spross.Popover visible popup="This is a popup.This is a popup.">
            <button className="sticky left-0 button">Inner scrollable</button>
          </Spross.Popover>
        </div>
      </CodeBox>
    </div>
  );
};

export default Overflow;
