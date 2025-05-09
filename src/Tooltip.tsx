import React from 'react';
import PopBase from './PopBase';
import { SprossPopoverProps } from './types';

const Tooltip = (props: SprossPopoverProps) => <PopBase type="tooltip" {...props} />;

export default Tooltip;
