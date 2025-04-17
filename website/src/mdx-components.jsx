import { useMDXComponents as getNextraComponents } from 'nextra/mdx-components';
import TOC from './app/_components/toc';

const a = ({ children, href }) => (
  <a
    href={href}
    className="text-blue-500 hover:underline decoration-dotted decoration-current underline-offset-2"
    target="_blank"
  >
    {children}
  </a>
);

const h1 = ({ children }) => <h1 className="text-[32px] font-semibold mb-3 lg:mb-4">{children}</h1>;

const h2 = ({ id, children }) => (
  <h2 id={id} className="scroll-mt-4">
    <a href={`#${id}`} className="text-[20px] mt-12 font-semibold mb-4 inline-block group relative w-fit">
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="absolute right-[-24px] top-[6px] opacity-0 shadow-none outline-none group-hover:opacity-100 group-focus:opacity-100"
      >
        <path
          d="M10 19.0004L9.82843 19.1719C8.26634 20.734 5.73368 20.734 4.17158 19.1719L3.82843 18.8288C2.26634 17.2667 2.26633 14.734 3.82843 13.1719L7.17158 9.8288C8.73368 8.2667 11.2663 8.2667 12.8284 9.8288L13.1716 10.1719C13.8252 10.8256 14.2053 11.6491 14.312 12.5004"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M9.68799 12.5004C9.79463 13.3516 10.1748 14.1752 10.8284 14.8288L11.1715 15.1719C12.7336 16.734 15.2663 16.734 16.8284 15.1719L20.1715 11.8288C21.7336 10.2667 21.7336 7.73404 20.1715 6.17194L19.8284 5.8288C18.2663 4.2667 15.7336 4.2667 14.1715 5.8288L14 6.00037"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </a>
  </h2>
);

const p = ({ children }) => <p className="text-[16px] mb-4 text-neutral-700">{children}</p>;

const code = ({ children }) => (
  <code className="p-1 bg-neutral-100 rounded-md font-mono text-[13.5px]">{children}</code>
);

const defaultComponents = getNextraComponents({
  wrapper(props) {
    const { children, toc } = props;
    return (
      <>
        {children}
        <TOC toc={toc} />
      </>
    );
  },
});

export const useMDXComponents = (components) => ({
  ...defaultComponents,
  ...components,
  h1,
  h2,
  p,
  code,
  a,
});
