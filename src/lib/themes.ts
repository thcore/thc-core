// 1) 색상 팔레트 정의
const colors = {
  /* 기존 팔레트 (참고용)
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  sage: {
    50: '#f8faf8',
    100: '#f1f4f1',
    200: '#e4e9e4',
    700: '#3d4a3d',
    800: '#2c372c',
    900: '#1c241c',
  },
  ocean: {
    50: '#f8fafb',
    100: '#f1f4f6',
    200: '#e4e9ed',
    700: '#3d4a54',
    800: '#2c373f',
    900: '#1c242a',
  },
  rose: {
    50: '#fbfaf9',
    100: '#f6f4f3',
    200: '#ede9e8',
    700: '#544a47',
    800: '#3f3734',
    900: '#2a2422',
  },
  lavender: {
    50: '#faf9fb',
    100: '#f4f3f6',
    200: '#e9e8ed',
    700: '#4a4754',
    800: '#37343f',
    900: '#24222a',
  },
  */

  // 현재 사용 중인 팔레트
  ebony: {
    50:  '#f9f9f9',
    100: '#f2f2f2',
    200: '#e5e5e5',
    700: '#404040',
    800: '#2c2c2c',
    900: '#1a1a1a',
  },
  redwood: {
    50:  '#fdf9f7',
    100: '#fbf3ee',
    200: '#f5e7dd',
    700: '#5e3a2d',
    800: '#42281f',
    900: '#2b1a14',
  },
  twilight: {
    50:  '#fafafa',
    100: '#f5f5f7',
    200: '#ebeaf0',
    700: '#4c495b',
    800: '#383544',
    900: '#25212e',
  },
  storm: {
    50:  '#f9fafa',
    100: '#f2f4f5',
    200: '#e4e8ea',
    700: '#41464d',
    800: '#2c3136',
    900: '#1b1f23',
  },
  coffee: {
    50:  '#faf8f7',
    100: '#f3efed',
    200: '#e7dfdc',
    700: '#53433f',
    800: '#3d2f2c',
    900: '#281e1b',
  },
} as const;

// 2) 다크 테마 생성 헬퍼 함수
function createDarkTheme(name: string, palette: (typeof colors)[keyof typeof colors]) {
  return {
    name,
    colors: {
      background: palette[900],
      foreground: palette[50],
      cardBackground: palette[800],
      borderColor: palette[700],
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

// 4) 테마 이름 타입
export type ThemeType = keyof typeof themes;