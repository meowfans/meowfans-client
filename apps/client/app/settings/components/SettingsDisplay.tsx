'use client';

import { Card } from '@workspace/ui/components/card';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Monitor, Moon, Smartphone } from 'lucide-react';

interface SettingsDisplayProps {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  isBlurEnabled: boolean;
  toggleBlur: () => void;
}

export function SettingsDisplay({ theme, setTheme, isBlurEnabled, toggleBlur }: SettingsDisplayProps) {
  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h2 className="text-3xl font-black italic uppercase tracking-tight">Display Settings</h2>
        <p className="text-muted-foreground font-medium">Choose your preferred visual experience.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card className="border-none bg-secondary/5 p-8 rounded-[2rem] ring-1 ring-white/5 space-y-6">
          <h4 className="font-black italic uppercase tracking-tight flex items-center gap-2">
            <Moon className="h-5 w-5 text-primary" />
            Theme Preference
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'light', label: 'Light Mode', icon: Monitor },
              { id: 'dark', label: 'Dark Mode', icon: Moon },
              { id: 'system', label: 'System', icon: Smartphone }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setTheme(mode.id)}
                className={cn(
                  'flex flex-col items-center justify-center gap-3 p-6 rounded-[1.5rem] border-2 transition-all font-black uppercase text-[10px] tracking-widest',
                  theme === mode.id || (!theme && mode.id === 'system')
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border/50 hover:bg-secondary/40 text-muted-foreground'
                )}
              >
                <mode.icon className="h-6 w-6" />
                {mode.label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="border-none bg-secondary/5 p-8 rounded-[2rem] ring-1 ring-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-black italic uppercase tracking-tight flex items-center gap-2">
                {isBlurEnabled ? <EyeOff className="h-5 w-5 text-primary" /> : <Eye className="h-5 w-5 text-primary" />}
                Content Safety
              </h4>
              <p className="text-xs text-muted-foreground font-medium max-w-md">
                Automatically blur images and sensitive content until you choose to reveal them.
              </p>
            </div>
            <div
              className={cn(
                'w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out',
                isBlurEnabled ? 'bg-primary' : 'bg-secondary'
              )}
              onClick={toggleBlur}
            >
              <motion.div
                className="bg-white h-6 w-6 rounded-full shadow-md"
                layout
                animate={{ x: isBlurEnabled ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
