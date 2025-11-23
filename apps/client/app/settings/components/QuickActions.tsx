import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import Link from 'next/link';

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Link href={'/vaults'}>
          <Button>Connect to a service</Button>
        </Link>
        <Button variant="outline" className="w-full justify-start">
          Export settings
        </Button>
        <Button variant="destructive" className="w-full justify-start">
          Reset to defaults
        </Button>
      </CardContent>
    </Card>
  );
};
