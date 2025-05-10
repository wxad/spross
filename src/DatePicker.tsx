import React, { useEffect, useRef, useState } from 'react';
// import the locale object
import { zhCN } from 'react-day-picker/locale';
import ReactDayPicker, { DayPicker } from 'react-day-picker';
import { SprossDatePickerProps } from './types';
import Popover from './Popover';

const DEFAULT_HOVER_COLOR = 'rgba(33, 34, 38, 0.05)';
const DEFAULT_ACTIVE_COLOR = 'rgba(33, 34, 38, 0.08)';

export const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
export const WEEKDAYS_LONG = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
export const WEEKDAYS_SHORT = ['日', '一', '二', '三', '四', '五', '六'];
export const WEEKDAYS_LONG_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const WEEKDAYS_SHORT_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const convertDateToString = (date?: Date | '' | null) => {
  if (!date) {
    return '';
  }
  let year = '';
  let month = '';
  let day = '';
  try {
    [year, month, day] = date.toLocaleDateString('zh-Hans-CN').split('/');
  } catch (error) {
    [month, day, year] = date.toLocaleDateString('en-US').split('/');
  }

  const addZero = (s: string) => {
    if (parseInt(s, 10) < 10) {
      return `0${s}`;
    }
    return s;
  };
  return `${year}-${addZero(month)}-${addZero(day)}`;
};

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isSameMonth = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
};

export const isLegalDateString = (date: string) => {
  if (date.trim() === '') {
    return true;
  }
  const strings = date.split('-');
  if (
    strings.length === 3 &&
    strings[0].length === 4 &&
    strings[1].length === 2 &&
    strings[2].length === 2 &&
    !isNaN(Number(strings[0])) &&
    !isNaN(Number(strings[1])) &&
    !isNaN(Number(strings[2]))
  ) {
    const checkLeapYear = (str: number) => (str % 4 === 0 && str % 100 !== 0) || str % 400 === 0;
    const solar = [1, 3, 5, 7, 8, 10, 12];
    const lunar = [4, 6, 9, 11];
    const year = parseInt(strings[0], 10);
    const month = parseInt(strings[1], 10);
    const day = parseInt(strings[2], 10);
    if (month > 0 && month < 13) {
      if (solar.includes(month)) {
        if (day > 0 && day < 32) {
          return true;
        }
      } else if (lunar.includes(month)) {
        if (day > 0 && day < 31) {
          return true;
        }
      } else {
        if (checkLeapYear(year) && day > 0 && day < 30) {
          return true;
        }
        if (!checkLeapYear(year) && day > 0 && day < 29) {
          return true;
        }
      }
    }
    return false;
  }
  return false;
};

export const isDayBefore = (date1: Date, date2: Date) => {
  return date1.getTime() < date2.getTime();
};

export const isDayAfter = (date1: Date, date2: Date) => {
  return date1.getTime() > date2.getTime();
};

export const today = new Date();

export const getDefaultMaxDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  date.setMonth(11, 31);
  return date;
};

export const getDefaultMinDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 4);
  date.setMonth(0, 1);
  return date;
};

const DatePicker = ({
  minDate = getDefaultMinDate(),
  maxDate = getDefaultMaxDate(),
  value: valueProp = null,
  onChange,
}: SprossDatePickerProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const navHoverFillRef = useRef<HTMLDivElement>(null);
  const navHoverFillTimer = useRef(0);
  const navHoverFillVisible = useRef(false);
  const navHoverFillPrevTarget = useRef<HTMLButtonElement | HTMLDivElement | null>(null);

  const tdHoverFillRef = useRef<HTMLDivElement>(null);
  const tdHoverFillInnerRef = useRef<HTMLDivElement>(null);
  const tdHoverFillTimer = useRef(0);
  const tdHoverFillVisible = useRef(false);

  const tdActiveFillRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(() => {
    if (valueProp !== null) {
      return valueProp;
    }
    return today;
  });
  const [selectedDay, setSelectedDay] = useState<Date | null | undefined>(() => {
    if (valueProp !== null) {
      return valueProp;
    }
    return undefined;
  });
  const [value, setValue] = useState<string>(() => {
    if (valueProp !== null) {
      return convertDateToString(valueProp);
    }
    return '';
  });

  useEffect(() => {
    if (valueProp !== null && selectedDay !== valueProp) {
      setMonth(valueProp);
      setSelectedDay(valueProp);
      setValue(convertDateToString(valueProp));
    }
  }, [valueProp]);

  const isDayDisabled = (day: Date) => {
    return false;
    // return (disabledDays && disabledDays(day)) || isDayBefore(day, minDate) || isDayAfter(day, maxDate);
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
    } else if (isLegalDateString(val)) {
      const newDate = new Date(val);
      newDate.setHours(0, 0, 0, 0);
      if (!isDayDisabled(newDate) && !isSameDay(newDate, selectedDay)) {
        if (valueProp === null) {
          setSelectedDay(newDate);
          setValue(convertDateToString(newDate));
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
    const target = e.currentTarget;
    const { x, y } = target.getBoundingClientRect();
    const { offsetLeft, offsetWidth } = target;
    const { clientX, clientY } = e;

    setTimeout(() => {
      if (navHoverFillVisible.current) {
        if (navHoverFillRef.current) {
          navHoverFillRef.current.style.width = offsetWidth + 'px';
          const { x: originX, y: originY } = navHoverFillPrevTarget.current.getBoundingClientRect();
          if (originX !== 0 && originY !== 0) {
            navHoverFillRef.current.style.transform = `translate3d(${x - originX}px, ${y - originY}px, 0) scale(1)`;
          } else {
            navHoverFillPrevTarget.current = target;
          }
        }
      } else {
        navHoverFillVisible.current = true;
        navHoverFillPrevTarget.current = target;
        if (navHoverFillRef.current) {
          navHoverFillRef.current.style.left = `${offsetLeft}px`;
          navHoverFillRef.current.style.width = offsetWidth + 'px';
          navHoverFillRef.current.style.transformOrigin = `${clientX - x}px ${clientY - y}px`;
          navHoverFillRef.current.style.background = DEFAULT_HOVER_COLOR;
          navHoverFillRef.current.style.transform = 'scale(1)';
          navHoverFillRef.current.style.transition = '';
        }
      }
    }, 0);
  };

  const handleCaptionHoverLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    const target = e.currentTarget;
    const { clientX, clientY } = e;
    e.persist();
    clearTimeout(navHoverFillTimer.current);

    navHoverFillTimer.current = window.setTimeout(() => {
      navHoverFillVisible.current = false;
      navHoverFillPrevTarget.current = null;

      if (navHoverFillRef.current) {
        navHoverFillRef.current.style.transformOrigin = '';
        navHoverFillRef.current.style.background = 'transparent';
        navHoverFillRef.current.style.width = '';
        navHoverFillRef.current.style.transform = '';
        navHoverFillRef.current.style.transition = '0s';
      }

      setTimeout(() => {
        const { x, y } = target.getBoundingClientRect();

        let originX = clientX - x;
        let originY = clientY - y;

        if (originX < 0) {
          originX = 0;
        } else if (originX > target.offsetWidth) {
          originX = target.offsetWidth;
        }

        if (originY < 0) {
          originY = 0;
        } else if (originY > target.offsetHeight) {
          originY = target.offsetHeight;
        }

        if (navHoverFillRef.current) {
          navHoverFillRef.current.style.transformOrigin = `${originX}px ${originY}px`;
          navHoverFillRef.current.style.background = 'transparent';
          navHoverFillRef.current.style.transform = 'scale(0.8)';
          navHoverFillRef.current.style.transition = '';
        }
      }, 0);
    }, 100);
  };

  const resetNavHoverFill = () => {
    navHoverFillVisible.current = false;
    navHoverFillPrevTarget.current = null;
    if (navHoverFillRef.current) {
      navHoverFillRef.current.style.transformOrigin = '';
      navHoverFillRef.current.style.background = 'transparent';
      navHoverFillRef.current.style.width = '';
      navHoverFillRef.current.style.transform = '';
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

  const handleTdHoverEnter = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.persist();
    clearTimeout(tdHoverFillTimer.current);

    if (!tdHoverFillInnerRef.current || !tdHoverFillRef.current) {
      return;
    }

    const { offsetLeft, offsetTop } = e.currentTarget;

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
      const { x, y } = e.currentTarget.getBoundingClientRect();
      tdHoverFillInnerRef.current.style.transformOrigin = `${clientX - x}px ${clientY - y}px`;
    } else {
      tdHoverFillRef.current.style.transitionDuration = '0.25s';
    }
  };

  const handleTdHoverLeave = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.persist();
    clearTimeout(tdHoverFillTimer.current);

    if (!tdHoverFillInnerRef.current || !tdHoverFillRef.current) {
      return;
    }

    const { clientX, clientY } = e;
    const { x, y } = e.currentTarget.getBoundingClientRect();

    tdHoverFillTimer.current = window.setTimeout(() => {
      tdHoverFillVisible.current = false;
      tdHoverFillInnerRef.current.style.transformOrigin = `${clientX - x}px ${clientY - y}px`;
      tdHoverFillInnerRef.current.style.transform = 'scale(0.8)';
      tdHoverFillInnerRef.current.style.background = 'rgba(33, 34, 38, 0)';
    }, 100);
  };

  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();
  const years = [maxYear];
  for (let year = maxYear - 1; year >= minYear; year -= 1) {
    years.push(year);
  }

  const displayMonth = month.getMonth();
  const displayYear = month.getFullYear();

  const startMonth = displayYear === minYear ? minDate.getMonth() : 0;
  const endMonth = displayYear === maxYear ? maxDate.getMonth() + 1 : 12;
  const months = [startMonth];
  for (let month = startMonth + 1; month < endMonth; month += 1) {
    months.push(month);
  }

  if (!months.includes(displayMonth)) {
    months.unshift(displayMonth);
  }

  useEffect(() => {
    if (selectedDay) {
      setTimeout(() => {
        const currentActiveTd = popupRef.current?.querySelector(
          `[data-spross-date-picker-day-selected="true"]`,
        ) as HTMLTableCellElement;
        if (currentActiveTd) {
          if (tdActiveFillRef.current) {
            tdActiveFillRef.current.style.transform = `translate3d(${currentActiveTd.offsetLeft}px, ${currentActiveTd.offsetTop}px, 0) scale(1)`;
            tdActiveFillRef.current.style.transition = '';
          }
        }
      }, 0);
    }
  }, [selectedDay]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        const currentActiveTd = popupRef.current?.querySelector(
          `[data-spross-date-picker-day-selected="true"]`,
        ) as HTMLTableCellElement;
        if (currentActiveTd) {
          if (tdActiveFillRef.current) {
            tdActiveFillRef.current.style.opacity = '1';
            tdActiveFillRef.current.style.transform = `translate3d(${currentActiveTd.offsetLeft}px, ${currentActiveTd.offsetTop}px, 0) scale(1)`;
            tdActiveFillRef.current.style.transition = '';
          }
        } else {
          if (tdActiveFillRef.current) {
            tdActiveFillRef.current.style.opacity = '0';
            tdActiveFillRef.current.style.transition = '';
          }
        }
      }, 0);
    }
  }, [month]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        const currentActiveTd = popupRef.current?.querySelector(
          `[data-spross-date-picker-day-selected="true"]`,
        ) as HTMLTableCellElement;

        if (currentActiveTd) {
          if (tdActiveFillRef.current) {
            tdActiveFillRef.current.style.transform = `translate3d(${currentActiveTd.offsetLeft}px, ${currentActiveTd.offsetTop}px, 0) scale(1)`;
            tdActiveFillRef.current.style.transition = '0s';
          }
        } else {
          if (tdActiveFillRef.current) {
            tdActiveFillRef.current.style.opacity = '0';
            tdActiveFillRef.current.style.transition = '0s';
          }
        }
      }, 0);
    }
  }, [visible]);

  return (
    <Popover
      arrowed={false}
      visible={visible}
      onVisibleChange={setVisible}
      placement="bottomLeft"
      trigger="click"
      popupStyle={{ padding: 0 }}
      popup={
        <div data-spross-date-picker-popup ref={popupRef}>
          <div data-spross-date-picker-caption-nav-hover-fill ref={navHoverFillRef} />
          <div data-spross-date-picker-td-hover-fill ref={tdHoverFillRef}>
            <div data-spross-date-picker-td-hover-fill-inner ref={tdHoverFillInnerRef} />
          </div>
          <div data-spross-date-picker-td-active-fill ref={tdActiveFillRef} />
          <DayPicker
            captionLayout="dropdown"
            locale={{
              ...zhCN,
            }}
            weekStartsOn={0}
            month={month}
            onMonthChange={handleCaptionChange}
            startMonth={minDate}
            endMonth={maxDate}
            selected={selectedDay}
            components={{
              YearsDropdown: () => {
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
                      value={displayYear}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}年
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
              MonthsDropdown: () => {
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
                      value={displayMonth}
                      data-value={displayMonth}
                      onClick={resetNavHoverFill}
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month + 1}月
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
                    data-spross-date-picker-caption-nav-prev
                    data-hover-fill-target="prev"
                    onClick={onPreviousClick}
                    disabled={!previousMonth}
                    onMouseEnter={handleCaptionHoverEnter}
                    onMouseLeave={handleCaptionHoverLeave}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" data-spross-date-picker-caption-nav-prev-icon>
                      <path
                        fillRule="evenodd"
                        d="M14.303 6.69995L13.9495 6.3464C13.7542 6.15114 13.4376 6.15114 13.2424 6.3464L9.00048 10.5893L4.75709 6.3464C4.56183 6.15114 4.24525 6.15114 4.04999 6.3464L3.69643 6.69995C3.50117 6.89521 3.50117 7.2118 3.69643 7.40706L8.64618 12.3568C8.84144 12.5521 9.15803 12.5521 9.35329 12.3568L14.303 7.40706C14.4983 7.2118 14.4983 6.89521 14.303 6.69995Z"
                      />
                    </svg>
                  </button>
                  <button
                    data-spross-date-picker-caption-nav-next
                    data-hover-fill-target="next"
                    onClick={onNextClick}
                    disabled={!nextMonth}
                    onMouseEnter={handleCaptionHoverEnter}
                    onMouseLeave={handleCaptionHoverLeave}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" data-spross-date-picker-caption-nav-next-icon>
                      <path
                        fillRule="evenodd"
                        d="M14.303 6.69995L13.9495 6.3464C13.7542 6.15114 13.4376 6.15114 13.2424 6.3464L9.00048 10.5893L4.75709 6.3464C4.56183 6.15114 4.24525 6.15114 4.04999 6.3464L3.69643 6.69995C3.50117 6.89521 3.50117 7.2118 3.69643 7.40706L8.64618 12.3568C8.84144 12.5521 9.15803 12.5521 9.35329 12.3568L14.303 7.40706C14.4983 7.2118 14.4983 6.89521 14.303 6.69995Z"
                      />
                    </svg>
                  </button>
                </div>
              ),
              Day: ({ day, modifiers, ...props }) => {
                const { focus, today, disabled, outside } = modifiers;
                return (
                  <td
                    data-spross-date-picker-day
                    data-spross-date-picker-day-disabled={disabled}
                    data-spross-date-picker-day-today={today}
                    data-spross-date-picker-day-selected={isSameDay(day.date, selectedDay)}
                    data-spross-date-picker-day-focus={focus}
                    data-spross-date-picker-day-outside={outside}
                    onMouseEnter={(e) => {
                      handleTdHoverEnter(e);
                    }}
                    onMouseLeave={(e) => {
                      handleTdHoverLeave(e);
                    }}
                    onClick={() => {
                      const newDate = day.date;
                      if (isDayDisabled(newDate)) {
                        return;
                      }
                      newDate.setHours(0, 0, 0, 0);
                      if (valueProp === null) {
                        setSelectedDay(newDate);
                        setValue(convertDateToString(newDate));
                      }
                      if (onChange) {
                        onChange(newDate);
                      }
                    }}
                    {...props}
                  >
                    <div>{day.date.getDate()}</div>
                  </td>
                );
              },
            }}
          />
        </div>
      }
    >
      <div data-spross-date-picker-container>
        <input type="text" data-spross-date-picker-input value={value} onChange={handleInputChange} />
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

export default DatePicker;
