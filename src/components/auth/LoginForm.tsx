'use client'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { FirebaseError } from 'firebase/app'
import { getFirebaseErrorMessage } from '@/utils/firebase-errors'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

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
      const firstErrorField = formRef.current?.querySelector('[aria-invalid="true"]') as HTMLElement
      firstErrorField?.focus()
      return
    }
    
    setIsLoading(true)
    try {
      await login(formData.email, formData.password)
    } catch (error) {
      const message = error instanceof FirebaseError 
        ? getFirebaseErrorMessage(error)
        : '알 수 없는 오류가 발생했습니다'
      setErrors(prev => ({ ...prev, submit: message }))
    } finally {
      setIsLoading(false)
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
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isLoading ? '로그인 처리 중입니다.' : ''}
      </div>

      <Input
        id="email"
        name="email"
        type="email"
        label="이메일"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isLoading}
        error={errors.email}
        placeholder="이메일 주소를 입력하세요"
        autoComplete="email"
        required
        aria-required="true"
        aria-invalid={Boolean(errors.email)}
        aria-describedby={errors.email ? 'email-error' : undefined}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="비밀번호"
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isLoading}
        error={errors.password}
        placeholder="비밀번호를 입력하세요"
        autoComplete="current-password"
        required
        aria-required="true"
        aria-invalid={Boolean(errors.password)}
        aria-describedby={errors.password ? 'password-error' : undefined}
      />

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
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  )
}