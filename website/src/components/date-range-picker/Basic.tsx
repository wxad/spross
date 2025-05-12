'use client';

import React, { useEffect, useRef, useState } from 'react';
import Spross from 'spross';
import CodeBlock from '../CodeBlock';
import CodeBox from '../CodeBox';
import { Pane } from 'tweakpane';

const Basic = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [value, setValue] = useState<[Date, Date] | undefined>();
  const [params, setParams] = useState({
    locale: 'enUS' as 'zhCN' | 'enUS',
  });

  const tweakpaneContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pane = new Pane({
      container: tweakpaneContainerRef.current as HTMLElement,
    });

    pane.addBinding(params, 'locale', {
      options: {
        zhCN: 'zhCN',
        enUS: 'enUS',
      },
    });

    pane.on('change', (ev) => {
      setParams((prev) => ({
        ...prev,
        // @ts-ignore
        [ev.target.key]: ev.value,
      }));
    });

    return () => {
      pane.dispose();
    };
  }, []);

  return (
    <div>
      <CodeBox className="gap-2 flex-wrap pt-[80px]">
        <div ref={tweakpaneContainerRef} className="absolute top-2 right-2 w-[250px] grayscale opacity-90" />
        <Spross.DateRangePicker
          value={value}
          onChange={setValue}
          locale={params.locale}
          key={params.locale}
        />
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';

// ${value?.[0]?.toLocaleDateString()} - ${value?.[1]?.toLocaleDateString()}
const [value, setValue] = useState<[Date, Date] | undefined>([today, tomorrow]);

<Spross.DateRangePicker locale="${params.locale}" value={value} onChange={setValue} />`}</CodeBlock>
    </div>
  );
};

export default Basic;
