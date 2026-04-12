'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Globe, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SettingsAccountManageMent } from './SettingsAccountManagement';
import { SettingsDisplay } from './SettingsDisplay';
import { SettingsLanguage } from './SettingsLanguage';
import { SettingsNotifications } from './SettingsNotifications';
import { SettingsSidebar, type SettingsTab } from './SettingsSidebar';

export function Settings() {
 const searchParams = useSearchParams();
 const router = useRouter();
 const pathname = usePathname();
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

 const tabs = [
 { id: 'display', label: 'Display & Appearance', icon: Monitor, desc: 'Theme and layout preferences' },
 { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alerts and push messages' },
 { id: 'language', label: 'Language & Region', icon: Globe, desc: 'Localization settings' }
 ];

 return (
 <div className="flex flex-col lg:flex-row gap-12 p-4">
  <div className="lg:w-80 lg:sticky lg:top-8 h-fit self-start">
  <SettingsSidebar activeTab={activeTab} tabs={tabs} onTabChange={handleTabChange} />
  </div>

  <div className="flex-1">
  <AnimatePresence mode="wait">
   <motion.div
   key={activeTab}
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   exit={{ opacity: 0, y: -20 }}
   transition={{ duration: 0.3 }}
   className="space-y-8"
   >
   {activeTab === 'display' && <SettingsDisplay theme={theme} setTheme={setTheme} />}

   {activeTab === 'notifications' && <SettingsNotifications />}

   {activeTab === 'language' && <SettingsLanguage language={language} setLanguage={setLanguage} />}

   {activeTab === 'account-management' && <SettingsAccountManageMent />}
   </motion.div>
  </AnimatePresence>
  </div>
 </div>
 );
}
