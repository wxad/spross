import React, { useState } from 'react';
import Spross from 'spross';
import CodeBox from './CodeBox';

const Flip = () => {
  return (
    <div>
      <h2>特性 2：边缘时自动翻转 & 吸附跟随</h2>
      <p>
        可指定翻转或吸附：
        <br />当 <code>placement</code> 于上下时，默认 x 轴吸附，y 轴翻转；
        <br />当 <code>placement</code> 于左右时，默认 y 轴吸附，x 轴翻转。
      </p>
      <CodeBox className="px-0 pb-0 pt-48 h-[240px] overflow-auto">
        <div className="flex-none flex flex-col gap-20 items-center justify-center w-[200%] pt-32 pb-40">
          <Spross visible popup="这是一个弹出层这是一个弹出层" portal={false}>
            <button className="sticky left-1 button">上下翻转，左右吸附</button>
          </Spross>
          <Spross
            visible
            popup={
              <div>
                这是一个弹出层
                <br />
                <br />
                这是一个弹出层
              </div>
            }
            placement="left"
            portal={false}
          >
            <button className="sticky bottom-1 button">上下吸附，左右翻转</button>
          </Spross>
        </div>
      </CodeBox>
    </div>
  );
};

export default Flip;
