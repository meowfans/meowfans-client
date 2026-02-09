'use client';

import { useAdmin } from '@/hooks/context/AdminContextWrapper';
import { useImpersonationStore } from '@/hooks/store/impersonation.store';
import { useUser } from '@/hooks/useUser';
import { useGetAllObjectsCount } from '@/hooks/useVaults';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Loading } from '@workspace/ui/globals/Loading';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { CheckCircle2, Clock, Loader2, Search, ShieldCheck, UserCog, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DashboardView() {
  const { admin } = useAdmin();
  const { loading, fetchCounts, objectsCount } = useGetAllObjectsCount();
  const { loadCreator, user, loading: searching } = useUser();
  const { onOpen } = useImpersonationStore();
  const [searchUsername, setSearchUsername] = useState('');

  useEffect(() => {
    fetchCounts();
  }, []); // eslint-disable-line

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchUsername.trim()) return;
    await loadCreator(searchUsername.trim());
  };

  const stats = [
    {
      title: 'Pending Objects',
      value: objectsCount.pending,
      icon: Clock,
      color: 'text-amber-500',
      description: 'Waiting for processing'
    },
    {
      title: 'Processing Objects',
      value: objectsCount.processing,
      icon: ShieldCheck,
      color: 'text-blue-500',
      description: 'Currently being processed'
    },
    {
      title: 'Fulfilled Objects',
      value: objectsCount.fulfilled,
      icon: CheckCircle2,
      color: 'text-green-500',
      description: 'Successfully processed'
    },
    {
      title: 'Rejected Objects',
      value: objectsCount.rejected,
      icon: XCircle,
      color: 'text-destructive',
      description: 'Failed or rejected'
    }
  ];

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Welcome back, <span className="font-semibold text-foreground">@{admin?.user?.username}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-black italic uppercase tracking-tight flex items-center gap-2">
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
                  className="h-11 md:h-12 px-8 font-bold uppercase italic tracking-tighter w-full sm:w-auto"
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
                      <h4 className="font-bold text-lg leading-tight uppercase italic">
                        {user.firstName} {user.lastName}
                      </h4>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider italic">@{user.username}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                          ID: {user.id.slice(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => onOpen(user.id)} className="w-full sm:w-auto gap-2  h-11 px-6 shadow-lg shadow-primary/20">
                    <UserCog className="h-4 w-4" />
                    Impersonate User
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[200px]">
          <Loading />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
