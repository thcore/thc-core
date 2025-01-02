import { ButtonStyles, InputStyles, CardStyles } from './types'

// Button Styles
export const buttonStyles: ButtonStyles = {
  base: `
    inline-flex items-center justify-center
    rounded-[var(--radii-base)]
    font-[var(--typography-weights-medium)]
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--colors-background-primary)]
    disabled:opacity-50 disabled:cursor-not-allowed
    select-none
  `,
  variants: {
    primary: `
      bg-[var(--colors-action-primary)]
      text-white
      border-0
      shadow-[0_1px_2px_rgba(0,0,0,0.05)]
      hover:bg-[var(--colors-action-primaryHover)]
      active:bg-[var(--colors-action-primaryActive)]
      active:translate-y-[0.5px]
      focus:ring-[var(--colors-action-primary)]
      disabled:bg-[var(--colors-action-primary)]
    `,
    secondary: `
      bg-white
      text-[var(--colors-text-primary)]
      border border-[var(--colors-border-default)]
      shadow-[0_1px_2px_rgba(0,0,0,0.05)]
      hover:bg-[var(--colors-action-secondaryHover)]
      hover:border-[var(--colors-border-hover)]
      active:bg-[var(--colors-action-secondaryActive)]
      active:translate-y-[0.5px]
      focus:ring-[var(--colors-action-secondary)]
      disabled:bg-[var(--colors-action-secondary)]
      disabled:text-[var(--colors-text-disabled)]
    `,
    outline: `
      bg-transparent
      text-[var(--colors-text-primary)]
      border border-[var(--colors-border-default)]
      hover:bg-[var(--colors-action-secondary)]
      hover:border-[var(--colors-border-hover)]
      active:bg-[var(--colors-action-secondaryActive)]
      active:translate-y-[0.5px]
      focus:ring-[var(--colors-border-focus)]
      disabled:border-[var(--colors-border-default)]
      disabled:text-[var(--colors-text-disabled)]
    `,
  },
  sizes: {
    sm: 'text-[var(--typography-sizes-sm)] px-[var(--element-spacing-lg)] py-[var(--element-spacing-sm)] gap-[var(--element-spacing-sm)]',
    md: 'text-[var(--typography-sizes-base)] px-[var(--element-spacing-xl)] py-[var(--element-spacing-md)] gap-[var(--element-spacing-md)]',
    lg: 'text-[var(--typography-sizes-lg)] px-[var(--element-spacing-2xl)] py-[var(--element-spacing-lg)] gap-[var(--element-spacing-lg)]',
  },
  loading: 'relative text-transparent transition-none hover:text-transparent',
  spinner: `
    absolute inset-0 m-auto
    h-5 w-5
    animate-spin rounded-full
    border-2 border-current
    border-t-transparent
    text-[var(--colors-neutral-50)]
  `,
}

// Input Styles
export const inputStyles: InputStyles = {
  container: 'space-y-2',
  base: `
    w-full
    rounded-[var(--radii-base)]
    border border-[var(--colors-border-default)]
    bg-[var(--colors-background-primary)]
    text-[var(--colors-text-primary)]
    transition-[var(--transitions-default)]
    placeholder:text-[var(--colors-text-tertiary)]
    hover:border-[var(--colors-border-hover)]
    focus:outline-none focus:ring-2 focus:border-[var(--colors-border-focus)] focus:ring-[var(--colors-border-focus)]
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:bg-[var(--colors-background-secondary)]
  `,
  sizes: {
    sm: 'text-[var(--typography-sizes-sm)] px-3 py-1.5',
    md: 'text-[var(--typography-sizes-base)] px-4 py-2',
    lg: 'text-[var(--typography-sizes-lg)] px-6 py-3',
  },
  label: 'block text-[var(--typography-sizes-sm)] font-[var(--typography-weights-medium)] text-[var(--colors-text-secondary)]',
  error: 'text-[var(--typography-sizes-sm)] text-[var(--colors-danger-500)]',
  helper: 'text-[var(--typography-sizes-sm)] text-[var(--colors-text-tertiary)]',
}

// Card Styles
export const cardStyles: CardStyles = {
  base: `
    bg-[var(--colors-background-secondary)]
    border border-[var(--colors-border-default)]
    rounded-[var(--radii-lg)]
    transition-[var(--transitions-default)]
  `,
  variants: {
    elevated: 'shadow-[var(--shadows-md)]',
    outlined: 'shadow-none',
  },
  padding: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
} 