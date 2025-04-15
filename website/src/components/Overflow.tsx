import React, { useState } from 'react';
import Spross from 'spross';
import CodeBox from './CodeBox';

const Overflow = () => {
  return (
    <div>
      <h2>特性 1：内滚动跟随</h2>
      <p>
        不再需要
        <a href="https://ant.design/components/popover#api" target="_blank" className="mx-1 relative text-blue-500 underline decoration-dotted decoration-current underline-offset-2">
          过去
        </a>
        的<code>getPopupContainer</code> 来指定浮层容器，组件内自动处理定位：
      </p>
      <CodeBox className="px-0 pt-8 h-[200px] overflow-auto">
        <div className="flex-none flex items-center justify-center w-[200%] py-32">
          <Spross visible popup="这是一个弹出层这是一个弹出层">
            <button className="sticky left-0 button">内滚动跟随</button>
          </Spross>
        </div>
      </CodeBox>
    </div>
  );
};

export default Overflow;
