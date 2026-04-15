import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { Link, Sparkles } from 'lucide-react';

interface PostStudioHeaderProps {
  selectedAssetsLength: number;
}

export const PostStudioHeader = ({ selectedAssetsLength }: PostStudioHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
          <span className="truncate">Posts Studio</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Create and share your content with your audience</p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <Button variant="outline" size="sm" className="text-xs sm:text-sm" asChild>
          <Link href="/posts">Manage Posts</Link>
        </Button>
        <Badge variant="secondary" className="text-xs sm:text-sm whitespace-nowrap">
          {selectedAssetsLength} selected
        </Badge>
      </div>
    </motion.div>
  );
};
