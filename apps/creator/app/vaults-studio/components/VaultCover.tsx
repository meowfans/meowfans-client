import { NextImage } from '@/components/NextImage';
import { GetCreatorAssetsOutput } from '@workspace/gql/generated/graphql';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';

interface VaultCoverProps {
  previewAsset: GetCreatorAssetsOutput;
}

export const VaultCover = ({ previewAsset }: VaultCoverProps) => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Vault Cover</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <NextImage src={previewAsset.rawUrl} alt="Vault Cover" fill className="object-cover" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
