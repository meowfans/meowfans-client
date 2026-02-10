import { useFan } from '@/hooks/context/UserContextWrapper';
import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

export const DashBoardHeader = () => {
  const { fan } = useFan();
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {fan?.user?.username || 'Fan'}! ✨</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your favorite creators today.</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/profile">Edit Profile</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/creators">Explore New</Link>
        </Button>
      </div>
    </div>
  );
};
