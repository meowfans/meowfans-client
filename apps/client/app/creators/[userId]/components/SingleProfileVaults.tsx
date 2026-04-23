import { BlurImage } from '@/components/BlurImage';
import { GetPublicCreatorProfileOutput, GetPublicVaultsOutput } from '@workspace/gql/generated/graphql';
import { TabsContent } from '@workspace/ui/components/tabs';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import Link from 'next/link';

interface SingleProfileVaultsProps {
  profile: GetPublicCreatorProfileOutput;
  initialVaults: GetPublicVaultsOutput[];
}

export const SingleProfileVaults = ({ profile, initialVaults }: SingleProfileVaultsProps) => {
  return (
    <TabsContent value="vaults" className="space-y-4">
      <motion.div
        key="vaults"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-3 gap-px md:gap-1"
      >
        {initialVaults.map((vault) => (
          <Link href={`/vaults/${vault.id}`} key={vault.id} className="relative aspect-square w-full overflow-hidden bg-white/5">
            <BlurImage src={vault.preview ?? ''} alt={vault.description ?? ''} className="h-full w-full object-cover" />
            {!vault.isPurchased && (
              <div className="absolute top-2 left-2">
                <Lock className="h-3 w-3 text-white/60" />
              </div>
            )}
          </Link>
        ))}
        {initialVaults.length > 0 && (
          <div className="col-span-3 flex justify-center py-8">
            <Link href={`/creators/${profile.username}/vaults`}>
              <button className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-white transition-colors border border-white/10 px-6 py-2 rounded-full">
                View All Vaults
              </button>
            </Link>
          </div>
        )}
      </motion.div>
    </TabsContent>
  );
};
