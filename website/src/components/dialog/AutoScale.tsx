'use client';

import React, { useEffect, useRef, useState } from 'react';
import Spross from 'spross';
import CodeBlock from '../CodeBlock';
import CodeBox from '../CodeBox';
import { Pane } from 'tweakpane';

const Basic = () => {
  const [visible, setVisible] = useState(false);

  const [params, setParams] = useState({
    autoScale: true,
    min: 0.9,
    max: 1,
  });

  const tweakpaneContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pane = new Pane({
      container: tweakpaneContainerRef.current as HTMLElement,
    });

    pane.addBinding(params, 'autoScale', {
      type: 'boolean',
    });

    pane.addBinding(params, 'min', {
      type: 'slider',
      min: 0.5,
      max: 1,
      step: 0.1,
    });

    pane.addBinding(params, 'max', {
      type: 'number',
      min: 1,
      max: 1.5,
      step: 0.1,
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

  const autoScaleRange = [params.min, params.max] as [number, number];

  return (
    <div>
      <CodeBox className="pt-[80px]">
        <div ref={tweakpaneContainerRef} className="absolute top-2 right-2 w-[250px] grayscale opacity-90" />
        <button className="button" onClick={() => setVisible(true)}>
          {params.autoScale ? 'auto-scale' : 'fixed-size'}
        </button>
        <Spross.Dialog
          visible={visible}
          onVisibleChange={setVisible}
          autoScale={params.autoScale}
          autoScaleRange={autoScaleRange}
        >
          <img
            src="https://wxa.wxs.qq.com/wxad-design/yijie/modal-example.webp"
            className="w-[1000px] h-[776px]"
            style={{
              maxWidth: '1000px',
              minWidth: '1000px',
              maxHeight: '776px',
              minHeight: '776px',
            }}
          />
        </Spross.Dialog>
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';

// ${visible}
const [visible, setVisible] = useState(false);

<Spross.Dialog visible={visible} onVisibleChange={setVisible} ${
        !params.autoScale ? 'autoScale={false}' : ''
      } />`}</CodeBlock>
    </div>
  );
};

export default Basic;
