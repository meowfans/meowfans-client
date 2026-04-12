import { Suspense } from 'react';
import { Settings } from './components/Settings';

export default function SettingsPage() {
 return (
 <Suspense>
  <Settings />
 </Suspense>
 );
}
