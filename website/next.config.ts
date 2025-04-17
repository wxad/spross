import type { NextConfig } from "next";
import nextra from 'nextra';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/spross',
};

const withNextra = nextra({
  // title: 'Spross',
  // theme: 'nextra-theme-docs',
  // themeConfig: './theme.config.jsx',
  // defaultShowCopyCode: true,
});

export default withNextra(nextConfig);
