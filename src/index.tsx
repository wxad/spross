'use client';

import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import { SprossPopoverProps } from './types';
import PopBase from './PopBase';
import Message from './Message';
import Drawer from './Drawer';

const Popover = (props: SprossPopoverProps) => <PopBase type="popover" {...props} />;
const Tooltip = (props: SprossPopoverProps) => <PopBase type="tooltip" {...props} />;

const Spross = () => <></>;

Spross.Popover = Popover;
Spross.Tooltip = Tooltip;
Spross.Message = Message;
Spross.Drawer = Drawer;

export * from './types';

export default Spross;
