'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useContentBlur } from '@/hooks/useContentBlur';
import { Button } from '@workspace/ui/components/button';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Check, Globe, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SettingsDisplay } from './SettingsDisplay';
import { SettingsLanguage } from './SettingsLanguage';
import { SettingsNotifications } from './SettingsNotifications';
import { SettingsSidebar, type SettingsTab } from './SettingsSidebar';

export function Settings() {
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
        <SettingsSidebar activeTab={activeTab} tabs={tabs} onTabChange={handleTabChange} />

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
                <SettingsDisplay theme={theme} setTheme={setTheme} isBlurEnabled={isBlurEnabled} toggleBlur={toggleBlur} />
              )}

              {activeTab === 'notifications' && <SettingsNotifications />}

              {activeTab === 'language' && <SettingsLanguage language={language} setLanguage={setLanguage} />}

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
