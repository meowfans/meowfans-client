import { Metadata } from 'next';
import { SignupView } from './components/SignupView';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create an account'
};

export default function SignupPage() {
  return <SignupView />;
}
