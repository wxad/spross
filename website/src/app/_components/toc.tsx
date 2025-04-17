import type { Heading } from 'nextra';
import React from 'react';

const TOC: React.FC<{ toc: Heading[] }> = ({ toc }) => {
  return (
    <div className="absolute left-[calc(100%+64px)] top-0 h-full">
      <aside className="w-[240px] hidden xl:block sticky top-16 h-[calc(100vh-8rem)]">
        <span className="text-[13px] text-neutral-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M2.75 12H21.25M2.75 5.75H21.25M2.75 18.25H11.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          On this page
        </span>
        <div className="relative">
          <ul className="mt-4 dotted-left dotted space-y-2">
            {toc.map((heading) => (
              <li key={heading.id} className="h-fit flex">
                <a
                  className="text-[13px] hover:text-neutral-900 transition-colors ml-5 h-5 inline-block truncate text-neutral-600"
                  href={`#${heading.id}`}
                >
                  {/* @ts-ignore */}
                  {heading.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default TOC;
