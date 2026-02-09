'use client';

import useAPI from '@/hooks/useAPI';
import { useCreatorMutations } from '@/hooks/useCreatorMutations';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Check, Globe, Monitor, Moon, Smartphone, Trash2, UserX } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type SettingsTab = 'display' | 'language' | 'account';

export function SettingsView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { successHandler } = useSuccessHandler();
  const { deleteAccount, loading } = useCreatorMutations();

  const tabParam = searchParams.get('tab') as SettingsTab;
  const [activeTab, setActiveTab] = useState<SettingsTab>(tabParam || 'display');
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState('en-US');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { logout } = useAPI();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

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
    // Persist logic would go here
    successHandler({ message: 'Settings updated successfully' });
  };

  const handleDeleteAccount = async () => {
    await deleteAccount();
    handleLogout();
    setShowDeleteConfirm(false);
  };

  const tabs = [
    { id: 'display', label: 'Display & Appearance', icon: Monitor, desc: 'Theme and visual preferences' },
    { id: 'language', label: 'Language & Region', icon: Globe, desc: 'Localization settings' },
    { id: 'account', label: 'Account Management', icon: UserX, desc: 'Manage your account' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 lg:p-14 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:w-72 shrink-0 space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
            <h1 className="text-3xl  leading-none">Studio Settings</h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest opacity-60">Manage your workspace</p>
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
                      ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02]'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  <div
                    className={cn(
                      'h-10 w-10 rounded-xl flex items-center justify-center transition-colors',
                      isActive ? 'bg-white/20 text-white' : 'bg-secondary group-hover:bg-secondary/60'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-black uppercase italic tracking-tight text-xs leading-tight">{tab.label}</p>
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
              className="space-y-10"
            >
              {activeTab === 'display' && (
                <div className="space-y-8">
                  <header className="space-y-1">
                    <h2 className="text-3xl font-black italic uppercase tracking-tight">Display Settings</h2>
                    <p className="text-muted-foreground font-medium text-sm">Customize how the Studio looks for you.</p>
                  </header>

                  <Card className="border-none bg-muted/30 p-8 rounded-[2rem] ring-1 ring-border/50 space-y-6">
                    <h4 className="font-bold italic uppercase tracking-tight flex items-center gap-2 text-sm">
                      <Moon className="h-4 w-4 text-primary" />
                      Theme Preference
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: 'light', label: 'Light Mode', icon: Monitor },
                        { id: 'dark', label: 'Dark Mode', icon: Moon },
                        { id: 'system', label: 'System', icon: Smartphone }
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => setTheme(mode.id)}
                          className={cn(
                            'flex flex-col items-center justify-center gap-3 p-6 rounded-[1.5rem] border-2 transition-all font-bold uppercase text-[10px] tracking-widest',
                            theme === mode.id
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-transparent bg-secondary hover:bg-secondary/80 text-muted-foreground'
                          )}
                        >
                          <mode.icon className="h-5 w-5" />
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === 'language' && (
                <div className="space-y-8">
                  <header className="space-y-1">
                    <h2 className="text-3xl font-black italic uppercase tracking-tight">Language & Locale</h2>
                    <p className="text-muted-foreground font-medium text-sm">Set your regional preferences for messages and labels.</p>
                  </header>

                  <Card className="border-none bg-muted/30 p-8 rounded-[2rem] ring-1 ring-border/50 space-y-6">
                    <h4 className="font-bold italic uppercase tracking-tight flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-primary" />
                      Display Language
                    </h4>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full h-14 rounded-2xl bg-secondary/50 border-none px-6 font-bold text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer hover:bg-secondary/70"
                      >
                        <option value="en-US">English (United States)</option>
                        <option value="es-ES">Spanish (España)</option>
                        <option value="fr-FR">French (France)</option>
                        <option value="ja-JP">Japanese (日本)</option>
                        <option value="de-DE">German (Deutschland)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest px-2 opacity-60">
                      Changing language will update the UI labels and date formatting.
                    </p>
                  </Card>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-8">
                  <header className="space-y-1">
                    <h2 className="text-3xl font-black italic uppercase tracking-tight">Account Management</h2>
                    <p className="text-muted-foreground font-medium text-sm">Manage your account settings and data.</p>
                  </header>

                  <Card className="border-none bg-destructive/5 p-8 rounded-[2rem] ring-1 ring-destructive/20 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-destructive/10 flex items-center justify-center shrink-0">
                        <AlertTriangle className="h-6 w-6 text-destructive" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-bold italic uppercase tracking-tight flex items-center gap-2 text-sm text-destructive">
                          Danger Zone
                        </h4>
                        <p className="text-sm text-muted-foreground font-medium">
                          Deleting your account is permanent and cannot be undone. All your content, followers, and data will be permanently
                          removed.
                        </p>
                      </div>
                    </div>

                    {!showDeleteConfirm ? (
                      <Button
                        onClick={() => setShowDeleteConfirm(true)}
                        variant="destructive"
                        className="h-14 px-8 rounded-full font-black italic uppercase tracking-widest gap-3 shadow-lg shadow-destructive/20"
                      >
                        <Trash2 className="h-5 w-5" />
                        Delete Account
                      </Button>
                    ) : (
                      <div className="space-y-4 p-6 rounded-2xl bg-destructive/10 border-2 border-destructive/20">
                        <p className="font-bold uppercase text-sm text-destructive flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Are you absolutely sure?
                        </p>
                        <p className="text-xs text-muted-foreground font-medium">
                          This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                        </p>
                        <div className="flex gap-3">
                          <Button
                            onClick={handleDeleteAccount}
                            disabled={loading}
                            variant="destructive"
                            className="h-12 px-6 rounded-full font-black italic uppercase tracking-widest text-xs gap-2"
                          >
                            {loading ? 'Deleting...' : 'Yes, Delete Forever'}
                          </Button>
                          <Button
                            onClick={() => setShowDeleteConfirm(false)}
                            variant="outline"
                            className="h-12 px-6 rounded-full font-bold uppercase tracking-widest text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleSave}
                  className="h-14 px-10 rounded-full bg-primary text-primary-foreground font-black italic uppercase tracking-widest gap-3 shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
                >
                  <Check className="h-5 w-5" />
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
