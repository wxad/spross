'use client';

import React from 'react';
import { cn } from '../lib/utils';

const CodeBox: React.FC<React.HTMLProps<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div
      className={cn('relative flex items-center justify-center rounded-md px-5 py-10 scrollbar-custom', className)}
      style={{
        background: 'linear-gradient(to top, var(--gray2), var(--gray1) 8px)',
        border: '1px solid var(--gray3)',
      }}
      {...props}
    ></div>
  );
};

export default CodeBox;
