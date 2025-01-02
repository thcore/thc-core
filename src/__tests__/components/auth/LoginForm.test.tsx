import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { FirebaseError } from 'firebase/app';

// Mock useAuth hook
jest.mock('@/hooks/useAuth');
const mockLogin = jest.fn();
;(useAuth as jest.Mock).mockReturnValue({ login: mockLogin });

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial Render', () => {
    it('renders all form elements correctly', () => {
      render(<LoginForm />);
      
      expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
      expect(screen.getByLabelText(/비밀번호/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /로그인/ })).toBeInTheDocument();
      expect(screen.getByRole('form')).toHaveAttribute('aria-label', '로그인 폼');
    });

    it('starts with empty form fields', () => {
      render(<LoginForm />);
      
      expect(screen.getByLabelText(/이메일/)).toHaveValue('');
      expect(screen.getByLabelText(/비밀번호/)).toHaveValue('');
    });

    it('starts with disabled submit button', () => {
      render(<LoginForm />);
      
      expect(screen.getByRole('button', { name: /로그인/ })).toBeDisabled();
    });
  });

  describe('Input Validation', () => {
    it('validates email format', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/이메일/);
      
      await userEvent.type(emailInput, 'invalid-email');
      fireEvent.blur(emailInput);
      
      expect(await screen.findByText('유효한 이메일 주소를 입력해주세요')).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('validates password length', async () => {
      render(<LoginForm />);
      const passwordInput = screen.getByLabelText(/비밀번호/);
      
      await userEvent.type(passwordInput, '123');
      fireEvent.blur(passwordInput);
      
      expect(await screen.findByText('비밀번호는 최소 6자 이상이어야 합니다')).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Form Submission', () => {
    it('handles successful login', async () => {
      mockLogin.mockResolvedValueOnce(undefined);
      render(<LoginForm />);
      
      await userEvent.type(screen.getByLabelText(/이메일/), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/비밀번호/), 'password123');
      
      const submitButton = screen.getByRole('button', { name: /로그인/ });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(submitButton).toHaveAttribute('aria-busy', 'true');
        expect(screen.getByText('로그인 중...')).toBeInTheDocument();
        expect(screen.getByRole('form')).toHaveAttribute('aria-busy', 'true');
      });
    });

    it('handles invalid credentials', async () => {
      const errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다';
      mockLogin.mockRejectedValueOnce(new FirebaseError('auth/invalid-credential', errorMessage));
      
      render(<LoginForm />);
      
      await userEvent.type(screen.getByLabelText(/이메일/), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/비밀번호/), 'wrong-password');
      await userEvent.click(screen.getByRole('button', { name: /로그인/ }));
      
      const errorAlert = await screen.findByRole('alert');
      expect(errorAlert).toHaveTextContent(errorMessage);
      expect(errorAlert).toHaveAttribute('aria-live', 'assertive');
      expect(document.activeElement).toBe(errorAlert);
    });

    it('handles too many requests error', async () => {
      mockLogin.mockRejectedValueOnce(new FirebaseError('auth/too-many-requests', ''));
      
      render(<LoginForm />);
      
      await userEvent.type(screen.getByLabelText(/이메일/), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/비밀번호/), 'password123');
      await userEvent.click(screen.getByRole('button', { name: /로그인/ }));
      
      expect(await screen.findByRole('alert')).toHaveTextContent(/너무 많은 로그인 시도/);
    });

    it('handles network errors', async () => {
      mockLogin.mockRejectedValueOnce(new Error('Network Error'));
      
      render(<LoginForm />);
      
      await userEvent.type(screen.getByLabelText(/이메일/), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/비밀번호/), 'password123');
      await userEvent.click(screen.getByRole('button', { name: /로그인/ }));
      
      expect(await screen.findByRole('alert')).toHaveTextContent('알 수 없는 오류가 발생했습니다');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<LoginForm />);
      
      expect(screen.getByRole('form')).toHaveAttribute('aria-label', '로그인 폼');
      expect(screen.getByLabelText(/이메일/)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/비밀번호/)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
    });

    it('has correct tab order', async () => {
      render(<LoginForm />);
      const user = userEvent.setup();
      
      await user.tab();
      expect(document.activeElement).toBe(screen.getByLabelText(/이메일/));
      
      await user.tab();
      expect(document.activeElement).toBe(screen.getByLabelText(/비밀번호/));
      
      await user.tab();
      expect(document.activeElement).toBe(screen.getByRole('button', { name: /로그인/ }));
    });

    it('moves focus to first error field on validation failure', async () => {
      render(<LoginForm />);
      
      await userEvent.type(screen.getByLabelText(/이메일/), 'invalid-email');
      await userEvent.type(screen.getByLabelText(/비밀번호/), '123');
      await userEvent.click(screen.getByRole('button', { name: /로그인/ }));
      
      expect(document.activeElement).toBe(screen.getByLabelText(/이메일/));
    });
  });
});