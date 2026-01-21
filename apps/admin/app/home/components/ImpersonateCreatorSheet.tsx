'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { useUser } from '@/hooks/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@workspace/ui/components/sheet';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { Search, VenetianMask } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const ImpersonateCreatorSheet = () => {
  const [username, setUsername] = useState('');
  const { user, loadCreator, loading } = useUser();
  const { setSwitchContext } = useUtilsStore();

  const handleFetchUser = async () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }
    await loadCreator(username.trim());
  };

  const handleStartImpersonation = () => {
    if (!user) return;
    setSwitchContext(user as any);
    toast.success('Review impersonation details in the modal');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full justify-start gap-2">
          <VenetianMask className="h-4 w-4" />
          Impersonate user
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Impersonate a user</SheetTitle>
          <SheetDescription>Search for a user by username and start an impersonation session.</SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user-username">user username</Label>
            <div className="relative flex items-center">
              <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
              <Input
                id="user-username"
                placeholder="e.g. meowkitty"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-8"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleFetchUser();
                  }
                }}
              />
              <Button size="sm" className="ml-2" disabled={loading} onClick={handleFetchUser}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </div>

          {user && (
            <div className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatarUrl ?? MEOW_FANS_AVATAR} />
                  <AvatarFallback>{user.username?.[0]?.toUpperCase() ?? '?'}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{user.username}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">User ID</p>
                  <p className="truncate font-mono text-[11px]">{user.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Objects (pending)</p>
                  <p className="font-semibold">{user.creatorProfile.pendingObjectCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Objects (fulfilled)</p>
                  <p className="font-semibold">{user.creatorProfile.fulfilledObjectCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Objects (rejected)</p>
                  <p className="font-semibold">{user.creatorProfile.rejectedObjectCount}</p>
                </div>
              </div>

              <Button className="w-full" onClick={handleStartImpersonation}>
                Start impersonation flow
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
