'use client';

import React, { useEffect, useRef, useState } from 'react';
import Spross from 'spross';
import CodeBox from '../CodeBox';
import CodeBlock from '../CodeBlock';
import { Pane } from 'tweakpane';

const Basics = () => {
  const [params, setParams] = useState({
    type: 'popover' as 'popover' | 'tooltip',
    arrowed: true,
    trigger: 'hover' as 'hover' | 'click' | 'focus',
  });

  const [currentPosition, setCurrentPosition] = useState('topLeft');

  const tweakpaneContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pane = new Pane({
      container: tweakpaneContainerRef.current as HTMLElement,
    });

    pane.addBinding(params, 'type', {
      options: {
        popover: 'popover',
        tooltip: 'tooltip',
      },
    });

    pane.addBinding(params, 'arrowed');
    pane.addBinding(params, 'trigger', {
      options: {
        hover: 'hover',
        click: 'click',
        focus: 'focus',
      },
    });

    pane.on('change', (ev) => {
      setParams((prev) => ({
        ...prev,
        // @ts-ignore
        [ev.target.key]: ev.value,
      }));
    });

    return () => pane.dispose();
  }, []);

  const Component = params.type === 'popover' ? Spross.Popover : Spross.Tooltip;

  return (
    <div>
      <CodeBox className="pt-[120px]">
        <div ref={tweakpaneContainerRef} className="absolute top-2 right-2 w-[250px] grayscale opacity-90" />
        <div className="grid grid-cols-5 gap-1 w-fit mx-auto">
          {(
            [
              ['topLeft', 'col-start-2 row-start-1'],
              ['top', 'col-start-3 row-start-1'],
              ['topRight', 'col-start-4 row-start-1'],
              ['leftTop', 'col-start-1 row-start-2'],
              ['rightTop', 'col-start-5 row-start-2'],
              ['left', 'col-start-1 row-start-3'],
              ['right', 'col-start-5 row-start-3'],
              ['leftBottom', 'col-start-1 row-start-4'],
              ['rightBottom', 'col-start-5 row-start-4'],
              ['bottomLeft', 'col-start-2 row-start-5'],
              ['bottom', 'col-start-3 row-start-5'],
              ['bottomRight', 'col-start-4 row-start-5'],
            ] as const
          ).map(([placement, position]) => (
            <Component
              key={placement}
              popup="This is a popup."
              trigger={params.trigger}
              placement={placement}
              arrowed={params.arrowed}
              onVisibleChange={(visible) => {
                if (visible) {
                  setCurrentPosition(placement);
                }
              }}
            >
              <button className={`button ${position}`}>{placement}</button>
            </Component>
          ))}
        </div>
      </CodeBox>
      <CodeBlock initialHeight={270}>{`import Spross from 'spross'

<${params.type === 'popover' ? 'Spross.Popover' : 'Spross.Tooltip'} popup="This is a popup." trigger="${
        params.trigger
      }" placement="${currentPosition}"${!params.arrowed ? ' arrowed={false}' : ''}>
  ${currentPosition}
</${params.type === 'popover' ? 'Spross.Popover' : 'Spross.Tooltip'}>`}</CodeBlock>
    </div>
  );
};

export default Basics;
