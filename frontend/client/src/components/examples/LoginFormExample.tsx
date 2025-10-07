import LoginForm from '../forms/LoginForm';
import { AuthProvider } from '@/contexts/AuthContext';

export default function LoginFormExample() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}