// Base Types
export type ComponentSize = 'sm' | 'md' | 'lg'

// Button Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline'
export interface ButtonStyles {
  base: string
  variants: Record<ButtonVariant, string>
  sizes: Record<ComponentSize, string>
  loading: string
  spinner: string
}

// Input Types
export interface InputStyles {
  container: string
  base: string
  sizes: Record<ComponentSize, string>
  label: string
  error: string
  helper: string
}

// Card Types
export type CardVariant = 'elevated' | 'outlined'
export type CardPadding = ComponentSize
export interface CardStyles {
  base: string
  variants: Record<CardVariant, string>
  padding: Record<CardPadding, string>
} 