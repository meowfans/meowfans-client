import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@workspace/ui/components/button';
import { Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();
  return (
    <SectionHeader
      title="Subscriptions"
      description="Choose a plan that works for you and your team."
      icon={Bell}
      actions={<Button onClick={() => router.push('/subscriptions/plan')}>Create new plan</Button>}
    />
  );
};
