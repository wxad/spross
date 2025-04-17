// @ts-nocheck

import { PageMapItem } from 'nextra';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = (props: { pageMap: PageMapItem[] }) => {
  const { pageMap } = props;
  const pathname = usePathname();

  const navs = pageMap.filter((item) => !!item.items);

  return (
    <nav className="pt-5 pb-4 dotted dotted-right bg-neutral-50 fixed top-0 h-screen hidden w-[240px] lg:flex flex-col">
      <div className="flex flex-col px-4">
        <div className="flex justify-between items-center pb-3.5 dotted-bottom">
          <Link className="flex items-center gap-2" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M7 20h10m-7 0c5.5-2.5.8-6.4 3-10" />
                <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3c-1.2-.6-2.3-1.9-3-4.2c2.8-.5 4.4 0 5.5.8M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4c1-1 1.6-2.3 1.7-4.6c-2.7.1-4 1-4.9 2" />
              </g>
            </svg>
            <span className="font-medium inline-block text-primary">Spross</span>
          </Link>
          <span className="inline-block text-xs text-neutral-600 relative top-[1.5px]">
            <a href="https://wxad.design" target="_blank">
              wxad.design
            </a>
          </span>
        </div>
      </div>
      <div className="grow overflow-y-auto pt-5 px-5">
        {navs.map((item, i) => {
          return (
            <div key={item.name}>
              <div className="text-xs text-neutral-400 font-medium inline-block mb-2 not-first:mt-4">{item.title}</div>
              <ul className="space-y-1">
                {Object.entries(item.items).map(([key, value]) => {
                  return (
                    <li key={key}>
                      <Link
                        href={value.href}
                        className="h-7 flex items-center font-medium text-[13px] text-neutral-600 px-2 -ml-2 hover:bg-el-hover-bg rounded-md data-[active=true]:bg-neutral-200 data-[active=true]:text-neutral-900 w-[calc(100%+15px)]"
                        data-active={value.href === pathname}
                      >
                        {value.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {i !== navs.length - 1 && (
                <div aria-hidden="true" className="h-px w-[90%] mx-auto dotted-bottom pb-5 mb-5" />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
