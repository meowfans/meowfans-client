'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Crown, Mail, MoreVertical, Search, Target, TrendingUp, Users2 } from 'lucide-react';
import { useState } from 'react';

type TierType = 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
type StatusType = 'Active' | 'Expiring' | 'Cancelled';

interface Subscriber {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  tier: TierType;
  status: StatusType;
  price: string;
  joinDate: string;
  revenue: string;
}

const MOCK_SUBSCRIBERS: Subscriber[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: 'sarahj',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    tier: 'Diamond',
    status: 'Active',
    price: '$49.99',
    joinDate: 'Jan 12, 2024',
    revenue: '$149.97'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    username: 'marcusc',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    tier: 'Gold',
    status: 'Active',
    price: '$24.99',
    joinDate: 'Feb 05, 2024',
    revenue: '$49.98'
  },
  {
    id: '3',
    name: 'Alex Rivera',
    username: 'alex99',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    tier: 'Silver',
    status: 'Expiring',
    price: '$14.99',
    joinDate: 'Mar 10, 2024',
    revenue: '$14.99'
  },
  {
    id: '4',
    name: 'Elena Gilbert',
    username: 'elenag',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    tier: 'Bronze',
    status: 'Active',
    price: '$4.99',
    joinDate: 'Mar 15, 2024',
    revenue: '$4.99'
  },
  {
    id: '5',
    name: 'Creative Soul',
    username: 'creatorx',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Creator',
    tier: 'Gold',
    status: 'Cancelled',
    price: '$24.99',
    joinDate: 'Dec 20, 2023',
    revenue: '$74.97'
  }
];

export function SubscribersView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'expiring'>('all');

  const filteredSubscribers = MOCK_SUBSCRIBERS.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || sub.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ? true : filter === 'active' ? sub.status === 'Active' : sub.status === 'Expiring';
    return matchesSearch && matchesFilter;
  });

  const getTierColor = (tier: TierType) => {
    switch (tier) {
      case 'Diamond':
        return 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20';
      case 'Gold':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Silver':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      case 'Bronze':
        return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      default:
        return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'Active':
        return 'text-green-500 bg-green-500/10';
      case 'Expiring':
        return 'text-red-500 bg-red-500/10';
      case 'Cancelled':
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-10 space-y-10 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Crown className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Subscriber Management</span>
          </div>
          <h1 className="text-4xl md:text-5xl  leading-none">Your Domain Members</h1>
          <p className="text-muted-foreground text-sm font-medium max-w-xl">
            Analyze your growth, manage member tiers, and engage with your most loyal supporters.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 shrink-0">
          {[
            { label: 'Total MRR', value: '$2,450', icon: TrendingUp, color: 'text-green-500' },
            { label: 'Active Subs', value: '142', icon: Users2, color: 'text-blue-500' },
            { label: 'Avg LTV', value: '$84.20', icon: Target, color: 'text-purple-500' }
          ].map((stat, i) => (
            <Card
              key={i}
              className="bg-secondary/20 border-none p-4 rounded-2xl flex items-center gap-4 shadow-sm group hover:bg-secondary/30 transition-colors"
            >
              <div className={cn('p-2 rounded-xl bg-background shadow-sx', stat.color)}>
                <stat.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
                <p className="text-xl  truncate">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-y border-border/50">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {['All Members', 'Active', 'Expiring Soon'].map((label, i) => (
            <button
              key={i}
              onClick={() => setFilter(i === 0 ? 'all' : i === 1 ? 'active' : 'expiring')}
              className={cn(
                'px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap transition-all',
                (i === 0 && filter === 'all') || (i === 1 && filter === 'active') || (i === 2 && filter === 'expiring')
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'text-muted-foreground hover:bg-secondary/50'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or @username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 pl-11 pr-4 rounded-2xl bg-secondary/50 border-none focus-visible:ring-primary/20 font-medium text-sm"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSubscribers.map((subscriber) => (
            <motion.div
              key={subscriber.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="group relative border-none bg-secondary/10 hover:bg-secondary/20 transition-all duration-500 p-6 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5">
                {/* Tier Badge */}
                <div
                  className={cn(
                    'absolute top-6 right-6 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] shadow-sm',
                    getTierColor(subscriber.tier)
                  )}
                >
                  {subscriber.tier}
                </div>

                <div className="space-y-8">
                  {/* Profile Header */}
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-4 border-background shadow-xl scale-110 group-hover:scale-125 transition-transform duration-500">
                      <AvatarImage src={subscriber.avatarUrl} />
                      <AvatarFallback className="font-bold">{subscriber.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="pt-1">
                      <h3 className="text-xl font-black italic uppercase tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
                        {subscriber.name}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground">@{subscriber.username}</p>
                    </div>
                  </div>

                  {/* Financial Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-background/40 backdrop-blur-sm border border-white/5 space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Subscription</p>
                      <p className="text-lg font-black italic text-foreground tracking-tighter">
                        {subscriber.price}
                        <span className="text-[10px] text-muted-foreground font-medium lowercase">/mo</span>
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-background/40 backdrop-blur-sm border border-white/5 space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Total Revenue</p>
                      <p className="text-lg font-black italic text-foreground tracking-tighter">{subscriber.revenue}</p>
                    </div>
                  </div>

                  {/* Bottom Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/20">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 italic">Member Since</span>
                      <span className="text-xs font-bold text-muted-foreground/80">{subscriber.joinDate}</span>
                    </div>
                    <div
                      className={cn(
                        'px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter',
                        getStatusColor(subscriber.status)
                      )}
                    >
                      {subscriber.status}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Button
                      variant="secondary"
                      className="flex-1 rounded-xl h-10 font-black uppercase tracking-widest text-[10px] gap-2 hover:bg-primary hover:text-white transition-all"
                    >
                      <Mail className="h-3 w-3" /> Message
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl hover:border-primary/50">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredSubscribers.length === 0 && (
        <div className="py-32 text-center space-y-8">
          <div className="h-24 w-24 bg-secondary/20 rounded-[2.5rem] flex items-center justify-center mx-auto ring-1 ring-white/5 rotate-12">
            <Users2 className="h-12 w-12 text-muted-foreground opacity-20 -rotate-12" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl  text-muted-foreground">Shadow Realm...</h3>
            <p className="text-muted-foreground/60 text-sm font-medium max-w-xs mx-auto">
              No members found matching your search criteria. Try a different domain filter.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setFilter('all');
            }}
            className="rounded-full font-black uppercase tracking-widest text-[10px] h-12 px-10 border-primary/20 hover:bg-primary/5"
          >
            Summon All Members
          </Button>
        </div>
      )}

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-center pt-20">
        <Button
          variant="ghost"
          className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 hover:text-primary hover:bg-transparent group"
        >
          Explore Deeper <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
