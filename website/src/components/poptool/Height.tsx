'use client';

import React, { useState } from 'react';
import Spross from 'spross';
import CodeBlock from '../CodeBlock';
import CodeBox from '../CodeBox';

const Height = () => {
  const [maxHeight, setMaxHeight] = useState(0);

  return (
    <div>
      <CodeBox className="p-0 h-[300px] overflow-auto block">
        <div className="flex-none flex flex-col gap-20 items-center justify-center py-[250px]">
          <Spross.Popover
            visible
            arrowed={false}
            popupStyle={{ padding: 0 }}
            popup={
              <div className="w-[200px] overflow-auto scrollbar-custom" style={{ maxHeight }}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center pl-2 h-9">
                    name {index + 1}
                  </div>
                ))}
              </div>
            }
            portal={false}
            autoPlacements={['topRight', 'bottomRight']}
            size={({ availableHeight }) => {
              setMaxHeight(availableHeight - 30);
            }}
          >
            <button className="button">list</button>
          </Spross.Popover>
        </div>
      </CodeBox>
      <CodeBlock>
        {`import Spross from 'spross';

const [maxHeight, setMaxHeight] = useState(0);

<Spross.Popover
  autoPlacements={['topRight', 'bottomRight']}
  size={({ availableHeight }) => {
    setMaxHeight(availableHeight - 30);
  }}
  popupStyle={{ padding: 0 }}
  popup={
    <div className="w-[200px] overflow-auto scrollbar-custom" style={{ maxHeight }}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex items-center pl-2 h-9">
          name {index + 1}
        </div>
      ))}
    </div>
  }
/>`}
      </CodeBlock>
    </div>
  );
};

export default Height;
