'use client';

import React, { useEffect, useRef, useState } from 'react';
import Spross from 'spross';
import CodeBlock from '../CodeBlock';
import CodeBox from '../CodeBox';

const Basic = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [value, setValue] = useState<[Date, Date] | undefined>();

  // 拿到今年 1 月
  const minDate = new Date(today.getFullYear(), 0, 1);
  // 拿到今年 12 月
  const maxDate = new Date(today.getFullYear(), 11, 31);

  return (
    <div>
      <CodeBox className="gap-2 flex-wrap">
        <Spross.DateRangePicker
          value={value}
          onChange={setValue}
          locale="enUS"
          minDate={minDate}
          maxDate={maxDate}
          disabledDays={(date) => date.getDay() === 0 || date.getDay() === 2}
        />
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';

// ${value?.[0]?.toLocaleDateString()} - ${value?.[1]?.toLocaleDateString()}
const [value, setValue] = useState<[Date, Date] | undefined>([today, tomorrow]);
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
