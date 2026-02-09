import { Suspense } from 'react';
import { SettingsView } from './components/SettingsView';

export const metadata = {
  title: 'Settings',
  description: 'Manage your app preferences, language, and display settings.'
};

export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsView />
    </Suspense>
  );
}
