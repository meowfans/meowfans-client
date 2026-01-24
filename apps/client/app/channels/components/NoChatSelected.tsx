import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { MessageSquareText } from 'lucide-react';

export const NoChatSelected = () => {
  return (
    <Card className="mx-auto w-full max-w-2xl bg-background/70 backdrop-blur">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="rounded-lg border bg-background/70 p-2 backdrop-blur">
            <MessageSquareText className="h-4 w-4" />
          </div>
          <CardTitle className="text-xl">Select a channel</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">Pick a conversation from the list to start messaging.</p>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <div className="rounded-lg border bg-muted/20 p-3">Where meows come alive.</div>
      </CardContent>
    </Card>
  );
};
