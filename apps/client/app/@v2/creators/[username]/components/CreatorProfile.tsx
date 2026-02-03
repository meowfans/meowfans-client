import { useCreator } from '@/hooks/context/CreatorContextWrapper';
import { useCreateChannel } from '@/hooks/useChannels';
import { useFollowingMutations } from '@/hooks/useFollow';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { motion } from 'framer-motion';
import { BadgeCheck, Grid, Heart, Lock, MessageCircle, MoreVertical, Plus, Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { CreatorProfilePosts } from './CreatorProfilePosts';
import { CreatorProfileVaults } from './CreatorProfileVaults';
import Image from 'next/image';

export const CreatorProfile = () => {
  const { creator } = useCreator();
  const { followCreator } = useFollowingMutations();
  const { createChannel, loading: messageLoading } = useCreateChannel();
  const [activeTab, setActiveTab] = useState('posts');

  if (!creator) return null;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: creator.username, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Cover Image */}
      <div className="relative h-52 md:h-96 w-full overflow-hidden">
        <div className="absolute inset-0" />
        <Image width={300} height={400} src={creator.bannerUrl || '/images/default-banner.jpg'} alt="Cover" className="h-full w-full object-cover" />

        {/* Mobile Header Actions */}
        <div className="absolute top-20 right-4 z-20 md:hidden flex gap-2">
          <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full"
            // Placeholder for More functionality
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto relative z-20 px-4 md:px-8 -mt-24 md:-mt-32">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
          {/* Avatar */}
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="relative">
            <div className="absolute -inset-1 rounded-full" />
            <Avatar className="h-32 w-32 md:h-48 md:w-48 border-4">
              <AvatarImage src={creator.avatarUrl} className="object-cover" />
              <AvatarFallback className="text-2xl font-bold">CN</AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Info Section */}
          <div className="flex-1 pt-2 md:pb-6 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl md:text-5xl font-black tracking-tight">{creator.fullName || creator.username}</h1>
                  {/* Verified Badge */}
                  <BadgeCheck className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <p className="text-lg">@{creator.username}</p>
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center gap-3">
                <Button
                  variant="secondary"
                  className="h-10 px-6 gap-2"
                  onClick={() => createChannel(creator.creatorId)}
                  disabled={messageLoading}
                >
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
                {creator.isFollowing ? (
                  <Button variant="outline" className="h-10 px-6 gap-2" onClick={() => followCreator(creator.creatorId)}>
                    <Heart className="h-4 w-4 fill-current" />
                    Following
                  </Button>
                ) : (
                  <Button className="h-10 px-6 gap-2" onClick={() => followCreator(creator.creatorId)}>
                    <Plus className="h-4 w-4" />
                    Follow
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2 space-y-6">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-wrap">
              {creator.bio || 'Welcome to my page! Check out my exclusive content below.'}
            </p>

            {/* Stats Row */}
            <div className="flex items-center gap-8 md:gap-12 py-4 border-y border-border/50">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-foreground">{creator.totalPost || 0}</span>
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-widest">Posts</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-foreground">{creator.followersCount || 0}</span>
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-widest">Followers</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-foreground">{creator.vaultCount || 0}</span>
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-widest">Vaults</span>
              </div>
            </div>
          </div>

          {/* Mobile Actions (Visible only on mobile) */}
          <div className="md:hidden flex flex-col gap-3">
            {creator.isFollowing ? (
              <Button
                variant="outline"
                className="w-full h-12 text-lg gap-2 border-border bg-background text-foreground hover:bg-muted"
                onClick={() => followCreator(creator.creatorId)}
              >
                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                Following
              </Button>
            ) : (
              <Button
                className="w-full h-12 text-lg gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                onClick={() => followCreator(creator.creatorId)}
              >
                <Plus className="h-5 w-5" />
                Follow for Free
              </Button>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                className="w-full h-11 bg-secondary text-secondary-foreground"
                onClick={() => createChannel(creator.creatorId)}
                disabled={messageLoading}
              >
                <MessageCircle className="h-4 w-4 mr-2" /> Message
              </Button>
              <Button variant="secondary" className="w-full h-11 bg-secondary text-secondary-foreground" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="posts" className="w-full" onValueChange={setActiveTab}>
            {/* Sticky Tab Header */}
            <div className="sticky top-14 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 -mx-4 px-4 md:mx-0 md:px-0 md:rounded-t-2xl">
              <TabsList className="w-full h-auto p-0 bg-transparent justify-start gap-8">
                <TabsTrigger
                  value="posts"
                  className="relative h-14 rounded-none border-b-2 border-transparent px-2 data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent focus:shadow-none"
                >
                  <span className="flex items-center gap-2 group">
                    <Grid
                      className={`h-4 w-4 transition-colors ${activeTab === 'posts' ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}
                    />
                    <span
                      className={`text-sm font-medium transition-colors ${activeTab === 'posts' ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}
                    >
                      Posts
                    </span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="vaults"
                  className="relative h-14 rounded-none border-b-2 border-transparent px-2 data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent focus:shadow-none"
                >
                  <span className="flex items-center gap-2 group">
                    <Lock
                      className={`h-4 w-4 transition-colors ${activeTab === 'vaults' ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}
                    />
                    <span
                      className={`text-sm font-medium transition-colors ${activeTab === 'vaults' ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}
                    >
                      Vaults
                    </span>
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-6 min-h-125">
              <TabsContent value="posts" className="mt-0 focus-visible:ring-0 focus-visible:outline-none">
                <div className="v2-posts-wrapper animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CreatorProfilePosts username={creator.username} />
                </div>
              </TabsContent>
              <TabsContent value="vaults" className="mt-0 focus-visible:ring-0 focus-visible:outline-none">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CreatorProfileVaults username={creator.username} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
