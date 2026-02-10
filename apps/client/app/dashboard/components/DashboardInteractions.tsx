import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { Heart, Star, TrendingUp } from 'lucide-react';

export const DashboardInteractions = () => {
  return (
    <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-none shadow-none overflow-hidden relative">
      <div className="absolute -right-4 -top-4 opacity-10">
        <TrendingUp className="h-32 w-32 rotate-12" />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          Top Interactions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-2">
            <Heart className="h-4 w-4" /> Liked Posts
          </span>
          <span className="font-bold">24</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-2">
            <Star className="h-4 w-4" /> Favorite Creator
          </span>
          <span className="font-bold">@MeowWife</span>
        </div>
        <Separator className="opacity-50" />
        <div className="pt-2">
          <p className="text-xs text-muted-foreground italic">Tip: Creators love it when you message them after unlocking their vaults!</p>
        </div>
      </CardContent>
    </Card>
  );
};
