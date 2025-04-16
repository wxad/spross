import type { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import '../style.css';

export default function Nextra({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <Head>
        <title>Spross - A floating layer component for React</title>
        <link
          rel="icon"
          href="https://wxa.wxs.qq.com/mpweb/delivery/legacy/wxadtouch/upload/t1/rytl8d2o_8f354f8f.png"
          type="image/x-icon"
        />
        <meta
          name="description"
          content="Spross(德：发芽): A floating layer component for React, suitable for Popover, Tooltip, Dropdown, Menu, Dialog, Drawer, etc."
        />
      </Head>
      {/* @ts-ignore */}
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
