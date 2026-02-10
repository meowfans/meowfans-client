'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader } from '@workspace/ui/components/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Clock, MoreHorizontal } from 'lucide-react';

export interface Subscription {
  id: string;
  creatorName: string;
  username: string;
  avatarUrl: string;
  status: string;
  price: number;
  nextBilling: string;
  tier: string;
}

interface SubscriptionCardProps {
  sub: Subscription;
  index: number;
}

export function SubscriptionCard({ sub, index }: SubscriptionCardProps) {
  const isActive = sub.status === 'active';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
      <Card className="overflow-hidden border-border/50 bg-secondary/20 shadow-none rounded-[2rem] hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-background ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all">
              <AvatarImage src={sub.avatarUrl} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">{sub.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">{sub.creatorName}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">@{sub.username}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem className="text-xs uppercase font-bold gap-2">View Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-xs uppercase font-bold gap-2">Payment Methods</DropdownMenuItem>
              {isActive && (
                <DropdownMenuItem className="text-xs uppercase font-bold gap-2 text-destructive">Cancel Subscription</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="space-y-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Current Tier</p>
              <p className="text-xs font-bold">{sub.tier}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Monthly Price</p>
              <p className="text-sm font-black text-primary">${sub.price}</p>
            </div>
          </div>

          <div className="p-3 bg-background/50 rounded-2xl border border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] uppercase font-bold text-muted-foreground/80 tracking-widest">
                {isActive ? 'Next Billing' : 'Expired on'}
              </span>
            </div>
            <span className="text-[10px] font-black tabular-nums">{sub.nextBilling}</span>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          {isActive ? (
            <Button className="w-full rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground border border-border/50 text-[10px] font-black uppercase tracking-[0.2em] h-10 gap-2">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              Manage Access
            </Button>
          ) : (
            <Button className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-white text-[10px] font-black uppercase tracking-[0.2em] h-10 gap-2 shadow-lg shadow-primary/20">
              <Clock className="h-3 w-3" />
              Resubscribe
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
