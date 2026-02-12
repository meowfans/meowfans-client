'use client';

import { useCreator } from '@/hooks/context/CreatorContextWrapper';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface FineTunedViewHeaderProps {
  title: string;
  count?: number;
}

export function FineTunedViewHeader({ title, count }: FineTunedViewHeaderProps) {
  const { userId } = useParams<{ userId: string }>();
  const { creator } = useCreator();

  return (
    <div className="relative mb-8 w-full">
      {/* Background Glow */}
      <div className="absolute -top-24 left-1/2 h-64 w-full -translate-x-1/2 opacity-20 blur-[100px] bg-gradient-to-r from-primary via-purple-500 to-blue-500" />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
            <Link
              href={`/creators/${userId}`}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-secondary/30 backdrop-blur-md border border-white/10 hover:bg-secondary/50 transition-all active:scale-95"
            >
              <ArrowLeft className="h-6 w-6 text-foreground group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20 p-0.5">
              <AvatarImage src={creator?.avatarUrl} className="rounded-full object-cover" />
              <AvatarFallback className="bg-primary/10">{creator?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">{title}</h1>
              <p className="text-sm font-medium text-primary">@{creator?.username}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {count !== undefined && (
            <div className="px-4 py-2 rounded-full bg-secondary/20 backdrop-blur-md border border-white/5 text-sm font-semibold">
              {count} {count === 1 ? 'Item' : 'Items'}
            </div>
          )}
          <Button variant="outline" size="icon" className="rounded-full bg-secondary/20 backdrop-blur-md border-white/10">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
