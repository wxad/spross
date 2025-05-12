import React, { useEffect, useMemo, useRef, useState } from 'react';
import { zhCN, enUS } from 'react-day-picker/locale';
import { DayPicker } from 'react-day-picker';
import { SprossDatePickerRangeProps } from './types';
import Popover from './Popover';
import {
  DEFAULT_HOVER_COLOR,
  MONTHS,
  getDefaultMinDate,
  getDefaultMaxDate,
  convertDateRangeToString,
  isLegalDateRangeString,
  isSameDay,
  isSameMonth,
  isDayBefore,
  isDayAfter,
  today,
} from './utils';

const DateRangePicker = ({
  minDate = getDefaultMinDate(),
  maxDate = getDefaultMaxDate(),
  value: valueProp = null,
  onChange,
  visible: visibleProp = null,
  onVisibleChange,
  disabled = false,
  locale = 'zhCN',
  disabledDays,
}: SprossDatePickerRangeProps) => {
  /**
   * selectedDay 为传给 DayPicker 的最终 Date Object，
   * value 为 input 的输入 String。
   */
  const getInitialState = () => {
    let rangeValue = '';
    let from: Date | undefined = undefined;
    let to: Date | undefined = undefined;
    if (valueProp !== null && valueProp !== undefined) {
      [from, to] = valueProp;
      rangeValue = convertDateRangeToString(valueProp, locale);
    }

    return {
      from,
      month: from,
      rangeValue,
      to,
    };
  };

  const initialState = useMemo(getInitialState, []);

  const [enteredTo, setEnteredTo] = useState<Date | null | undefined>(null);
  const [from, setFrom] = useState<Date | null | undefined>(initialState.from);
  const [to, setTo] = useState<Date | null | undefined>(initialState.to);
  const [month, setMonth] = useState<Date | null | undefined>(initialState.month);
  const [prevValueProp, setPrevValueProp] = useState<
    [Date | null | undefined, Date | null | undefined] | null | undefined
  >(valueProp);
  const [rangeValue, setRangeValue] = useState<string>(initialState.rangeValue);

  const nextClickInsideRef = useRef(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const navHoverFillRef = useRef<HTMLDivElement>(null);
  const navHoverFillInnerRef = useRef<HTMLDivElement>(null);
  const navHoverFillTimer = useRef(0);
  const navHoverFillVisible = useRef(false);

  const tdHoverFillRef = useRef<HTMLDivElement>(null);
  const tdHoverFillInnerRef = useRef<HTMLDivElement>(null);
  const tdHoverFillTimer = useRef(0);
  const tdHoverFillVisible = useRef(false);

  const [visible, setVisible] = useState(() => {
    if (visibleProp !== null && visibleProp !== undefined) {
      return visibleProp;
    }
    return false;
  });
  const [selectedDay, setSelectedDay] = useState<Date | null | undefined>(() => {
    if (valueProp !== null) {
      return valueProp;
    }
    return undefined;
  });
  const [value, setValue] = useState<string>(() => {
    if (valueProp !== null) {
      return convertDateRangeToString(valueProp, locale);
    }
    return '';
  });

  let fromFinal: Date | null | undefined;
  let enteredToFinal = to || enteredTo;
  const isReverse = from && enteredToFinal && isDayAfter(from, enteredToFinal);
  if (isReverse) {
    fromFinal = enteredToFinal;
    enteredToFinal = from;
  } else {
    fromFinal = from;
  }

  const selectedDays = {
    from: fromFinal,
    to: enteredToFinal,
  };

  useEffect(() => {
    if (valueProp !== null && valueProp !== undefined && valueProp !== prevValueProp) {
      setFrom(valueProp[0]);
      setTo(valueProp[1]);
      setRangeValue(convertDateRangeToString(valueProp, locale));
      setPrevValueProp(valueProp);
    }
    if (visibleProp !== null && visible !== !!visibleProp) {
      setVisible(!!visibleProp);
    }
  }, [valueProp]);

  const isDayDisabled = (day: Date) => {
    return (disabledDays && disabledDays(day)) || isDayBefore(day, minDate) || isDayAfter(day, maxDate);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (val.trim() === '') {
      if (valueProp === null) {
        setSelectedDay(null);
      }
      if (onChange) {
        onChange(undefined);
      }
    } else if (isLegalDateRangeString(val, locale)) {
      const newDate = new Date(val);
      newDate.setHours(0, 0, 0, 0);
      if (!isDayDisabled(newDate) && !isSameDay(newDate, selectedDay)) {
        if (valueProp === null) {
          setSelectedDay(newDate);
          setValue(convertDateRangeToString(newDate, locale));
          if (!isSameMonth(newDate, selectedDay)) {
            setMonth(newDate);
          }
        }
        if (onChange) {
          onChange(newDate);
        }
      }
    }
  };

  const handleCaptionHoverEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.persist();
    clearTimeout(navHoverFillTimer.current);

    if (!navHoverFillInnerRef.current || !navHoverFillRef.current) {
      return;
    }

    const { offsetLeft, offsetWidth } = e.currentTarget;

    setTimeout(() => {
      navHoverFillRef.current.style.width = `${offsetWidth}px`;
      navHoverFillRef.current.style.left = `${offsetLeft}px`;
      navHoverFillInnerRef.current.style.transform = 'scale(1)';
      navHoverFillInnerRef.current.style.background = DEFAULT_HOVER_COLOR;
    }, 0);

    if (!navHoverFillVisible.current) {
      navHoverFillVisible.current = true;
      navHoverFillRef.current.style.transitionDuration = '0s';

      const { clientX, clientY } = e;
      const { x, y } = e.currentTarget.getBoundingClientRect();
      navHoverFillInnerRef.current.style.transformOrigin = `${clientX - x}px ${clientY - y}px`;
    } else {
      navHoverFillRef.current.style.transitionDuration = '0.25s';
    }
  };

  const handleCaptionHoverLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.persist();
    clearTimeout(navHoverFillTimer.current);

    if (!navHoverFillInnerRef.current || !navHoverFillRef.current) {
      return;
    }

    const { clientX, clientY } = e;
    const { x, y } = e.currentTarget.getBoundingClientRect();

    navHoverFillTimer.current = window.setTimeout(() => {
      navHoverFillVisible.current = false;
      if (navHoverFillInnerRef.current) {
        navHoverFillInnerRef.current.style.transformOrigin = `${clientX - x}px ${clientY - y}px`;
        navHoverFillInnerRef.current.style.transform = 'scale(0.8)';
        navHoverFillInnerRef.current.style.background = 'transparent';
      }
    }, 100);
  };

  const resetNavHoverFill = () => {
    navHoverFillVisible.current = false;
    if (navHoverFillRef.current && navHoverFillInnerRef.current) {
      navHoverFillInnerRef.current.style.transformOrigin = '';
      navHoverFillInnerRef.current.style.background = 'transparent';
      navHoverFillInnerRef.current.style.transform = 'scale(0.8)';
    }
  };
  const handleCaptionChange = (date: Date) => {
    const newDate = date;
    if (minDate && isDayBefore(date, minDate)) {
      newDate.setMonth(minDate.getMonth());
    } else if (maxDate && isDayAfter(date, maxDate)) {
      newDate.setMonth(maxDate.getMonth());
    }
    setMonth(newDate);
  };

  const handleYearChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.currentTarget.value, 10);
    const newDate = new Date(month.getTime());
    newDate.setFullYear(newYear);
    handleCaptionChange(newDate);
  };

  const handleMonthChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.currentTarget.value, 10);
    const newDate = new Date(month.getTime());
    newDate.setMonth(newMonth);
    handleCaptionChange(newDate);
  };

  const handleTdHoverEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.persist();
    clearTimeout(tdHoverFillTimer.current);

    if (!tdHoverFillInnerRef.current || !tdHoverFillRef.current) {
      return;
    }

    const target = e.currentTarget;

    const { offsetLeft, offsetTop } = target.parentElement as HTMLTableCellElement;

    setTimeout(() => {
      tdHoverFillRef.current.style.left = `${offsetLeft}px`;
      tdHoverFillRef.current.style.top = `${offsetTop}px`;
      tdHoverFillInnerRef.current.style.transform = 'scale(1)';
      tdHoverFillInnerRef.current.style.background = DEFAULT_HOVER_COLOR;
    }, 0);

    if (!tdHoverFillVisible.current) {
      tdHoverFillVisible.current = true;
      tdHoverFillRef.current.style.transitionDuration = '0s';

      const { clientX, clientY } = e;
      const { x, y } = target.getBoundingClientRect();
      tdHoverFillInnerRef.current.style.transformOrigin = `${clientX - x}px ${clientY - y}px`;
    } else {
      tdHoverFillRef.current.style.transitionDuration = '0.25s';
    }
  };

  const handleTdHoverLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.persist();
    clearTimeout(tdHoverFillTimer.current);

    if (!tdHoverFillInnerRef.current || !tdHoverFillRef.current) {
      return;
    }

    const target = e.currentTarget;

    const { clientX, clientY } = e;
    const { x, y } = target.getBoundingClientRect();

    tdHoverFillTimer.current = window.setTimeout(() => {
      tdHoverFillVisible.current = false;
      if (tdHoverFillInnerRef.current) {
        tdHoverFillInnerRef.current.style.transformOrigin = `${clientX - x}px ${clientY - y}px`;
        tdHoverFillInnerRef.current.style.transform = 'scale(0.8)';
        tdHoverFillInnerRef.current.style.background = 'rgba(33, 34, 38, 0)';
      }
    }, 100);
  };

  return (
    <Popover
      arrowed={false}
      visible={visible}
      onVisibleChange={(bool) => {
        if (disabled) {
          return;
        }
        setTimeout(() => {
          if (nextClickInsideRef.current === true) {
            nextClickInsideRef.current = false;
            // 展开时，如果在内部元素点击，则不做默认的收起操作
            if (!bool) {
              return;
            }
          }
          const newVal = convertDateRangeToString(selectedDay, locale);
          if (!bool && value !== newVal) {
            setValue(newVal);
          }
          if (onVisibleChange) {
            onVisibleChange(bool);
          }
          if (visibleProp === null) {
            setVisible(bool);
          }
        }, 0);
      }}
      placement="bottomLeft"
      trigger="click"
      popupStyle={{ padding: 0, maxWidth: 'initial' }}
      popup={
        <div data-spross-date-picker-popup ref={popupRef}>
          <div data-spross-date-picker-caption-nav-hover-fill ref={navHoverFillRef}>
            <div data-spross-date-picker-caption-nav-hover-fill-inner ref={navHoverFillInnerRef} />
          </div>
          <div data-spross-date-picker-td-hover-fill ref={tdHoverFillRef}>
            <div data-spross-date-picker-td-hover-fill-inner ref={tdHoverFillInnerRef} />
          </div>
          <DayPicker
            data-spross-date-picker
            data-spross-date-picker-locale={locale}
            mode="range"
            numberOfMonths={2}
            captionLayout="dropdown"
            locale={locale === 'zhCN' ? zhCN : enUS}
            weekStartsOn={0}
            month={month}
            onMonthChange={handleCaptionChange}
            startMonth={minDate}
            disabled={[{ before: minDate, after: maxDate }, disabledDays]}
            endMonth={maxDate}
            selected={selectedDays}
            onSelect={(day: Date | undefined) => {
              if (day === undefined) {
                return;
              }
              const newDate = new Date(day);
              if (isDayDisabled(newDate)) {
                return;
              }
              newDate.setHours(0, 0, 0, 0);
              if (valueProp === null) {
                setSelectedDay(newDate);
                setValue(convertDateRangeToString(newDate, locale));
              }
              if (onChange) {
                onChange(newDate);
              }
            }}
            components={{
              YearsDropdown: ({ value, options }) => {
                const optionsFiltered = options
                  .filter((o) => !o.disabled)
                  .map((o) => ({
                    ...o,
                    label: o.value,
                  }));
                return (
                  <div
                    data-hover-fill-target="year"
                    data-spross-date-picker-caption-select
                    data-spross-date-picker-caption-select-year
                    onMouseEnter={handleCaptionHoverEnter}
                    onMouseLeave={handleCaptionHoverLeave}
                  >
                    <select
                      data-spross-date-picker-caption-select-input
                      name="year"
                      onChange={handleYearChange}
                      onClick={resetNavHoverFill}
                      data-value={value}
                      value={value}
                    >
                      {optionsFiltered.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                          {locale === 'zhCN' ? '年' : ''}
                        </option>
                      ))}
                    </select>
                    <svg data-spross-date-picker-caption-icon width="18" height="18" viewBox="0 0 18 18">
                      <path
                        d="M12.3501 7.81235C12.6121 7.48497 12.379 7 11.9597 7H6.04034C5.62109 7 5.388 7.48497 5.6499 7.81235L8.60959 11.512C8.80975 11.7622 9.1903 11.7622 9.39046 11.512L12.3501 7.81235Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                );
              },
              MonthsDropdown: ({ value, options }) => {
                const optionsFiltered = options
                  .filter((o) => !o.disabled)
                  .map((o) => ({
                    ...o,
                    label: locale === 'zhCN' ? MONTHS[o.value].zhCN : MONTHS[o.value].enUS,
                  }));
                return (
                  <div
                    data-hover-fill-target="month"
                    data-spross-date-picker-caption-select
                    data-spross-date-picker-caption-select-month
                    onMouseEnter={handleCaptionHoverEnter}
                    onMouseLeave={handleCaptionHoverLeave}
                  >
                    <select
                      data-spross-date-picker-caption-select-input
                      name="month"
                      onChange={handleMonthChange}
                      value={value}
                      data-value={value}
                      onClick={resetNavHoverFill}
                    >
                      {optionsFiltered.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <svg data-spross-date-picker-caption-icon width="18" height="18" viewBox="0 0 18 18">
                      <path
                        d="M12.3501 7.81235C12.6121 7.48497 12.379 7 11.9597 7H6.04034C5.62109 7 5.388 7.48497 5.6499 7.81235L8.60959 11.512C8.80975 11.7622 9.1903 11.7622 9.39046 11.512L12.3501 7.81235Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                );
              },
              Nav: ({ onPreviousClick, onNextClick, previousMonth, nextMonth }) => (
                <div data-spross-date-picker-caption-nav>
                  <button
                    data-spross-date-picker-caption-nav-button
                    data-spross-date-picker-caption-nav-button-prev
                    data-spross-date-picker-caption-nav-button-disabled={!previousMonth}
                    data-hover-fill-target="prev"
                    onClick={onPreviousClick}
                    disabled={!previousMonth}
                    onMouseEnter={handleCaptionHoverEnter}
                    onMouseLeave={handleCaptionHoverLeave}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" data-spross-date-picker-caption-nav-icon>
                      <path
                        fillRule="evenodd"
                        d="M14.303 6.69995L13.9495 6.3464C13.7542 6.15114 13.4376 6.15114 13.2424 6.3464L9.00048 10.5893L4.75709 6.3464C4.56183 6.15114 4.24525 6.15114 4.04999 6.3464L3.69643 6.69995C3.50117 6.89521 3.50117 7.2118 3.69643 7.40706L8.64618 12.3568C8.84144 12.5521 9.15803 12.5521 9.35329 12.3568L14.303 7.40706C14.4983 7.2118 14.4983 6.89521 14.303 6.69995Z"
                      />
                    </svg>
                  </button>
                  <button
                    data-spross-date-picker-caption-nav-button
                    data-spross-date-picker-caption-nav-button-next
                    data-spross-date-picker-caption-nav-button-disabled={!nextMonth}
                    data-hover-fill-target="next"
                    onClick={onNextClick}
                    disabled={!nextMonth}
                    onMouseEnter={handleCaptionHoverEnter}
                    onMouseLeave={handleCaptionHoverLeave}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" data-spross-date-picker-caption-nav-icon>
                      <path
                        fillRule="evenodd"
                        d="M14.303 6.69995L13.9495 6.3464C13.7542 6.15114 13.4376 6.15114 13.2424 6.3464L9.00048 10.5893L4.75709 6.3464C4.56183 6.15114 4.24525 6.15114 4.04999 6.3464L3.69643 6.69995C3.50117 6.89521 3.50117 7.2118 3.69643 7.40706L8.64618 12.3568C8.84144 12.5521 9.15803 12.5521 9.35329 12.3568L14.303 7.40706C14.4983 7.2118 14.4983 6.89521 14.303 6.69995Z"
                      />
                    </svg>
                  </button>
                </div>
              ),
              DayButton: ({ day, modifiers, onMouseEnter, onMouseLeave, ...props }) => {
                const { focus, today, disabled, outside, selected } = modifiers;

                return (
                  <button
                    data-spross-date-picker-day
                    data-spross-date-picker-day-disabled={disabled}
                    data-spross-date-picker-day-today={today}
                    data-spross-date-picker-day-selected={selected}
                    data-spross-date-picker-day-focus={focus}
                    data-spross-date-picker-day-outside={outside}
                    onMouseEnter={(e) => {
                      onMouseEnter?.(e);
                      handleTdHoverEnter(e);
                    }}
                    onMouseLeave={(e) => {
                      onMouseLeave?.(e);
                      handleTdHoverLeave(e);
                    }}
                    {...props}
                  >
                    {day.date.getDate()}
                  </button>
                );
              },
            }}
          />
        </div>
      }
    >
      <div data-spross-date-picker-container data-spross-date-picker-container-range>
        <input
          type="text"
          data-spross-date-picker-input
          value={value}
          onChange={handleInputChange}
          onClick={() => {
            nextClickInsideRef.current = true;
          }}
        />
        <svg data-spross-date-picker-icon width="18" height="18" viewBox="0 0 18 18">
          <path
            fillRule="evenodd"
            d="M3.5 6.5H14.5V5.5H3.5V6.5ZM3.5 8V14.5H14.5V8H3.5ZM13.5 4H14.9932C15.5492 4 16 4.45576 16 5.00247V14.9975C16 15.5512 15.5501 16 14.9932 16H3.00685C2.45078 16 2 15.5442 2 14.9975V5.00247C2 4.44882 2.44995 4 3.00685 4H4.5V2.25578C4.5 2.11452 4.6177 2 4.74769 2H5.75231C5.8891 2 6 2.11394 6 2.25578V4H12V2.25578C12 2.11452 12.1177 2 12.2477 2H13.2523C13.3891 2 13.5 2.11394 13.5 2.25578V4ZM5.25 9.25H6.75V10.75H5.25V9.25ZM8.25 9.25H9.75V10.75H8.25V9.25ZM11.25 9.25H12.75V10.75H11.25V9.25ZM5.25 12H6.75V13.5H5.25V12ZM8.25 12H9.75V13.5H8.25V12ZM11.25 12H12.75V13.5H11.25V12Z"
          />
        </svg>
      </div>
    </Popover>
  );
};

export default DateRangePicker;
