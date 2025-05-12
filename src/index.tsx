'use client';

import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import Message from './Message';
import Drawer from './Drawer';
import Dialog from './Dialog';
import Select from './Select';
import Popover from './Popover';
import Tooltip from './Tooltip';
import DatePicker from './DatePicker';
import DateRangePicker from './DateRangePicker';

const Spross = () => <></>;

Spross.Popover = Popover;
Spross.Tooltip = Tooltip;
Spross.Message = Message;
Spross.Drawer = Drawer;
Spross.Dialog = Dialog;
Spross.Select = Select;
Spross.DatePicker = DatePicker;
Spross.DateRangePicker = DateRangePicker;

export * from './types';

export default Spross;
