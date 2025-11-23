import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Label } from '@workspace/ui/components/label';
import { ApplyTheme } from '@workspace/ui/globals/ApplyTheme';
import { cn } from '@workspace/ui/lib/utils';
import { useTheme } from 'next-themes';

export const Display = () => {
  const { theme } = useTheme();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Display & Theme</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Theme</h3>
              <p className="text-xs text-muted-foreground">{theme ?? 'system'}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <Label>Preview</Label>
          <div className="mt-2 p-4 rounded-lg border dark:border-slate-700 bg-gradient-to-br from-white/60 dark:from-slate-800/60">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Preview your theme</h3>
                <p className="text-xs text-muted-foreground">Small live preview of chosen appearance.</p>
              </div>
              <div className="inline-flex items-center gap-3">
                <div className="text-sm">
                  <ApplyTheme />
                </div>
                <div className={(cn('w-10 h-10 rounded-md'), theme !== 'light' ? 'bg-black' : 'bg-white')} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
