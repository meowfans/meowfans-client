import { useShadCnBackgroundStore } from '@/zustand/background.store';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Label } from '@workspace/ui/components/label';
import { ApplyTheme } from '@workspace/ui/globals/ApplyTheme';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { Wallpaper } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export const Display = () => {
  const [backgroundModalOpen, setBackgroundModalOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  const { shadCnBackground } = useShadCnBackgroundStore();
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

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Background</h3>
              <p className="text-xs text-muted-foreground">{shadCnBackground ?? 'default'}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <TriggerModal onChangeModalState={setBackgroundModalOpen} modalIcon={{ icon: Wallpaper }} />
              </div>
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
                <div className="w-10 h-10 rounded-md bg-gradient-to-r from-indigo-400 to-pink-400" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
