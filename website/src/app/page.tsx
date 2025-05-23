import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Installation from '../components/Installation/index';
import Footer from '../components/Footer';

const components = [
  {
    name: 'Popover & Tooltip',
    image: (
      <svg width="24" height="24" viewBox="0 0 12 12" fill="none" className="opacity-40">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.64948 1.93313C1.49897 1.94885 1.35304 1.99407 1.22001 2.06621C1.08698 2.13836 0.969476 2.236 0.874197 2.35356C0.778918 2.47113 0.707735 2.60632 0.664716 2.7514C0.621698 2.89649 0.607685 3.04862 0.623479 3.19913L1.22548 8.92813C1.24126 9.07864 1.28655 9.22456 1.35875 9.35757C1.43095 9.49057 1.52864 9.60804 1.64626 9.70328C1.76387 9.79851 1.8991 9.86964 2.04421 9.91259C2.18932 9.95555 2.34148 9.96949 2.49198 9.95363L4.54298 9.73812L6.27498 11.1406C6.39848 11.2406 6.57998 11.2216 6.67998 11.0981L8.08248 9.36613L10.226 9.14113C10.3765 9.12534 10.5224 9.08006 10.6554 9.00786C10.7884 8.93566 10.9059 8.83796 11.0011 8.72035C11.0964 8.60273 11.1675 8.46751 11.2104 8.32239C11.2534 8.17728 11.2673 8.02513 11.2515 7.87463L10.65 2.14563C10.6343 1.99507 10.589 1.84909 10.5168 1.71603C10.4447 1.58297 10.347 1.46544 10.2294 1.37015C10.1117 1.27486 9.97649 1.20369 9.83135 1.16071C9.68621 1.11772 9.53402 1.10376 9.38348 1.11963L1.64948 1.93313Z"
          fill="#6A6F7F"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.73137 4.28474C5.45487 4.31374 5.25487 4.56824 5.28487 4.85274C5.31487 5.13774 5.11487 5.39224 4.83737 5.42124C4.56087 5.45024 4.31237 5.24324 4.28237 4.95824C4.19237 4.10424 4.79237 3.34074 5.62337 3.25324C6.45387 3.16624 7.19987 3.78824 7.28987 4.64224C7.33587 5.07974 7.15737 5.43424 6.99787 5.66774C6.92493 5.77265 6.84544 5.87285 6.75987 5.96774L6.68237 6.05424C6.66128 6.0769 6.64094 6.10024 6.62137 6.12424L6.32337 6.50224C6.28254 6.55482 6.2315 6.59861 6.17333 6.631C6.11516 6.66338 6.05105 6.68368 5.98484 6.69068C5.91863 6.69768 5.85169 6.69125 5.78803 6.67175C5.72437 6.65226 5.66531 6.62011 5.61437 6.57724C5.5098 6.48911 5.44342 6.36391 5.42916 6.2279C5.4149 6.09189 5.45386 5.95564 5.53787 5.84774L5.83587 5.46924C5.87287 5.42224 5.92837 5.36074 5.97287 5.31124L6.01287 5.26624C6.07137 5.20074 6.12537 5.13574 6.17187 5.06824C6.26837 4.92724 6.29537 4.82574 6.28687 4.74774C6.25687 4.46274 6.00887 4.25574 5.73187 4.28474H5.73137Z"
          fill="white"
        />
        <path
          d="M6.08933 8.17563C6.41889 8.14099 6.65797 7.84576 6.62333 7.5162C6.58869 7.18665 6.29346 6.94757 5.9639 6.9822C5.63434 7.01684 5.39527 7.31208 5.4299 7.64163C5.46454 7.97119 5.75978 8.21027 6.08933 8.17563Z"
          fill="white"
        />
      </svg>
    ),
    href: '/poptool',
  },
  {
    name: 'Select',
    image: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-70">
        <g clipPath="url(#doc-select_svg__clip0)">
          <rect x="2" y="2" width="16" height="5" rx="0.5" fill="#DDE3E8" />
          <rect x="2" y="17" width="16" height="5" rx="0.5" fill="#DDE3E8" />
          <rect x="6" y="9" width="16" height="6" rx="0.5" fill="#FBCD2C" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 10.793c0-.891 1.077-1.337 1.707-.707l8.707 8.707c.63.63.184 1.707-.707 1.707H18.25a2 2 0 00-1.49.667l-2.514 2.809c-.612.684-1.745.25-1.745-.667V10.793zM16.684 19H21l-7-7v10l2.684-3z"
            fill="#fff"
          />
          <path d="M14 22V12l7 7h-4.316L14 22z" fill="#324350" />
        </g>
        <defs>
          <clipPath id="doc-select_svg__clip0">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
    href: '/select',
  },
  {
    name: 'DatePicker',
    image: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g clipPath="url(#doc-datepicker_svg__clip0)">
          <rect x="1" y="4" width="22" height="16" rx="3" fill="#DDE3E8"></rect>
          <path
            d="M6.5 11H9v2.5H6.5V11zm6 4.5h-7V10h7v5.5zm0-8H12v-1h-1v1H7v-1H6v1h-.5a1 1 0 00-1 1v7c0 .55.45 1 1 1h7c.55 0 1-.45 1-1v-7c0-.55-.45-1-1-1z"
            fill="#4CC3FA"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 12.793c0-.891 1.077-1.337 1.707-.707l8.707 8.707c.63.63.184 1.707-.707 1.707H19.25a2 2 0 00-1.49.666l-2.514 2.81c-.612.684-1.745.25-1.745-.667V12.793zM17.684 21H22l-7-7v10l2.684-3z"
            fill="#fff"
          />
          <path d="M15 24V14l7 7h-4.316L15 24z" fill="#324350" />
        </g>
        <defs>
          <clipPath id="doc-datepicker_svg__clip0">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
    href: '/date-picker',
  },
  {
    name: 'DateRangePicker',
    image: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g clipPath="url(#doc-datepicker_svg__clip0)">
          <rect x="1" y="4" width="22" height="16" rx="3" fill="#DDE3E8"></rect>
          <path
            d="M6.5 11H9v2.5H6.5V11zm6 4.5h-7V10h7v5.5zm0-8H12v-1h-1v1H7v-1H6v1h-.5a1 1 0 00-1 1v7c0 .55.45 1 1 1h7c.55 0 1-.45 1-1v-7c0-.55-.45-1-1-1z"
            fill="#4CC3FA"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 12.793c0-.891 1.077-1.337 1.707-.707l8.707 8.707c.63.63.184 1.707-.707 1.707H19.25a2 2 0 00-1.49.666l-2.514 2.81c-.612.684-1.745.25-1.745-.667V12.793zM17.684 21H22l-7-7v10l2.684-3z"
            fill="#fff"
          />
          <path d="M15 24V14l7 7h-4.316L15 24z" fill="#324350" />
        </g>
        <defs>
          <clipPath id="doc-datepicker_svg__clip0">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
    href: '/date-range-picker',
  },
  {
    name: 'Message',
    image: (
      <svg width="24" height="24" viewBox="0 0 12 12" fill="none" className="opacity-70">
        <path
          d="M7.91925 9.38532C7.95784 9.75278 7.84887 10.1205 7.61633 10.4076C7.50118 10.5498 7.35917 10.6679 7.19838 10.7552C7.0376 10.8425 6.86119 10.8972 6.67925 10.9163C6.4973 10.9354 6.31337 10.9185 6.13797 10.8665C5.96256 10.8146 5.7991 10.7285 5.65694 10.6134C5.36982 10.3809 5.18684 10.0438 5.14825 9.67632C5.10966 9.30886 5.21862 8.94112 5.45117 8.65401C5.68371 8.36689 6.02079 8.18391 6.38825 8.14532C6.75571 8.10673 7.12344 8.21569 7.41056 8.44824C7.69768 8.68078 7.88066 9.01786 7.91925 9.38532Z"
          fill="#324350"
        />
        <path
          d="M5.58014 0.481764C5.08314 0.534264 4.61214 0.834764 4.66414 1.33226L4.70014 1.67476C3.44814 2.14126 2.86864 3.38326 3.01514 4.77326L3.17164 6.26526C3.31114 7.59026 2.59614 8.15476 1.98914 8.93526C1.69914 9.30876 1.99914 9.90776 2.46914 9.85826L10.5736 9.00676C11.0436 8.95676 11.2121 8.30876 10.8506 8.00426C10.0946 7.36676 9.27814 6.96326 9.13864 5.63826L8.98214 4.14626C8.83564 2.75626 8.01114 1.66176 6.68914 1.46626L6.65314 1.12326C6.60114 0.625264 6.07814 0.429764 5.58014 0.481764Z"
          fill="#FBCD2C"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.21107 2.45466C9.05257 2.18866 8.79007 1.96266 8.27257 1.69866C8.15441 1.63832 8.06507 1.53352 8.02419 1.40731C7.9833 1.28109 7.99423 1.14381 8.05457 1.02566C8.11491 0.907503 8.21971 0.818157 8.34592 0.777274C8.47213 0.736391 8.60941 0.74732 8.72757 0.807657C9.32007 1.11016 9.77307 1.44416 10.0701 1.94266C10.3616 2.43116 10.4641 3.01466 10.4996 3.72866C10.5028 3.79428 10.493 3.8599 10.4709 3.92177C10.4488 3.98363 10.4147 4.04053 10.3705 4.08921C10.2814 4.18753 10.1569 4.24641 10.0243 4.25291C9.89178 4.2594 9.76208 4.21298 9.66377 4.12386C9.56545 4.03473 9.50657 3.9102 9.50007 3.77766C9.46707 3.11266 9.37507 2.72916 9.21057 2.45466H9.21107ZM1.67757 6.33966C1.74807 6.00266 1.73057 5.64216 1.60757 5.11366C1.58153 4.98608 1.60628 4.85338 1.67656 4.74377C1.74685 4.63416 1.85712 4.55629 1.98392 4.52672C2.11073 4.49715 2.24407 4.51822 2.35558 4.58543C2.4671 4.65265 2.548 4.76072 2.58107 4.88666C2.72257 5.49266 2.76807 6.01216 2.65607 6.54516C2.54557 7.07116 2.29107 7.56316 1.91757 8.12966C1.88142 8.18448 1.83483 8.23165 1.78045 8.26848C1.72608 8.3053 1.66498 8.33105 1.60065 8.34425C1.53633 8.35746 1.47003 8.35787 1.40554 8.34546C1.34106 8.33305 1.27965 8.30805 1.22482 8.27191C1.16999 8.23576 1.12282 8.18917 1.086 8.13479C1.04918 8.08042 1.02343 8.01932 1.01022 7.95499C0.997011 7.89066 0.996602 7.82437 1.00902 7.75988C1.02143 7.69539 1.04642 7.63398 1.08257 7.57916C1.43007 7.05166 1.60507 6.68466 1.67757 6.33966Z"
          fill="#DDE3E8"
        />
      </svg>
    ),
    href: '/message',
  },
  {
    name: 'Dialog',
    image: (
      <svg width="24" height="24" viewBox="0 0 12 12" fill="none">
        <path
          d="M9.5 1H2.5C1.67157 1 1 1.67157 1 2.5V9.5C1 10.3284 1.67157 11 2.5 11H9.5C10.3284 11 11 10.3284 11 9.5V2.5C11 1.67157 10.3284 1 9.5 1Z"
          fill="#AAB2BF"
        />
        <path
          d="M9.5 3H2.5C2.22386 3 2 3.22386 2 3.5V8.5C2 8.77614 2.22386 9 2.5 9H9.5C9.77614 9 10 8.77614 10 8.5V3.5C10 3.22386 9.77614 3 9.5 3Z"
          fill="white"
        />
        <path
          d="M5 6.5H3.5C3.22386 6.5 3 6.72386 3 7V7.5C3 7.77614 3.22386 8 3.5 8H5C5.27614 8 5.5 7.77614 5.5 7.5V7C5.5 6.72386 5.27614 6.5 5 6.5Z"
          fill="#AAB2BF"
        />
        <path
          d="M8.5 6.5H7C6.72386 6.5 6.5 6.72386 6.5 7V7.5C6.5 7.77614 6.72386 8 7 8H8.5C8.77614 8 9 7.77614 9 7.5V7C9 6.72386 8.77614 6.5 8.5 6.5Z"
          fill="#4CC3FA"
        />
      </svg>
    ),
    href: '/dialog',
  },
  {
    name: 'Drawer',
    image: (
      <svg width="24" height="24" viewBox="0 0 12 12" fill="none">
        <path
          d="M1 2.5C1 2.10218 1.15804 1.72064 1.43934 1.43934C1.72064 1.15804 2.10218 1 2.5 1H7V11H2.5C2.10218 11 1.72064 10.842 1.43934 10.5607C1.15804 10.2794 1 9.89782 1 9.5V2.5Z"
          fill="#DDE3E8"
        />
        <path
          d="M7 1H9.5C9.89782 1 10.2794 1.15804 10.5607 1.43934C10.842 1.72064 11 2.10218 11 2.5V9.5C11 9.89782 10.842 10.2794 10.5607 10.5607C10.2794 10.842 9.89782 11 9.5 11H7V1Z"
          fill="#4CC3FA"
        />
        <path
          d="M6.5 5C6.5 4.72386 6.27614 4.5 6 4.5C5.72386 4.5 5.5 4.72386 5.5 5V7C5.5 7.27614 5.72386 7.5 6 7.5C6.27614 7.5 6.5 7.27614 6.5 7V5Z"
          fill="#AAB2BF"
        />
      </svg>
    ),
    href: '/drawer',
  },
];

export default function Home() {
  return (
    <div className="relative h-screen overflow-auto scrollbar-custom bg-white">
      <Header />
      <div className="wrapper">
        <div className="container content">
          <div>
            <div>
              <h2 className="font-semibold">Spross - Interface overlays that 'sprout' from elements</h2>
              <p>
                A design system concept (from German 'spross' meaning 'sprout') describing lightweight,
                contextually-triggered components that grow dynamically from other elements.
              </p>
              <p>This family includes:</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {components.map((component) => (
                <Link
                  key={component.name}
                  href={component.href}
                  className="group relative rounded-md px-2 py-8 scrollbar-custom cursor-pointer bg-neutral-50 border border-solid border-neutral-100 hover:bg-neutral-100 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-all duration-300">
                    <div className="grayscale">{component.image}</div>
                    <div className="text-sm font-medium">{component.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Installation />
          {/* <Basics />
          <hr className="border-t border-dashed border-neutral-300" />
          <Overflow />
          <hr className="border-t border-dashed border-neutral-300" />
          <Flip />
          <hr className="border-t border-dashed border-neutral-300" />
          <Height />
          <hr className="border-t border-dashed border-neutral-300" />
          <Controlled />
          <hr className="border-t border-dashed border-neutral-300" />
          <API /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
