'use client';

import { NextraTheme } from './_components/nextra-theme';
import type { PageMapItem } from 'nextra';
import { usePathname } from 'next/navigation';

const PageWrapper = (props: { pageMap: PageMapItem[]; children: React.ReactNode }) => {
  const { pageMap, children } = props;

  // 获取当前路径
  const pathname = usePathname();

  if (pathname === '/') {
    return children;
  }

  return <NextraTheme pageMap={pageMap}>{children}</NextraTheme>;
};

export default PageWrapper;
