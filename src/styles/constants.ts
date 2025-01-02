export const STYLES = {
  components: {
    nav: {
      item: 'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
      active: 'bg-[--primary-light] text-[--primary] font-medium',
      inactive: 'text-[--foreground] hover:bg-[--gray-100]',
    },
    button: {
      // Base styles
      base: 'inline-flex items-center justify-center rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
      
      // Size variants
      sizes: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
      },
      
      // Style variants
      variants: {
        primary: 'bg-[--primary] text-white hover:bg-[--primary-hover] focus:ring-[--primary]',
        default: 'bg-white border border-[--border] text-[--foreground] hover:border-[--primary] hover:text-[--primary] focus:ring-[--primary]',
        danger: 'bg-[--danger] text-white hover:bg-[--danger-hover] focus:ring-[--danger]',
        ghost: 'text-[--foreground] hover:bg-[--gray-100] focus:ring-[--primary]',
      },
      
      // State modifiers
      states: {
        disabled: 'opacity-50 cursor-not-allowed',
        loading: 'cursor-wait',
      }
    },

    form: {
      group: 'space-y-2',
      label: 'block text-sm font-medium text-[--foreground]',
      input: `
        w-full rounded-lg border border-[--border] px-3 py-2 text-sm
        transition-colors duration-200
        placeholder:text-[--gray-400]
        hover:border-[--primary]
        focus:border-[--primary] focus:outline-none focus:ring-2 focus:ring-[--primary-light]
        disabled:bg-[--gray-50] disabled:text-[--gray-500] disabled:cursor-not-allowed
      `,
      select: `w-full rounded-lg border border-[--border] px-3 py-2 text-sm
        transition-colors duration-200
        hover:border-[--primary]
        focus:border-[--primary] focus:outline-none focus:ring-2 focus:ring-[--primary-light]
      `,
      error: 'text-[--danger] text-sm mt-1',
    },

    table: {
      wrapper: 'overflow-x-auto',
      table: 'min-w-full divide-y divide-[--border]',
      th: 'px-4 py-3 text-left text-sm font-medium text-[--foreground-secondary] bg-[--gray-50]',
      td: 'px-4 py-3 text-sm text-[--foreground] border-b border-[--border]',
      tr: 'hover:bg-[--gray-50]',
    },

    badge: {
      base: 'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
      variants: {
        success: 'bg-[--success-light] text-[--success]',
        warning: 'bg-[--warning-light] text-[--warning]',
        danger: 'bg-[--danger-light] text-[--danger]',
        default: 'bg-[--gray-100] text-[--gray-500]',
      }
    },

    page: {
      title: 'text-2xl font-bold',
      section: 'bg-white rounded-lg border border-[--border] shadow-sm',
      sectionHeader: 'p-5 border-b border-[--border]',
      sectionTitle: 'text-lg font-medium',
      sectionBody: 'p-5',
    },
  }
} as const