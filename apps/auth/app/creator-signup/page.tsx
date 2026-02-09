import { Metadata } from 'next';
import { CreatorSignupView } from './components/CreatorSignupView';

export const metadata: Metadata = {
  title: 'Creator Sign Up',
  description: 'Create a creator account'
};

export default function CreatorSignupPage() {
  return <CreatorSignupView />;
}
