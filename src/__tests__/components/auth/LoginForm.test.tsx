import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { FirebaseError } from 'firebase/app';

// Firebase 모킹
jest.mock('@/lib/firebase', () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn()
  }
}));

// useAuth 훅 모킹
jest.mock('@/hooks/useAuth');

describe('LoginForm', () => {
  const mockLogin = jest.fn();
  const user = userEvent.setup();
  
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * 초기 렌더링 테스트
   */
  describe('Initial Render', () => {
    it('renders all form elements correctly', () => {
      render(<LoginForm />);
      
      expect(screen.getByLabelText('이메일')).toBeInTheDocument();
      expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
    });

    it('starts with empty form fields', () => {
      render(<LoginForm />);
      
      expect(screen.getByLabelText('이메일')).toHaveValue('');
      expect(screen.getByLabelText('비밀번호')).toHaveValue('');
    });

    it('starts with disabled submit button', () => {
      render(<LoginForm />);
      
      expect(screen.getByRole('button', { name: '로그인' })).toBeDisabled();
    });
  });

  /**
   * 입력 유효성 검사 테스트
   */
  describe('Input Validation', () => {
    it('validates email format', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText('이메일');
      
      // 잘못된 이메일 형식
      await user.type(emailInput, 'invalid-email');
      await user.tab();
      expect(screen.getByText('유효한 이메일 주소를 입력해주세요')).toBeInTheDocument();
      
      // 올바른 이메일 형식
      await user.clear(emailInput);
      await user.type(emailInput, 'test@example.com');
      await user.tab();
      expect(screen.queryByText('유효한 이메일 주소를 입력해주세요')).not.toBeInTheDocument();
    });

    it('validates password length', async () => {
      render(<LoginForm />);
      const passwordInput = screen.getByLabelText('비밀번호');
      
      // 짧은 비밀번호
      await user.type(passwordInput, '12345');
      await user.tab();
      expect(screen.getByText('비밀번호는 최소 6자 이상이어야 합니다')).toBeInTheDocument();
      
      // 올바른 길이의 비밀번호
      await user.clear(passwordInput);
      await user.type(passwordInput, '123456');
      await user.tab();
      expect(screen.queryByText('비밀번호는 최소 6자 이상이어야 합니다')).not.toBeInTheDocument();
    });
  });

  /**
   * 폼 제출 테스트
   */
  describe('Form Submission', () => {
    it('handles successful login', async () => {
      // mockLogin이 Promise를 반환하도록 설정
      mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      render(<LoginForm />);
      
      await user.type(screen.getByLabelText('이메일'), 'test@example.com');
      await user.type(screen.getByLabelText('비밀번호'), 'password123');
      
      const submitButton = screen.getByRole('button', { name: '로그인' });
      await user.click(submitButton);
      
      // 로딩 상태 확인 전에 대기
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(submitButton).toHaveAttribute('aria-busy', 'true');
        expect(screen.getByText('로그인 중...')).toBeInTheDocument();
      });
    });

    it('handles invalid credentials', async () => {
      mockLogin.mockRejectedValueOnce(new FirebaseError('auth/invalid-credential', ''));
      
      render(<LoginForm />);
      
      await user.type(screen.getByLabelText('이메일'), 'test@example.com');
      await user.type(screen.getByLabelText('비밀번호'), 'wrongpassword');
      await user.click(screen.getByRole('button', { name: '로그인' }));
      
      await waitFor(() => {
        expect(screen.getByText('이메일 또는 비밀번호가 올바르지 않습니다')).toBeInTheDocument();
      });
    });

    it('handles too many requests error', async () => {
      mockLogin.mockRejectedValueOnce(new FirebaseError('auth/too-many-requests', ''));
      
      render(<LoginForm />);
      
      await user.type(screen.getByLabelText('이메일'), 'test@example.com');
      await user.type(screen.getByLabelText('비밀번호'), 'password123');
      await user.click(screen.getByRole('button', { name: '로그인' }));
      
      await waitFor(() => {
        expect(screen.getByText('너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요')).toBeInTheDocument();
      });
    });

    it('handles network errors', async () => {
      mockLogin.mockRejectedValueOnce(new FirebaseError('auth/network-request-failed', ''));
      
      render(<LoginForm />);
      
      await user.type(screen.getByLabelText('이메일'), 'test@example.com');
      await user.type(screen.getByLabelText('비밀번호'), 'password123');
      await user.click(screen.getByRole('button', { name: '로그인' }));
      
      await waitFor(() => {
        expect(screen.getByText('네트워크 연결을 확인해주세요')).toBeInTheDocument();
      });
    });
  });

  /**
   * 접근성 테스트
   */
  describe('Accessibility', () => {
    it('has proper ARIA attributes', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText('이메일');
      
      // 잘못된 이메일 입력
      await user.type(emailInput, 'invalid-email');
      await user.tab();
      
      // 유효성 검사 결과 확인
      await waitFor(() => {
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
        expect(emailInput).toHaveAttribute('aria-describedby');
      });
    });

    it('has correct tab order', () => {
      render(<LoginForm />);
      
      const emailInput = screen.getByLabelText('이메일');
      const passwordInput = screen.getByLabelText('비밀번호');
      const submitButton = screen.getByRole('button', { name: '로그인' });
      
      // 올바른 순서로 요소들이 존재하는지 확인
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
      
      // tabIndex 확인
      expect(emailInput).not.toHaveAttribute('tabindex', '-1');
      expect(passwordInput).not.toHaveAttribute('tabindex', '-1');
      expect(submitButton).not.toHaveAttribute('tabindex', '-1');
    });
  });
});