import LoginForm from '@/components/auth/LoginForm';
import Card from '@/components/common/Card';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">THC Nexus 로그인</h1>
        <LoginForm />
      </Card>
    </div>
  );
}