'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Gamepad2,
  Heart,
  Image as ImageIcon,
  Lock,
  MessageSquare,
  PlayCircle,
  Plus,
  Rocket,
  Settings,
  Star,
  TrendingUp,
  Users,
  Video,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export function DashboardView() {
  const { creator } = useCreator();
  const user = creator?.user;

  const stats = [
    { label: 'Subscribers', value: creator?.totalSubscriber || 0, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Followers', value: creator?.followersCount || 0, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Views', value: creator?.viewCount || 0, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Total Posts', value: creator?.totalPost || 0, icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-500/10' }
  ];

  const quickActions = [
    { label: 'Create Post', icon: Plus, href: '/posts-studio', color: 'bg-primary' },
    { label: 'Go Live', icon: Video, href: '#', color: 'bg-red-500' },
    { label: 'Vault', icon: Lock, href: '/vaults-studio', color: 'bg-orange-500' },
    { label: 'Messages', icon: MessageSquare, href: '/channels', color: 'bg-blue-600' }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-20 w-full">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 rounded-[2.5rem] border border-primary/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-32 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative z-10">
          <div className="relative shrink-0">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-4 border-background shadow-2xl">
              <AvatarImage src={user?.avatarUrl || undefined} alt={user?.username} />
              <AvatarFallback className="text-xl sm:text-2xl font-black">{user?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 sm:border-4 border-background" />
          </div>
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl">
                Welcome Back, <span className="text-primary italic">{user?.firstName || user?.username}</span>!
              </h1>
              <div className="hidden sm:flex items-center gap-1 bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-foreground italic shadow-lg shadow-primary/20">
                <Star className="h-3 w-3 fill-current" />
                Playground
              </div>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500 shrink-0" />
              <span className="line-clamp-2">Your creator playground is ready for entertainment.</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 relative z-10">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full font-black uppercase tracking-widest gap-2 bg-background/50 backdrop-blur text-[10px] sm:text-xs h-10 sm:h-11 px-4 sm:px-6"
            asChild
          >
            <Link href={`/${user?.username}`}>
              <Rocket className="h-3 w-3 sm:h-4 sm:w-4" /> <span className="hidden xs:inline">View </span>Profile
            </Link>
          </Button>
          <Button
            variant="default"
            size="lg"
            className="rounded-full font-black uppercase tracking-widest gap-2 shadow-lg shadow-primary/20 text-[10px] sm:text-xs h-10 sm:h-11 px-4 sm:px-6"
            asChild
          >
            <Link href="/settings">
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" /> Settings
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Grid Content */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stats Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={i} variants={item}>
                <Card className="border-none bg-secondary/10 hover:bg-secondary/20 transition-all cursor-default group overflow-hidden relative">
                  <div
                    className={cn(
                      'absolute -right-4 -bottom-4 opacity-5 transition-transform group-hover:scale-110 duration-500',
                      stat.color
                    )}
                  >
                    <stat.icon className="h-24 w-24 rotate-12" />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center mb-3', stat.bg)}>
                      <stat.icon className={cn('h-5 w-5', stat.color)} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                    <h3 className="text-2xl">{stat.value.toLocaleString()}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={item}>
            <Card className="border-none bg-muted/30 p-1">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Recent Performance
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest italic opacity-60">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center border-t border-border/50">
                <div className="text-center space-y-3">
                  <div className="p-4 bg-primary/5 rounded-full inline-block">
                    <TrendingUp className="h-8 w-8 text-primary opacity-20" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground italic">Insights will appear here as your data grows.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Widget */}
          <motion.div variants={item}>
            <Card className="border-none bg-primary text-primary-foreground p-6 rounded-[2rem] shadow-xl shadow-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-24 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-xl">Playground Actions</h3>
                  <p className="text-primary-foreground/70 text-xs font-bold uppercase tracking-widest">Get things started</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/playground" className="col-span-2">
                    <div className="bg-white/20 hover:bg-white/30 p-4 rounded-2xl flex items-center justify-center gap-4 transition-all cursor-pointer group active:scale-95 border border-white/10 shadow-lg bg-gradient-to-r from-primary/20 to-transparent mb-2">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                        <Gamepad2 className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-black uppercase tracking-widest block opacity-70">New Playground</span>
                        <span className="text-sm font-black uppercase italic tracking-tight">Play Room</span>
                      </div>
                    </div>
                  </Link>
                  {quickActions.map((action, i) => (
                    <Link key={i} href={action.href}>
                      <div className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group active:scale-95 border border-white/5 h-full">
                        <action.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-tight">{action.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Entertainment Feed Widget */}
          <motion.div variants={item}>
            <Card className="border-none bg-secondary/30 p-6 rounded-[2rem] ring-1 ring-white/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-primary" />
                  Latest Activity
                </h3>
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="space-y-4">
                {[
                  { user: 'SarahJ', action: 'subscribed to your Vault', time: '2m ago', icon: Heart },
                  { user: 'Alex99', action: 'liked your latest Post', time: '12m ago', icon: Star },
                  { user: 'CreatorX', action: 'mentioned you in a post', time: '1h ago', icon: MessageSquare }
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <act.icon className="h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-xs font-bold truncate leading-tight">
                        <span className="text-primary italic">@{act.user}</span> {act.action}
                      </p>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter opacity-60 font-mono">
                        {act.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 text-[10px] font-black uppercase tracking-widest italic opacity-40 hover:opacity-100"
              >
                See All Activity
              </Button>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
