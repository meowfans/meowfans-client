'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useChannels } from '@/hooks/useChannels';
import { useCreators } from '@/hooks/useCreators';
import { useFanAssets } from '@/hooks/useFanAssets';
import { useFollowings } from '@/hooks/useFollow';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Loading } from '@workspace/ui/globals/Loading';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Image as ImageIcon, MessageSquare, ShoppingCart, Sparkles, Star, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CreatorCard } from '../../creators/components/CreatorCard';

export function DashboardView() {
  const { fan } = useFan();
  const { followings, loading: followingsLoading } = useFollowings();
  const { fanAssets, loading: assetsLoading } = useFanAssets({ take: 5 });
  const { creators: allCreators, loading: creatorsLoading } = useCreators({});
  const { channels, loading: channelsLoading } = useChannels({ take: 5, skip: 0 });

  // Filter recommendations: creators the user isn't following yet
  const recommendedCreators = allCreators.filter((c) => !followings.some((f) => f.id === c.id)).slice(0, 5);

  const stats = [
    {
      label: 'Following',
      value: followings.length.toString(),
      icon: Users,
      color: 'text-blue-500',
      description: 'Creators you watch',
      href: '/following'
    },
    {
      label: 'Collection',
      value: fan?.fanAssets?.length?.toString() || fanAssets.length.toString(),
      icon: ImageIcon,
      color: 'text-purple-500',
      description: 'Purchased content',
      href: '/purchased'
    },
    {
      label: 'Messages',
      value: channels.length.toString(),
      icon: MessageSquare,
      color: 'text-green-500',
      description: 'Active conversations',
      href: '/channels'
    }
  ];

  if (followingsLoading && followings.length === 0) {
    return <Loading />;
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-background/50 backdrop-blur-3xl p-6">
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

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link href={stat.href}>
              <Card className="hover:bg-secondary/20 transition-colors border-none bg-secondary/10 shadow-none">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        <div className="space-y-8 lg:col-span-4">
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Ready to Watch</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-primary gap-1" asChild>
                <Link href="/vaults">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {assetsLoading ? (
              <div className="h-48 flex items-center justify-center rounded-xl bg-secondary/10">
                <Loading />
              </div>
            ) : fanAssets.length === 0 ? (
              <Card className="border-dashed bg-transparent">
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <p className="font-medium">Direct collection is empty</p>
                  <p className="text-sm text-muted-foreground mt-1">Purchased 1-to-1 content will appear here.</p>
                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link href="/creators">Start Exploring</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fanAssets.map((asset) => (
                  <Link key={asset.id} href={`/vaults`} className="group">
                    <Card className="overflow-hidden border-none bg-secondary/20 transition-all hover:bg-secondary/40">
                      <div className="aspect-video relative overflow-hidden bg-muted">
                        <Image
                          src={asset.rawUrl}
                          alt="Asset"
                          width={300}
                          height={400}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                            Purchased
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h2 className="text-xl font-semibold">Recommended for You</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {creatorsLoading ? (
                <Loading />
              ) : (
                recommendedCreators.slice(0, 2).map((creator) => <CreatorCard key={creator.id} creator={creator} />)
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8 lg:col-span-3">
          <Card className="border-none bg-secondary/10 shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Messages</CardTitle>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <CardDescription>Stay in touch with creators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {channelsLoading ? (
                <div className="py-8">
                  <Loading />
                </div>
              ) : channels.length === 0 ? (
                <div className="text-center py-6">
                  <MessageSquare className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No active chats</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {channels.map((channel) => (
                    <Link
                      key={channel.id}
                      href={`/channels/${channel.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/20 transition-colors"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={channel.creatorAvatarUrl} />
                        <AvatarFallback>{channel.label?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">@{channel.creatorFullname}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {channel.lastMessage?.content || 'Started a new conversation'}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-[10px] h-5">
                        {channel.status}
                      </Badge>
                    </Link>
                  ))}
                  <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                    <Link href="/channels">Open Messenger</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-none shadow-none overflow-hidden relative">
            <div className="absolute -right-4 -top-4 opacity-10">
              <TrendingUp className="h-32 w-32 rotate-12" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                Top Interactions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Liked Posts
                </span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Star className="h-4 w-4" /> Favorite Creator
                </span>
                <span className="font-bold">@MeowWife</span>
              </div>
              <Separator className="opacity-50" />
              <div className="pt-2">
                <p className="text-xs text-muted-foreground italic">
                  Tip: Creators love it when you message them after unlocking their vaults!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Separator({ className = '' }) {
  return <div className={`h-px w-full bg-border ${className}`} />;
}
