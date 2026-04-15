import { PostTypes } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { motion } from 'framer-motion';
import { DollarSign, Eye, EyeOff, Lock } from 'lucide-react';

interface PostTypeProps {
  postType: PostTypes;
  onSetPostType: (type: PostTypes) => void;
  unlockPrice: number | undefined;
  onSetUnlockPrice: (price: number | undefined) => void;
}

export const PostType = ({ postType, onSetPostType, unlockPrice, onSetUnlockPrice }: PostTypeProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Type</CardTitle>
        <CardDescription>Choose who can see this post</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={postType === PostTypes.Public ? 'default' : 'outline'}
            onClick={() => onSetPostType(PostTypes.Public)}
            className="flex flex-col h-auto py-3"
          >
            <Eye className="h-5 w-5 mb-1" />
            <span className="text-xs">Public</span>
          </Button>
          <Button
            variant={postType === PostTypes.Exclusive ? 'default' : 'outline'}
            onClick={() => onSetPostType(PostTypes.Exclusive)}
            className="flex flex-col h-auto py-3"
          >
            <Lock className="h-5 w-5 mb-1" />
            <span className="text-xs">Exclusive</span>
          </Button>
          <Button
            variant={postType === PostTypes.Private ? 'default' : 'outline'}
            onClick={() => onSetPostType(PostTypes.Private)}
            className="flex flex-col h-auto py-3"
          >
            <EyeOff className="h-5 w-5 mb-1" />
            <span className="text-xs">Private</span>
          </Button>
          <Button
            variant={postType === PostTypes.Hidden ? 'default' : 'outline'}
            onClick={() => onSetPostType(PostTypes.Hidden)}
            className="flex flex-col h-auto py-3"
          >
            <EyeOff className="h-5 w-5 mb-1" />
            <span className="text-xs">Hidden</span>
          </Button>
        </div>

        {postType === PostTypes.Exclusive && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
            <Label htmlFor="unlockPrice">Unlock Price</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="unlockPrice"
                type="number"
                placeholder="0.00"
                value={unlockPrice || ''}
                onChange={(e) => onSetUnlockPrice(e.target.value ? Number(e.target.value) : undefined)}
                className="pl-9"
                min={0}
                step={0.01}
              />
            </div>
            <p className="text-xs text-muted-foreground">Set a price for users to unlock this post</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
