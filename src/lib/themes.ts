// 1) 색상 팔레트 정의
const colors = {
  ebony: {
    50:  '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  redwood: {
    50:  '#fdf8f6',
    100: '#f2e8e5',
    200: '#eaddd7',
    300: '#e0cec7',
    400: '#d2bab0',
    500: '#bfa094',
    600: '#a18072',
    700: '#977669',
    800: '#846358',
    900: '#43302b',
  },
  twilight: {
    50:  '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  storm: {
    50:  '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  coffee: {
    50:  '#fdf8f6',
    100: '#e8d6d0',
    200: '#d3b8ae',
    300: '#be9b8e',
    400: '#a97e6e',
    500: '#936251',
    600: '#7d4735',
    700: '#672d1e',
    800: '#50160c',
    900: '#3a0400',
  },
} as const;

// 2) 다크 테마 생성 함수
function createDarkTheme(name: string, palette: (typeof colors)[keyof typeof colors]) {
  return {
    name,
    colors: {
      '--background': palette[900],
      '--foreground': palette[50],
      '--cardBackground': palette[800],
      '--borderColor': palette[700],
    },
  } as const;
}

// 3) 테마 정의
export const themes = {
  ebony: createDarkTheme('에보니', colors.ebony),
  redwood: createDarkTheme('레드우드', colors.redwood),
  twilight: createDarkTheme('트와일라이트', colors.twilight),
  storm: createDarkTheme('스톰', colors.storm),
  coffee: createDarkTheme('커피', colors.coffee),
} as const;

export type ThemeType = keyof typeof themes;