'use client';

import React, { useEffect, useRef, useState } from 'react';
import Spross from 'spross';
import CodeBlock from '../CodeBlock';
import CodeBox from '../CodeBox';
import { Pane } from 'tweakpane';

const Basic = () => {
  const [value, setValue] = useState<Date | undefined>(new Date());
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
        <Spross.DatePicker value={value} onChange={setValue} locale={params.locale} key={params.locale} />
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';

// ${value?.toLocaleDateString()}
const [value, setValue] = useState<Date | undefined>(new Date());

<Spross.DatePicker locale="${params.locale}" value={value} onChange={setValue} />`}</CodeBlock>
    </div>
  );
};

export default Basic;
