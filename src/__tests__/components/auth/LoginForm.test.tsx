import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/components/auth/LoginForm';

const mockLogin = jest.fn();
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockLogin
  })
}));

describe('LoginForm', () => {
  beforeEach(() => {
    mockLogin.mockReset();
  });

  it('renders form elements correctly', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/ })).toBeInTheDocument();
  });

  it('validates form fields', async () => {
    render(<LoginForm />);
    const user = userEvent.setup();
    
    await user.type(screen.getByLabelText(/이메일/), 'invalid-email');
    await user.tab();
    expect(screen.getByText('유효한 이메일 주소를 입력해주세요')).toBeInTheDocument();
    
    await user.type(screen.getByLabelText(/비밀번호/), '123');
    await user.tab();
    expect(screen.getByText('비밀번호는 최소 6자 이상이어야 합니다')).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    render(<LoginForm />);
    const user = userEvent.setup();
    
    await user.type(screen.getByLabelText(/이메일/), 'test@example.com');
    await user.type(screen.getByLabelText(/비밀번호/), 'password123');
    await user.click(screen.getByRole('button', { name: /로그인/ }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });
});