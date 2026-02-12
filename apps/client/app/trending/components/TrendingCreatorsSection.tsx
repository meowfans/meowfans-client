'use client';

import { GetDefaultCreatorsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';

interface TrendingCreatorsSectionProps {
  creators: GetDefaultCreatorsOutput[];
}

export function TrendingCreatorsSection({ creators }: TrendingCreatorsSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <Users className="h-4 w-4 text-orange-500" />
          </div>
          <h2 className="text-xl">Rising Stars</h2>
        </div>
        <Link href="/trending/creators">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-secondary/40 rounded-full"
          >
            Full Rankings <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {creators.map((creator, i) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/creators/${creator.id}`}>
              <Card className="p-4 border-none bg-secondary/15 hover:bg-secondary/30 transition-all rounded-[2rem] text-center space-y-3 group cursor-pointer shadow-none hover:shadow-xl hover:shadow-primary/5">
                <div className="relative mx-auto w-20 h-20">
                  <Avatar className="h-full w-full border-2 border-background ring-2 ring-primary/5 group-hover:ring-primary/40 transition-all">
                    <AvatarImage src={creator.avatarUrl as string} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 font-black text-xl">
                      {creator.username?.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-white border-2 border-background">
                    {i + 1}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black truncate">@{creator.username}</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Top 0.1%</p>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
