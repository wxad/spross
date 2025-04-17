'use client';

import React, { useState } from 'react';
import Spross from 'spross';
import CodeBox from '../CodeBox';

const Height = () => {
  const [maxHeight, setMaxHeight] = useState(0);

  return (
    <div>
      <CodeBox className="p-0 h-[300px] overflow-auto block">
        <div className="flex-none flex flex-col gap-20 items-center justify-center py-[250px]">
          <Spross.Popover
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
                    name {index + 1}
                  </div>
                ))}
              </div>
            }
            portal={false}
            size={(availableWidth, availableHeight) => {
              setMaxHeight(availableHeight);
            }}
          >
            <button className="button">list</button>
          </Spross.Popover>
        </div>
      </CodeBox>
    </div>
  );
};

export default Height;
