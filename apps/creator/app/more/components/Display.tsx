'use client';

import { useShadCnBackgroundStore } from '@/hooks/store/background.store';
import { Label } from '@workspace/ui/components/label';
import { ApplyTheme } from '@workspace/ui/globals/ApplyTheme';
import { GenericCard } from '@workspace/ui/globals/GenericCard';
import { useBackground } from '@workspace/ui/hooks/useBackground';
import { BackGroundColors } from '@workspace/ui/lib/enums';
import { cn } from '@workspace/ui/lib/utils';
import { kMaxLength } from 'buffer';
import { motion } from 'framer-motion';
import { Moon, Palette, Sparkles, Sun, Wallpaper } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';

export const Display = () => {
  const { theme, setTheme } = useTheme();
  const { shadCnBackground } = useShadCnBackgroundStore();
  const [mounted, setMounted] = useState(false);
  const { setBgColor, bgColor } = useBackground();

  useEffect(() => {
    setMounted(true);
  }, []);

  const roleKeyByValue = useMemo(() => {
    return Object.fromEntries(Object.entries(BackGroundColors).map(([k, v]) => [v, k]));
  }, []);

  const orderedColors = useMemo(() => {
    const colors = Object.values(BackGroundColors);
    const index = colors.indexOf(bgColor);

    if (index === -1) return colors;

    return [colors[index], ...colors.slice(0, index), ...colors.slice(index + 1)];
  }, [bgColor]);

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun, gradient: 'from-amber-400 to-orange-400' },
    { value: 'dark', label: 'Dark', icon: Moon, gradient: 'from-indigo-500 to-purple-500' },
    { value: 'system', label: 'System', icon: Sparkles, gradient: 'from-blue-500 to-cyan-500' }
  ];

  return !mounted ? null : (
    <GenericCard
      title="Display & Theme"
      description="Customize how MeowFans looks for you"
      icon={Palette}
      iconClassName="bg-linear-to-br from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400"
    >
      <div className="space-y-4">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Theme Mode</Label>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = theme === option.value;

              return (
                <motion.button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200',
                    isActive ? 'border-primary bg-primary/5 shadow-md' : 'border-border/50 hover:border-border hover:bg-muted/50'
                  )}
                >
                  <motion.div
                    layoutId="activeTheme"
                    className={cn('absolute inset-0 rounded-lg bg-linear-to-br from-primary/10 to-primary/5', !isActive && 'opacity-0')}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />

                  <div className={cn('relative p-2 rounded-full bg-linear-to-r', option.gradient)}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>

                  <span className={cn('relative text-sm font-medium', isActive && 'text-primary')}>{option.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Wallpaper className="h-3.5 w-3.5 text-muted-foreground" />
                Background Style
              </Label>
              <p className="text-xs text-muted-foreground">
                {shadCnBackground ? shadCnBackground.replace('-', ' ') : 'Default background'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Live Preview</Label>
        <div className="relative overflow-hidden rounded-xl border border-border/50 bg-linear-to-br from-background/80 to-muted/50 p-6 backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-purple-500/5" />
          <div className="relative space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">Theme Preview</h3>
                <p className="text-sm text-muted-foreground">See how your theme looks in action...</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  <ApplyTheme />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {orderedColors.map((bColor, idx) => {
                const isActive = bgColor === bColor;
                const isDefault = bColor === '';
                return (
                  <div
                    key={idx}
                    title={roleKeyByValue[bColor].replace(/_/g, ' ')}
                    className={cn(
                      'h-12 rounded-lg cursor-pointer ',
                      bColor,
                      isDefault
                        ? 'dark:border-white border-black border-2 border-dashed'
                        : isActive
                          ? 'dark:border-white border-black border-2 shadow-accent-foreground shadow-2xl'
                          : 'border-border/50 hover:border-border hover:bg-muted/50'
                    )}
                    onClick={() => setBgColor(bColor)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </GenericCard>
  );
};
