import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard Variable', 'system-ui', 'sans-serif'],
        'noto-sans': ['Noto Sans KR', 'system-ui', 'sans-serif'],
        spoqa: ['Spoqa Han Sans Neo', 'system-ui', 'sans-serif'],
        suit: ['SUIT Variable', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
