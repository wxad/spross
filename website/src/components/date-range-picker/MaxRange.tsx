'use client';

import React, { useEffect, useRef, useState } from 'react';
import Spross from 'spross';
import CodeBlock from '../CodeBlock';
import CodeBox from '../CodeBox';

const Basic = () => {
  const [value, setValue] = useState<[Date, Date] | undefined>();

  const [startDay, setStartDay] = useState<Date | undefined>(undefined);
  let oneWeekBefore: Date | undefined = undefined;
  let oneWeekLater: Date | undefined = undefined;
  if (startDay) {
    oneWeekBefore = new Date(startDay.getTime() - 7 * 24 * 60 * 60 * 1000);
    oneWeekLater = new Date(startDay.getTime() + 7 * 24 * 60 * 60 * 1000);
  }

  return (
    <div>
      <CodeBox className="gap-2 flex-wrap">
        <Spross.DateRangePicker
          value={value}
          onChange={setValue}
          locale="enUS"
          disabledDays={(day) =>
            !!startDay && ((!!oneWeekBefore && day < oneWeekBefore) || (!!oneWeekLater && day > oneWeekLater))
          }
          onStartDaySelect={(day) => setStartDay(day)}
          onEndDaySelect={() => setStartDay(undefined)}
        />
      </CodeBox>
      <CodeBlock>{`import Spross from 'spross';

const [value, setValue] = useState<[Date, Date] | undefined>();

const [startDay, setStartDay] = useState<Date | undefined>(undefined);
let oneWeekBefore: Date | undefined = undefined;
let oneWeekLater: Date | undefined = undefined;
if (startDay) {
  oneWeekBefore = new Date(startDay.getTime() - 7 * 24 * 60 * 60 * 1000);
  oneWeekLater = new Date(startDay.getTime() + 7 * 24 * 60 * 60 * 1000);
}

<Spross.DateRangePicker
  value={value}
  onChange={setValue}
  disabledDays={(day) =>
  !!startDay && ((!!oneWeekBefore && day < oneWeekBefore) || (!!oneWeekLater && day > oneWeekLater))
}
  onStartDaySelect={(day) => setStartDay(day)}
  onEndDaySelect={() => setStartDay(undefined)}
/>`}</CodeBlock>
    </div>
  );
};

export default Basic;
