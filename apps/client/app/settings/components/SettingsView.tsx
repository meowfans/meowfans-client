'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useContentBlur } from '@/hooks/useContentBlur';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Check, Eye, EyeOff, Globe, Monitor, Moon, Smartphone } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type SettingsTab = 'display' | 'notifications' | 'language';

export function SettingsView() {
  const { fan } = useFan();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { successHandler } = useSuccessHandler();
  const { isBlurEnabled, toggleBlur } = useContentBlur();

  const tabParam = searchParams.get('tab') as SettingsTab;
  const [activeTab, setActiveTab] = useState<SettingsTab>(tabParam || 'display');
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState('en-US');

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam, activeTab]); 

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSave = () => {
    // Here we would persist to local storage or backend
    successHandler({ message: 'Settings updated successfully' });
  };

  const tabs = [
    { id: 'display', label: 'Display & Appearance', icon: Monitor, desc: 'Theme and layout preferences' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alerts and push messages' },
    { id: 'language', label: 'Language & Region', icon: Globe, desc: 'Localization settings' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:w-80 shrink-0 space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
            <h1 className="text-4xl  leading-none">App Settings</h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-60">Customize your experience</p>
          </motion.div>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as SettingsTab)}
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

        {/* Main Content Area */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {activeTab === 'display' && (
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
                            onClick={() => setTheme(mode.id as any)}
                            className={cn(
                              'flex flex-col items-center justify-center gap-3 p-6 rounded-[1.5rem] border-2 transition-all font-black uppercase text-[10px] tracking-widest',
                              (theme ?? 'system' === mode.id)
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
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-8">
                  <header className="space-y-1">
                    <h2 className="text-3xl font-black italic uppercase tracking-tight">Notifications</h2>
                    <p className="text-muted-foreground font-medium">Manage how and when you receive alerts.</p>
                  </header>

                  <div className="space-y-4">
                    {[
                      { title: 'Push Notifications', desc: 'Receive alerts on your device', type: 'System' },
                      { title: 'Email Updates', desc: 'Digests and important announcements', type: 'Email' },
                      { title: 'Sound Effects', desc: 'Play sounds for in-app interactions', type: 'App' }
                    ].map((notif, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-6 rounded-[1.5rem] bg-secondary/5 border border-white/5 hover:bg-secondary/10 transition-colors"
                      >
                        <div className="space-y-1">
                          <h4 className="font-black italic uppercase tracking-tight text-sm">{notif.title}</h4>
                          <p className="text-xs text-muted-foreground font-medium">{notif.desc}</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                          <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'language' && (
                <div className="space-y-8">
                  <header className="space-y-1">
                    <h2 className="text-3xl font-black italic uppercase tracking-tight">Language & Locale</h2>
                    <p className="text-muted-foreground font-medium">Set your regional preferences.</p>
                  </header>

                  <Card className="border-none bg-secondary/5 p-8 rounded-[2rem] ring-1 ring-white/5 space-y-6">
                    <h4 className="font-black italic uppercase tracking-tight flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Display Language
                    </h4>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full h-14 rounded-2xl bg-secondary/10 border-none px-6 font-bold text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer hover:bg-secondary/20"
                    >
                      <option value="en-US">English (United States)</option>
                      <option value="es-ES">Spanish (España)</option>
                      <option value="fr-FR">French (France)</option>
                      <option value="ja-JP">Japanese (日本)</option>
                      <option value="de-DE">German (Deutschland)</option>
                    </select>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest px-2">
                      Changing language may require a restart of the application.
                    </p>
                  </Card>
                </div>
              )}

              <div className="flex justify-end pt-8">
                <Button
                  onClick={handleSave}
                  className="h-14 px-10 rounded-full bg-primary text-white font-black italic uppercase tracking-widest gap-3 shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
                >
                  <Check className="h-5 w-5" />
                  Save Preferences
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
