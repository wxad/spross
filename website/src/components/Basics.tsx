import React, { useEffect, useRef, useState } from 'react';
import Spross from 'spross';
import CodeBox from './CodeBox';
import CodeBlock from './CodeBlock';
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
      title: '参数调整',
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

  return (
    <div>
      <h2>Popover & Tooltip 基础</h2>
      <p>
        <code>arrowed</code>, <code>placement</code> & <code>trigger</code> 参数的使用：
      </p>
      <CodeBox className="pt-[120px]">
        <div ref={tweakpaneContainerRef} className="absolute top-2 right-2 w-[250px] grayscale opacity-90" />
        <div className="grid grid-cols-5 gap-2 w-fit mx-auto">
          {(
            [
              ['上左', 'topLeft', 'col-start-2 row-start-1'],
              ['上', 'top', 'col-start-3 row-start-1'],
              ['上右', 'topRight', 'col-start-4 row-start-1'],
              ['左上', 'leftTop', 'col-start-1 row-start-2'],
              ['右上', 'rightTop', 'col-start-5 row-start-2'],
              ['左', 'left', 'col-start-1 row-start-3'],
              ['右', 'right', 'col-start-5 row-start-3'],
              ['左下', 'leftBottom', 'col-start-1 row-start-4'],
              ['右下', 'rightBottom', 'col-start-5 row-start-4'],
              ['下左', 'bottomLeft', 'col-start-2 row-start-5'],
              ['下', 'bottom', 'col-start-3 row-start-5'],
              ['下右', 'bottomRight', 'col-start-4 row-start-5'],
            ] as const
          ).map(([label, placement, position]) => (
            <Spross
              key={placement}
              popup="这是一个弹出层"
              trigger={params.trigger}
              placement={placement}
              arrowed={params.arrowed}
              type={params.type}
              onVisibleChange={(visible) => {
                if (visible) {
                  setCurrentPosition(placement);
                }
              }}
            >
              <button className={`button ${position}`}>{label}</button>
            </Spross>
          ))}
        </div>
      </CodeBox>
      <CodeBlock initialHeight={270}>{`import Spross from 'spross'

<Spross popup="这是一个弹出层" trigger="${params.trigger}" placement="${currentPosition}"${
        !params.arrowed ? ' arrowed={false}' : ''
      }${params.type === 'tooltip' ? ' type="tooltip"' : ''}>
  ${currentPosition}
</Spross>`}</CodeBlock>
    </div>
  );
};

export default Basics;
