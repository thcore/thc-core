'use client'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { FirebaseError } from 'firebase/app'
import { getFirebaseErrorMessage } from '@/utils/firebase-errors'
import Button from '@/components/common/Button'

interface FormData {
  email: string
  password: string
}

interface ValidationErrors {
  email?: string
  password?: string
  submit?: string
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const { login } = useAuth()
  const submitErrorRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (errors.submit) {
      submitErrorRef.current?.focus()
    }
  }, [errors.submit])

  const validateEmail = (email: string): string | undefined => {
    if (!email) return undefined
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return '유효한 이메일 주소를 입력해주세요'
    }
    return undefined
  }

  const validatePassword = (password: string): string | undefined => {
    if (!password) return undefined
    if (password.length < 6) {
      return '비밀번호는 최소 6자 이상이어야 합니다'
    }
    return undefined
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    }
    setErrors(prev => ({ ...prev, ...newErrors }))
    return !Object.values(newErrors).some(Boolean)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({
      ...prev,
      submit: undefined,
      [name]: name === 'email' ? validateEmail(value) : validatePassword(value)
    }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setErrors(prev => ({
      ...prev,
      [name]: name === 'email' 
        ? validateEmail(formData.email) 
        : validatePassword(formData.password)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      const firstErrorField = formRef.current?.querySelector('[aria-invalid="true"]') as HTMLElement;
      firstErrorField?.focus();
      return;
    }
    setIsLoading(true)
    setFormError(null)
    
    try {
      const form = e.currentTarget as HTMLFormElement
      form.setAttribute('aria-busy', 'true')
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement
      submitButton.setAttribute('aria-busy', 'true')
      submitButton.textContent = '로그인 중...'

      await login(formData.email, formData.password)
    } catch (error) {
      const message = error instanceof FirebaseError 
        ? getFirebaseErrorMessage(error)
        : '알 수 없는 오류가 발생했습니다'
      setErrors(prev => ({ ...prev, submit: message }))
    } finally {
      setIsLoading(false)
      const form = e.currentTarget as HTMLFormElement
      form.setAttribute('aria-busy', 'false')
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement
      submitButton.setAttribute('aria-busy', 'false')
      submitButton.textContent = '로그인'
    }
  }

  const isSubmitDisabled = isLoading || 
    !formData.email || 
    !formData.password || 
    Boolean(errors.email) || 
    Boolean(errors.password)

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className="space-y-4" 
      noValidate
      aria-label="로그인 폼"
      aria-busy={isLoading}
    >
      <div 
        aria-atomic="true"
        aria-live="polite"
        role="status"
        className="sr-only"
      >
        {formError && formError}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-[var(--typography-sizes-sm)] font-[var(--typography-weights-medium)] text-[var(--colors-text-secondary)]">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          placeholder="이메일 주소를 입력하세요"
          autoComplete="email"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          tabIndex={1}
        />
        {errors.email && (
          <p id="email-error" className="text-[var(--colors-danger-500)] text-sm">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-[var(--typography-sizes-sm)] font-[var(--typography-weights-medium)] text-[var(--colors-text-secondary)]">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? 'password-error' : undefined}
          tabIndex={2}
        />
        {errors.password && (
          <p id="password-error" className="text-[var(--colors-danger-500)] text-sm">
            {errors.password}
          </p>
        )}
      </div>

      {errors.submit && (
        <div 
          ref={submitErrorRef}
          className="text-[var(--colors-danger-500)] text-sm p-2 rounded bg-[var(--colors-danger-50)]" 
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
        >
          {errors.submit}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitDisabled}
        loading={isLoading}
        className="w-full"
        aria-busy={isLoading}
        tabIndex={3}
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  )
}