import { GetCreatorAssetsOutput } from '@workspace/gql/generated/graphql';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';
import NextImage from 'next/image';

interface PostPreviewProps {
  previewAsset: GetCreatorAssetsOutput;
}

export const PostPreview = ({ previewAsset }: PostPreviewProps) => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <NextImage src={previewAsset.rawUrl} alt="Preview" fill className="object-cover" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
