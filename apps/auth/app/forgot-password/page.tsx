import { Metadata } from 'next';
import { ForgotPasswordView } from './components/ForgotPasswordView';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password'
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
