import React from 'react';
import Header from '../components/Header';
import Installation from '../components/Installation';
import Basics from '../components/Basics';
import dynamic from 'next/dynamic';
import Footer from '../components/Footer';
import Controlled from '../components/controlled';
import Overflow from '../components/Overflow';
import Flip from '../components/Flip';
import Height from '../components/Height';
import API from '../components/API';
const ArtDots = dynamic(() => import('../components/ArtDots'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <ArtDots />
      <Header />
      <div className="wrapper">
        <div className="container content">
          <div>
            <h2 className="font-semibold">Spross (德: 发芽)</h2>
            <p>
              一个 React 浮层组件，适用于 Popover, Tooltip, Dropdown, Menu 等形式，并可扩展为 Dialog, Drawer 等更多。
            </p>
          </div>
          <Installation />
          <Basics />
          <hr className="border-t border-dashed border-neutral-300" />
          <Overflow />
          <hr className="border-t border-dashed border-neutral-300" />
          <Flip />
          <hr className="border-t border-dashed border-neutral-300" />
          <Height />
          <hr className="border-t border-dashed border-neutral-300" />
          <Controlled />
          <hr className="border-t border-dashed border-neutral-300" />
          <API />
        </div>
      </div>
      <Footer />
    </>
  );
}
