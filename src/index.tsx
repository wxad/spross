'use client';

import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import { SprossPopoverProps } from './types';
import PopBase from './PopBase';

const Popover = (props: SprossPopoverProps) => <PopBase type="popover" {...props} />;
const Tooltip = (props: SprossPopoverProps) => <PopBase type="tooltip" {...props} />;

const Spross = () => <></>

Spross.Popover = Popover;
Spross.Tooltip = Tooltip;

export * from './types';

export default Spross;
