export const tokens = {
  colors: {
    // Brand Colors
    primary: {
      50: '#e6f7ff',
      100: '#bae7ff',
      200: '#91d5ff',
      300: '#69c0ff',
      400: '#40a9ff',
      500: '#1890ff', // Default
      600: '#096dd9',
      700: '#0050b3',
      800: '#003a8c',
      900: '#002766',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e8e8e8',
      300: '#d9d9d9',
      400: '#bfbfbf',
      500: '#8c8c8c',
      600: '#595959',
      700: '#434343',
      800: '#262626',
      900: '#1f1f1f',
    },
    success: {
      50: '#f6ffed',
      100: '#d9f7be',
      500: '#52c41a',
      600: '#389e0d',
      700: '#237804',
    },
    warning: {
      50: '#fffbe6',
      100: '#fff1b8',
      500: '#faad14',
      600: '#d48806',
      700: '#ad6800',
    },
    danger: {
      50: '#fff1f0',
      100: '#ffccc7',
      500: '#ff4d4f',
      600: '#f5222d',
      700: '#cf1322',
    },
  },
  
  typography: {
    fonts: {
      base: '"Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    },
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },

  spacing: {
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
  },

  radii: {
    none: '0',
    sm: '0.125rem',  // 2px
    base: '0.25rem', // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  transitions: {
    default: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  zIndices: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  }
} as const

// Semantic tokens
export const semanticTokens = {
  colors: {
    // Background colors
    background: {
      primary: tokens.colors.neutral[50],
      secondary: tokens.colors.neutral[100],
      tertiary: tokens.colors.neutral[200],
    },
    // Text colors
    text: {
      primary: tokens.colors.neutral[900],
      secondary: tokens.colors.neutral[600],
      tertiary: tokens.colors.neutral[500],
      disabled: tokens.colors.neutral[400],
    },
    // Border colors
    border: {
      default: tokens.colors.neutral[200],
      hover: tokens.colors.neutral[300],
      focus: tokens.colors.primary[500],
    },
    // Action colors
    action: {
      primary: tokens.colors.primary[500],
      primaryHover: tokens.colors.primary[600],
      primaryActive: tokens.colors.primary[700],
      secondary: tokens.colors.neutral[200],
      secondaryHover: tokens.colors.neutral[300],
      secondaryActive: tokens.colors.neutral[400],
    },
  },
} as const 