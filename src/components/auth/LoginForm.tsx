'use client'
import { useState } from 'react'
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
    
    if (!validateForm()) return
    
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
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
      />

      {errors.submit && (
        <div className="text-[var(--colors-danger-500)] text-sm" role="alert">
          {errors.submit}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitDisabled}
        loading={isLoading}
        className="w-full"
      >
        로그인
      </Button>
    </form>
  )
}