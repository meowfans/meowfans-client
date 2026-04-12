import { useImpersonationStore } from '@/hooks/store/impersonation.store';
import { useCreatorsActions } from '@workspace/gql/actions';
import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { Loader2, Search, UserCog } from 'lucide-react';
import { useState } from 'react';

export const DashboardQuickImpersonation = () => {
  const { getUserQuery } = useCreatorsActions();
  const { onOpen } = useImpersonationStore();
  const [searchUsername, setSearchUsername] = useState<string>('');
  const [user, setUser] = useState<UsersEntity | null>(null);
  const [searching, setSearching] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchUsername.trim()) return;
    setSearching(true);
    try {
      const user = await getUserQuery(searchUsername.trim());
      setUser(user.data?.getUser as UsersEntity);
    } catch (error) {
      setUser(null);
    } finally {
      setSearching(false);
    }
  };

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tight flex items-center gap-2">
          <UserCog className="h-5 w-5 text-primary" />
          Quick Impersonation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <p className="text-xs md:text-sm text-muted-foreground">
            Search for a creator by their username to view their details and start an impersonation session.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter creator username..."
                className="pl-9 h-11 md:h-12 bg-primary/5 border-primary/10 focus:border-primary/20"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={searching || !searchUsername.trim()}
              className="h-11 md:h-12 px-8 font-bold uppercase tracking-tighter w-full sm:w-auto"
            >
              {searching ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
              Search
            </Button>
          </div>
        </form>

        {user && (
          <div className="mt-6 p-4 rounded-xl border border-primary/10 bg-primary/5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-primary/20">
                  <AvatarImage src={user.avatarUrl || MEOW_FANS_AVATAR} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-lg leading-tight uppercase">
                    {user.firstName} {user.lastName}
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">@{user.username}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                      ID: {user.id.slice(0, 8)}...
                    </span>
                  </div>
                </div>
              </div>
              <Button onClick={() => onOpen(user.id)} className="w-full sm:w-auto gap-2 h-11 px-6 shadow-lg shadow-primary/20">
                <UserCog className="h-4 w-4" />
                Impersonate User
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
