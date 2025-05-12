'use client';

import React, { useEffect, useRef, useState } from 'react';
import Spross from 'spross';
import CodeBlock from '../CodeBlock';
import CodeBox from '../CodeBox';

const Basic = () => {
  const [value, setValue] = useState<Date | undefined>(new Date());
  const today = new Date();
  // 拿到今年 1 月
  const minDate = new Date(today.getFullYear(), 0, 1);
  // 拿到今年 12 月
  const maxDate = new Date(today.getFullYear(), 11, 31);

  return (
    <div>
      <CodeBox className="gap-2 flex-wrap">
        <Spross.DatePicker
          value={value}
          onChange={setValue}
          locale="enUS"
          minDate={minDate}
          maxDate={maxDate}
          disabledDays={(date) => date.getDay() === 0 || date.getDay() === 2}
        />
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';

// ${value?.toLocaleDateString()}
const [value, setValue] = useState<Date | undefined>(new Date());
const today = new Date();
const minDate = new Date(today.getFullYear(), 0, 1);
const maxDate = new Date(today.getFullYear(), 11, 31);

<Spross.DatePicker
  value={value}
  onChange={setValue}
  minDate={minDate}
  maxDate={maxDate}
  disabledDays={(date) => date.getDay() === 0 || date.getDay() === 2}
/>`}</CodeBlock>
    </div>
  );
};

export default Basic;
