'use client';

import NextraTheme from './_components/NextraTheme';
import type { PageMapItem } from 'nextra';
import { usePathname } from 'next/navigation';

const PageWrapper: React.FC<{
  pageMap: PageMapItem[];
  children: React.ReactNode;
}> = (props) => {
  const { pageMap, children } = props;

  // 获取当前路径
  const pathname = usePathname();

  if (pathname === '/') {
    return <>{children}</>;
  }

  return <NextraTheme pageMap={pageMap}>{children}</NextraTheme>;
};

export default PageWrapper;
