import React, { useState } from 'react';
import Spross from 'spross';
import CodeBox from './CodeBox';

const Height = () => {
  const [maxHeight, setMaxHeight] = useState(0);

  return (
    <div>
      <h2>特性 3：自适应高度</h2>
      <p>自适应高度与翻转结合，最大限度利用空间：</p>
      <CodeBox className="p-0 h-[300px] overflow-auto block">
        <div className="flex-none flex flex-col gap-20 items-center justify-center py-[250px]">
          <Spross
            visible
            popupStyle={{ padding: 0 }}
            popup={
              <div
                className="w-[200px] h-[300px] overflow-auto scrollbar-custom"
                style={{
                  minHeight: 90,
                  maxHeight: maxHeight - 30,
                }}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center pl-2 h-9">
                    达人{index + 1}
                  </div>
                ))}
              </div>
            }
            portal={false}
            size={(availableWidth, availableHeight) => {
              setMaxHeight(availableHeight);
            }}
          >
            <button className="button">达人名单</button>
          </Spross>
        </div>
      </CodeBox>
    </div>
  );
};

export default Height;
