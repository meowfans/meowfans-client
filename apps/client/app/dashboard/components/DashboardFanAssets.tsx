import Loading from '@/app/loading';
import { GetFanAssetsOutput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { ArrowRight, ImageIcon, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DashboardFanAssetsProps {
  fanAssets: GetFanAssetsOutput[];
  assetsLoading: boolean;
}

export const DashboardFanAssets = ({ fanAssets, assetsLoading }: DashboardFanAssetsProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Ready to Watch</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-primary gap-1" asChild>
          <Link href="/vaults">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {assetsLoading ? (
        <div className="h-48 flex items-center justify-center rounded-xl bg-secondary/10">
          <Loading />
        </div>
      ) : fanAssets.length === 0 ? (
        <Card className="border-dashed bg-transparent">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="font-medium">Direct collection is empty</p>
            <p className="text-sm text-muted-foreground mt-1">Purchased 1-to-1 content will appear here.</p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link href="/creators">Start Exploring</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fanAssets.map((asset) => (
            <Link key={asset.id} href={`/vaults`} className="group">
              <Card className="overflow-hidden border-none bg-secondary/20 transition-all hover:bg-secondary/40">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <Image
                    src={asset.rawUrl}
                    alt="Asset"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      Purchased
                    </Badge>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
