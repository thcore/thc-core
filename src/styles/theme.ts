import { tokens, semanticTokens } from './tokens'

// CSS 변수 생성 함수
function createVar(name: string, value: string | number) {
  return { [`--${name}`]: value }
}

interface ThemeObject {
  [key: string]: string | number | ThemeObject
}

// 객체를 CSS 변수로 변환하는 함수
function createVars(obj: ThemeObject, prefix = ''): Record<string, string | number> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const varName = prefix ? `${prefix}-${key}` : key
    
    if (typeof value === 'object' && value !== null) {
      return { ...acc, ...createVars(value, varName) }
    }
    
    return { ...acc, ...createVar(varName, value) }
  }, {})
}

// 기본 테마 생성
export const lightTheme = {
  ...createVars(tokens),
  ...createVars(semanticTokens),
}

// 다크 테마 생성
export const darkTheme = {
  ...createVars(tokens),
  ...createVars({
    colors: {
      background: {
        primary: tokens.colors.neutral[900],
        secondary: tokens.colors.neutral[800],
        tertiary: tokens.colors.neutral[700],
      },
      text: {
        primary: tokens.colors.neutral[50],
        secondary: tokens.colors.neutral[300],
        tertiary: tokens.colors.neutral[400],
        disabled: tokens.colors.neutral[600],
      },
      border: {
        default: tokens.colors.neutral[700],
        hover: tokens.colors.neutral[600],
        focus: tokens.colors.primary[500],
      },
      action: {
        secondary: tokens.colors.neutral[700],
        secondaryHover: tokens.colors.neutral[600],
        secondaryActive: tokens.colors.neutral[500],
      },
    },
  }),
} 