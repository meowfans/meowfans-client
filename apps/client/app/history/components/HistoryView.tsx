'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CreditCard, Download, Filter, History as HistoryIcon, Search, ShoppingCart, Star, Wallet } from 'lucide-react';

const MOCK_HISTORY = [
  {
    id: 'TX-9021',
    type: 'subscription',
    title: 'Alex Rivers Premium',
    date: 'Feb 05, 2026',
    amount: 19.99,
    status: 'completed',
    creatorAvatar: 'https://i.pravatar.cc/150?u=alex'
  },
  {
    id: 'TX-8942',
    type: 'purchase',
    title: 'Exclusive Vault Object',
    date: 'Feb 03, 2026',
    amount: 5.0,
    status: 'completed',
    creatorAvatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: 'TX-8810',
    type: 'tip',
    title: 'Supporter Tip',
    date: 'Jan 28, 2026',
    amount: 10.0,
    status: 'completed',
    creatorAvatar: 'https://i.pravatar.cc/150?u=marco'
  },
  {
    id: 'TX-8701',
    type: 'subscription',
    title: 'Monthly Renewal',
    date: 'Jan 22, 2026',
    amount: 9.99,
    status: 'failed',
    creatorAvatar: 'https://i.pravatar.cc/150?u=sarah'
  }
];

export function HistoryView() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8 pt-0 max-w-5xl mx-auto w-full">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <HistoryIcon className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-black tracking-tight uppercase italic">Transactions</h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.2em]">Detailed record of your platform spending</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search transactions..."
              className="pl-9 h-11 w-full md:w-[240px] rounded-2xl border-border/50 bg-secondary/20 focus-visible:ring-primary/20"
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl border-border/50 bg-secondary/20 hover:bg-secondary/40">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-transparent border-b border-border/50 rounded-none w-full justify-start h-auto p-0 mb-6 flex-wrap">
          <TabsTrigger
            value="all"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 uppercase text-[10px] font-black tracking-widest transition-all"
          >
            All History
          </TabsTrigger>
          <TabsTrigger
            value="subscriptions"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 uppercase text-[10px] font-black tracking-widest transition-all"
          >
            Subscriptions
          </TabsTrigger>
          <TabsTrigger
            value="purchases"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 uppercase text-[10px] font-black tracking-widest transition-all"
          >
            Purchases
          </TabsTrigger>
          <TabsTrigger
            value="tips"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 uppercase text-[10px] font-black tracking-widest transition-all"
          >
            Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="space-y-3">
            <AnimatePresence>
              {MOCK_HISTORY.map((item, index) => (
                <HistoryItem key={item.id} item={item} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {[
          { label: 'Total Spent (30d)', value: '$143.20', icon: Wallet },
          { label: 'Active Subs', value: '12', icon: Star },
          { label: 'Downloads available', value: '45', icon: Download }
        ].map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-[2rem] bg-secondary/10 border border-border/50 flex flex-col gap-1 items-center justify-center text-center"
          >
            <stat.icon className="h-5 w-5 text-muted-foreground/60 mb-2" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{stat.label}</span>
            <span className="text-xl font-black">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryItem({ item, index }: { item: (typeof MOCK_HISTORY)[0]; index: number }) {
  const isFailed = item.status === 'failed';

  const getIcon = () => {
    switch (item.type) {
      case 'subscription':
        return <HistoryIcon className="h-4 w-4" />;
      case 'purchase':
        return <ShoppingCart className="h-4 w-4" />;
      case 'tip':
        return <Star className="h-4 w-4 text-amber-500 fill-amber-500" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.005 }}
      className="p-4 rounded-3xl bg-secondary/5 hover:bg-secondary/15 border border-border/20 transition-all flex items-center justify-between group cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-12 w-12 border-2 border-background ring-2 ring-primary/5">
            <AvatarImage src={item.creatorAvatar} />
            <AvatarFallback className="bg-primary/5 text-[10px] font-bold uppercase">{item.title.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-primary transition-colors">
            <span className="group-hover:text-primary-foreground transition-colors shrink-0">{getIcon()}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-bold tracking-tight">{item.title}</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">{item.date}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest leading-none">{item.id}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <p className={`text-sm font-black ${isFailed ? 'text-muted-foreground/60 line-through' : 'text-primary'}`}>
            ${item.amount.toFixed(2)}
          </p>
          <Badge
            variant={isFailed ? 'destructive' : 'secondary'}
            className={`text-[8px] h-4 rounded-full px-2 font-black uppercase tracking-widest border-none ${!isFailed ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'}`}
          >
            {item.status}
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-1"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
