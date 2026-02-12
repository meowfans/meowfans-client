'use client';
import { BlurImage } from '@/components/BlurImage';
import { useRecommendations } from '@/hooks/client/useRecommendations';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { motion } from 'framer-motion';
import { Code, Database, Eye, LayoutGrid, Loader2, RefreshCcw, Users } from 'lucide-react';
import { useState } from 'react';

export function Recommendations() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('creators');
  const [viewMode, setViewMode] = useState<'visual' | 'json'>('visual');
  const { fetchRecommendedCreators, fetchRecommendedPosts, fetchRecommendedVaults } = useRecommendations();

  const fetchRecommendations = async (type: string) => {
    setLoading(true);
    try {
      let data;
      const input = { limit: 12 };
      switch (type) {
        case 'creators':
          data = await fetchRecommendedCreators(input);
          break;
        case 'posts':
          data = await fetchRecommendedPosts(input);
          break;
        case 'vaults':
          data = await fetchRecommendedVaults(input);
          break;
      }
      setResults(data);
    } catch (error) {
      console.error(error);
      setResults({ error: 'Failed to fetch recommendations', details: String(error) });
    } finally {
      setLoading(false);
    }
  };

  const renderVisualResults = () => {
    if (!results || results.length === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center min-h-[450px] text-muted-foreground italic gap-4 font-sans text-center px-12">
          <div className="h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center border border-dashed border-muted-foreground/30 animate-pulse">
            <RefreshCcw className="h-8 w-8 opacity-20" />
          </div>
          <p className="max-w-[200px]">Fetch recommendations to see the algorithm in action.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'creators':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {results.map((creator: any, i: number) => (
              <motion.div
                key={creator.creatorId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-5 border-none bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all rounded-[2rem] flex flex-col items-center text-center gap-4 group">
                  <Avatar className="h-24 w-24 border-4 border-background ring-4 ring-primary/5 group-hover:ring-primary/20 transition-all">
                    <AvatarImage src={creator.user?.avatarUrl} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 font-black text-2xl">{creator.user?.firstName?.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-black text-lg">@{creator.user?.username}</h3>
                    <p className="text-xs text-muted-foreground font-medium">
                      {creator.user?.firstName} {creator.user?.lastName}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-sm font-black text-primary">{creator.followersCount}</p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-black text-primary">{creator.totalPost}</p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Posts</p>
                    </div>
                  </div>
                  {creator.verified && (
                    <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none rounded-full px-4 py-1 font-black text-[10px] uppercase tracking-widest">
                      Verified Artist
                    </Badge>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        );
      case 'posts':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {results.map((post: any, i: number) => (
              <motion.div key={post.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="overflow-hidden border-none bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all rounded-[1.5rem] flex flex-col group h-full">
                  <div className="relative h-48 w-full overflow-hidden">
                    <BlurImage
                      src={post.preview}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt="Post preview"
                    />
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {post.isPurchased ? 'Unlocked' : 'Locked'}
                    </div>
                  </div>
                  <div className="p-5 space-y-3 flex-1 flex flex-col">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={post.creatorProfile?.user?.avatarUrl} />
                      </Avatar>
                      <span className="text-xs font-black truncate">@{post.creatorProfile?.user?.username}</span>
                    </div>
                    <p className="text-sm line-clamp-2 italic text-muted-foreground flex-1">
                      &quot;{post.caption || 'No caption provided'}&quot;
                    </p>
                    <div className="pt-3 border-t border-border/10 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</span>
                      {post.unlockPrice > 0 && <span className="text-xs font-black text-primary">${post.unlockPrice / 100}</span>}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        );
      case 'vaults':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {results.map((vault: any, i: number) => (
              <motion.div
                key={vault.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-4 border-none bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all rounded-[2rem] gap-4 group flex flex-col">
                  <div className="aspect-square rounded-[1.5rem] overflow-hidden bg-secondary/20 border border-white/5">
                    <BlurImage
                      src={vault.preview}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Vault preview"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={vault.creatorProfile?.user?.avatarUrl} />
                      </Avatar>
                      <span className="text-[10px] font-bold text-muted-foreground">@{vault.creatorProfile?.user?.username}</span>
                    </div>
                    <h4 className="font-black text-sm line-clamp-1">{vault.description || 'Exclusive Collection'}</h4>
                    <div className="flex justify-between items-center bg-secondary/20 p-2 rounded-xl">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3 opacity-40 text-primary" />
                        <span className="text-[10px] font-black">{vault.unlockPrice > 0 ? `$${vault.unlockPrice / 100}` : 'FREE'}</span>
                      </div>
                      <Badge variant="secondary" className="text-[9px] h-5 rounded-lg font-black uppercase tracking-tighter">
                        Vault
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-1 flex-col h-screen max-w-7xl mx-auto w-full overflow-hidden">
      {/* Fixed Sticky Header */}
      <div className="flex flex-col gap-8 p-4 md:p-8 shrink-0 bg-background/80 backdrop-blur-2xl z-20 border-b border-white/5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-3xl font-black">Recommendation Lab</h1>
              <p className="text-muted-foreground italic">Experimenting with the recommendation algorithm output</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-secondary/20 p-1 rounded-2xl">
            <Button
              variant={viewMode === 'visual' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('visual')}
              className="rounded-xl px-4 gap-2 h-10 font-black text-[10px] uppercase tracking-widest"
            >
              <Eye className="h-3 w-3" /> Visual
            </Button>
            <Button
              variant={viewMode === 'json' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('json')}
              className="rounded-xl px-4 gap-2 h-10 font-black text-[10px] uppercase tracking-widest"
            >
              <Code className="h-3 w-3" /> JSON
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="creators"
          onValueChange={(val) => {
            setActiveTab(val);
            setResults(null);
          }}
          className="w-full"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <TabsList className="bg-background/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/5 h-auto">
              {[
                { value: 'creators', icon: Users, label: 'Creators' },
                { value: 'posts', icon: LayoutGrid, label: 'Posts' },
                { value: 'vaults', icon: Database, label: 'Vaults' }
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-xl px-3 sm:px-4 py-2 gap-2 data-[state=active]:bg-primary data-[state=active]:text-white text-xs font-bold"
                >
                  <tab.icon className="h-4 w-4 shrink-0" /> <span className="hidden xs:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <Button
              onClick={() => fetchRecommendations(activeTab)}
              disabled={loading}
              className="rounded-full gap-2 px-8 h-12 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <RefreshCcw className="h-5 w-5" />}
              <span className="hidden sm:inline">Execute Algorithm</span>
              <span className="sm:hidden">Run</span>
            </Button>
          </div>
        </Tabs>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 min-h-0 bg-secondary/5">
        <ScrollArea className="h-full w-full">
          <div className="pb-32">
            {loading ? (
              <div className="h-[500px] flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-sans animate-pulse">Running recommendation engine...</p>
              </div>
            ) : viewMode === 'json' ? (
              <div className="p-8">
                <Card className="p-6 font-mono text-[11px] leading-relaxed bg-background/60 backdrop-blur-xl rounded-[1.5rem] border border-white/5 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-secondary px-2 py-1 rounded">
                      DEBUG VERSION 1.0
                    </span>
                  </div>
                  {results ? (
                    <pre className="text-primary/90 whitespace-pre-wrap">{JSON.stringify(results, null, 2)}</pre>
                  ) : (
                    <div className="h-[400px] flex items-center justify-center text-muted-foreground italic">No data fetched yet</div>
                  )}
                </Card>
              </div>
            ) : (
              renderVisualResults()
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Quick Stats Overlay (Optional) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-background/80 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl z-30 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Live Feed</span>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="text-[10px] font-black uppercase tracking-widest">
          Results: <span className="text-primary">{results?.length || 0}</span>
        </div>
      </div>
    </div>
  );
}
