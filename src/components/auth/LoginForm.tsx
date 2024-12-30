'use client'
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { FirebaseError } from 'firebase/app';
import { getFirebaseErrorMessage } from '@/utils/firebase-errors';

interface FormData {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  submit?: string;
}

export default function LoginForm() {
  // 상태 관리
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // 이메일 유효성 검사
  const validateEmail = (email: string): string | undefined => {
    if (!email) return undefined;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return '유효한 이메일 주소를 입력해주세요';
    }
    return undefined;
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string): string | undefined => {
    if (!password) return undefined;
    if (password.length < 6) {
      return '비밀번호는 최소 6자 이상이어야 합니다';
    }
    return undefined;
  };

  // 폼 전체 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    setErrors(prev => ({ ...prev, ...newErrors }));
    return !Object.values(newErrors).some(Boolean);
  };

  // 입력값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 입력 시 submit 에러 메시지 초기화
    setErrors(prev => ({
      ...prev,
      submit: undefined,  // submit 에러 메시지 초기화
      [name]: name === 'email' ? validateEmail(value) : validatePassword(value)
    }));
  };

  // 필드 포커스 아웃 처리
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setErrors(prev => ({
      ...prev,
      [name]: name === 'email' 
        ? validateEmail(formData.email) 
        : validatePassword(formData.password)
    }));
  };

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      const message = error instanceof FirebaseError 
        ? getFirebaseErrorMessage(error)
        : '알 수 없는 오류가 발생했습니다';
      setErrors(prev => ({ ...prev, submit: message }));
    } finally {
      setIsLoading(false);
    }
  };

  // 폼 제출 버튼 활성화 여부
  const isSubmitDisabled = isLoading || 
    !formData.email || 
    !formData.password || 
    Boolean(errors.email) || 
    Boolean(errors.password);

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`mt-1 block w-full rounded-md px-3 py-2
            ${isLoading ? 'bg-gray-100' : 'bg-white'}
            ${errors.email ? 'border-red-500' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          className={`mt-1 block w-full rounded-md px-3 py-2
            ${isLoading ? 'bg-gray-100' : 'bg-white'}
            ${errors.password ? 'border-red-500' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.password && (
          <p id="password-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.password}
          </p>
        )}
      </div>

      {errors.submit && (
        <div className="text-red-500 text-sm" role="alert">
          {errors.submit}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={`w-full flex justify-center py-2 px-4 border border-transparent 
          rounded-md shadow-sm text-sm font-medium text-white
          ${isSubmitDisabled 
            ? 'bg-blue-300 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            로그인 중...
          </>
        ) : '로그인'}
      </button>
    </form>
  );
}