import React from 'react';
import PopBase from './PopBase';
import { SprossPopoverProps } from './types';

const Popover = (props: SprossPopoverProps) => <PopBase type="popover" {...props} />;

export default Popover;
