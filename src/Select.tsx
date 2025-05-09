import React, { useEffect, useState } from 'react';
import RcSelect from 'rc-select';
import { SprossSelectProps } from './types';

const Select: React.FC<SprossSelectProps> = ({
  options,
  open: openProp,
  onVisibleChange: onVisibleChangeProp,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(openProp);

  useEffect(() => {
    if (openProp !== undefined) {
      setOpen(openProp);
    }
  }, [openProp]);

  return (
    <RcSelect
      prefixCls="spross-select"
      mode="combobox"
      options={options}
      value={value}
      onChange={onChange}
      open={open}
      onDropdownVisibleChange={onVisibleChangeProp}
    />
  );
};

export default Select;
