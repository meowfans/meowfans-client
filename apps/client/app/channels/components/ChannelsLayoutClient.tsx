'use client';

import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Channels } from './Channels';

interface ChannelsLayoutClientProps {
  initialChannels: ChannelsOutput[];
  children: React.ReactNode;
}

export function ChannelsLayoutClient({ initialChannels, children }: ChannelsLayoutClientProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isBasePage = pathname === '/channels';

  if (isMobile) {
    return (
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
        <AnimatePresence mode="wait" initial={false}>
          {isBasePage ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1 overflow-hidden"
            >
              <Channels initialChannels={initialChannels} />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex-1 overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="w-72 lg:w-80 xl:w-85 flex-none overflow-hidden xl:rounded-3xl border-r xl:border border-border/10 bg-secondary/10 backdrop-blur-3xl transition-all duration-500">
        <Channels initialChannels={initialChannels} />
      </div>

      <div className="flex-1 min-w-0 xl:rounded-3xl overflow-hidden border-border/10 bg-secondary/5 backdrop-blur-3xl shadow-sm">
        {children}
      </div>
    </div>
  );
}
