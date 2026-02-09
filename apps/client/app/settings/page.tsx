import { Suspense } from 'react';
import { SettingsView } from './components/SettingsView';

export const metadata = {
  title: 'Settings',
  description: 'Manage your profile, account security, and preferences.'
};

export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsView />
    </Suspense>
  );
}
