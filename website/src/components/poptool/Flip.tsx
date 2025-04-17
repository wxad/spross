'use client';

import React from 'react';
import Spross from 'spross';
import CodeBox from '../CodeBox';

const Flip = () => {
  return (
    <div>
      <CodeBox className="px-0 pb-0 pt-48 h-[240px] overflow-auto">
        <div className="flex-none flex flex-col gap-20 items-center justify-center w-[200%] pt-32 pb-40">
          <Spross.Popover visible popup="This is a popup.This is a popup." portal={false}>
            <button className="sticky left-1 button">↕️ flip + ↔️ shift</button>
          </Spross.Popover>
          <Spross.Popover
            visible
            popup={
              <div>
                This is a popup.
                <br />
                <br />
                This is a popup.
              </div>
            }
            placement="left"
            portal={false}
          >
            <button className="sticky bottom-1 button">↔️ flip + ↕️ shift</button>
          </Spross.Popover>
        </div>
      </CodeBox>
    </div>
  );
};

export default Flip;
