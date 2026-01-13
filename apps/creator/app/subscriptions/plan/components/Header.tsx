import { SectionHeader } from '@/components/SectionHeader';
import { Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();
  return <SectionHeader title="Plan" description="Create a brand new subscription plan that works for you and your team." icon={Bell} />;
};
