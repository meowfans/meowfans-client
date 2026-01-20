import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const AlbumHeader = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="rounded-lg border bg-background/70 p-2 backdrop-blur">
            <Sparkles className="h-4 w-4" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Vault Studio</h1>
          <Badge variant="outline" className="hidden sm:inline-flex">
            Creator
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground max-w-xl">
          A clean overview of your recent post performance — views, engagement and earnings — powered by the shadcn chart components already
          in your UI package.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button asChild variant="outline">
          <Link href="/album/vaults">
            View vaults <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        {/* <Button asChild>
          <Link href="/assets">
            Create a post <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button> */}
      </div>
    </div>
  );
};
