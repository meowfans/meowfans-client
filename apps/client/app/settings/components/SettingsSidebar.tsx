'use client';

import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export type SettingsTab = 'display' | 'notifications' | 'language';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
}

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  tabs: Tab[];
  onTabChange: (tab: SettingsTab) => void;
}

export function SettingsSidebar({ activeTab, tabs, onTabChange }: SettingsSidebarProps) {
  return (
    <aside className="lg:w-80 shrink-0 space-y-8">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
        <h1 className="text-4xl leading-none">App Settings</h1>
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-60">Customize your experience</p>
      </motion.div>

      <nav className="space-y-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as SettingsTab)}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden',
                isActive
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                  : 'hover:bg-secondary/20 text-muted-foreground hover:text-foreground'
              )}
            >
              <div
                className={cn(
                  'h-10 w-10 rounded-xl flex items-center justify-center transition-colors',
                  isActive ? 'bg-white/20' : 'bg-secondary group-hover:bg-secondary/40'
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-black uppercase italic tracking-tight text-sm leading-tight">{tab.label}</p>
              </div>
              {isActive && (
                <motion.div layoutId="active-settings-tab" className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
