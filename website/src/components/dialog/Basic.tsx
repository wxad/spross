'use client';

import React, { useEffect, useRef, useState } from 'react';
import Spross from 'spross';
import CodeBlock from '../CodeBlock';
import CodeBox from '../CodeBox';
import { Pane } from 'tweakpane';

const Basic = () => {
  const [visible, setVisible] = useState(false);

  const [params, setParams] = useState({
    originAware: true,
  });

  const tweakpaneContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pane = new Pane({
      container: tweakpaneContainerRef.current as HTMLElement,
    });

    pane.addBinding(params, 'originAware', {
      type: 'boolean',
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
      <CodeBox className="pt-[80px] gap-10 flex-wrap">
        <div ref={tweakpaneContainerRef} className="absolute top-2 right-2 w-[250px] grayscale opacity-90" />
        <button className="button" onClick={() => setVisible(true)}>
          {params.originAware ? 'origin-aware' : 'origin-unaware'}
        </button>
        <button className="button" onClick={() => setVisible(true)}>
          {params.originAware ? 'origin-aware' : 'origin-unaware'}
        </button>
        <button className="button" onClick={() => setVisible(true)}>
          {params.originAware ? 'origin-aware' : 'origin-unaware'}
        </button>
        <Spross.Dialog visible={visible} onVisibleChange={setVisible} originAware={params.originAware}>
          <div className="flex flex-col w-full h-full p-4">
            <div>
              <div className="grid gap-1.5 p-4 text-center sm:text-left">
                <h2 id="radix-:r5m:" className="text-lg font-semibold leading-none tracking-tight">
                  Move Goal
                </h2>
                <p id="radix-:r5n:" className="text-sm text-muted-foreground">
                  Set your daily activity goal.
                </p>
              </div>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter">350</div>
                    <div className="text-[0.70rem] uppercase text-muted-foreground">Calories/day</div>
                  </div>
                </div>
                <div className="mt-3 h-[120px]">
                  <div
                    className="recharts-responsive-container"
                    style={{ width: '100%', height: '100%', minWidth: '0px' }}
                  >
                    <div
                      className="recharts-wrapper"
                      style={{
                        position: 'relative',
                        cursor: 'default',
                        width: '100%',
                        height: '100%',
                        maxHeight: '120px',
                        maxWidth: '352px',
                      }}
                    >
                      <svg width="352" height="120" viewBox="0 0 352 120">
                        <title></title>
                        <desc></desc>
                        <defs>
                          <clipPath id="recharts20-clip">
                            <rect x="5" y="5" height="110" width="342"></rect>
                          </clipPath>
                        </defs>
                        <g className="recharts-layer recharts-bar">
                          <g className="recharts-layer recharts-bar-rectangles">
                            <g className="recharts-layer">
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="7.63076923076923"
                                  y="5"
                                  width="21"
                                  height="110"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 7.63076923076923,5 h 21 v 110 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="33.93846153846154"
                                  y="32.5"
                                  width="21"
                                  height="82.5"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 33.93846153846154,32.5 h 21 v 82.5 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="60.246153846153845"
                                  y="60"
                                  width="21"
                                  height="55"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 60.246153846153845,60 h 21 v 55 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="86.55384615384615"
                                  y="32.5"
                                  width="21"
                                  height="82.5"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 86.55384615384615,32.5 h 21 v 82.5 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="112.86153846153846"
                                  y="60"
                                  width="21"
                                  height="55"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 112.86153846153846,60 h 21 v 55 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="139.16923076923078"
                                  y="38.55000000000001"
                                  width="21"
                                  height="76.44999999999999"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 139.16923076923078,38.55000000000001 h 21 v 76.44999999999999 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="165.47692307692307"
                                  y="63.025000000000006"
                                  width="21"
                                  height="51.974999999999994"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 165.47692307692307,63.025000000000006 h 21 v 51.974999999999994 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="191.78461538461536"
                                  y="49.27499999999999"
                                  width="21"
                                  height="65.72500000000001"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 191.78461538461536,49.27499999999999 h 21 v 65.72500000000001 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="218.09230769230768"
                                  y="32.5"
                                  width="21"
                                  height="82.5"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 218.09230769230768,32.5 h 21 v 82.5 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="244.4"
                                  y="60"
                                  width="21"
                                  height="55"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 244.4,60 h 21 v 55 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="270.7076923076923"
                                  y="38.55000000000001"
                                  width="21"
                                  height="76.44999999999999"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 270.7076923076923,38.55000000000001 h 21 v 76.44999999999999 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="297.01538461538456"
                                  y="63.025000000000006"
                                  width="21"
                                  height="51.974999999999994"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 297.01538461538456,63.025000000000006 h 21 v 51.974999999999994 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                              <g className="recharts-layer recharts-bar-rectangle">
                                <path
                                  x="323.3230769230769"
                                  y="19.02499999999999"
                                  width="21"
                                  height="95.97500000000001"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 323.3230769230769,19.02499999999999 h 21 v 95.97500000000001 h -21 Z"
                                  style={{ fill: 'hsl(var(--foreground))', opacity: 0.9 }}
                                ></path>
                              </g>
                            </g>
                          </g>
                          <g className="recharts-layer"></g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto flex gap-2 px-4 pb-4 pt-8">
              <button
                className="cursor-pointer flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                type="button"
                onClick={() => setVisible(false)}
              >
                Cancel
              </button>
              <button
                onClick={() => setVisible(false)}
                className="cursor-pointer bg-neutral-900 flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-white shadow h-9 px-4 py-2"
              >
                Submit
              </button>
            </div>
          </div>
        </Spross.Dialog>
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';

// ${visible}
const [visible, setVisible] = useState(false);

<Spross.Dialog visible={visible} onVisibleChange={setVisible} ${
        !params.originAware ? 'originAware={false}' : ''
      } />`}</CodeBlock>
    </div>
  );
};

export default Basic;
