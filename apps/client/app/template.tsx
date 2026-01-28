'use client';

import { AppBottomNav } from '@/components/AppBottomNav';
import AppHeader from '@/components/AppHeader';
import { AppNavBar } from '@/components/AppNavBar';
import { ExoAdProvider } from '@/components/ExoAdProvider';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}
export default function RootTemplate({ children }: Props) {
  const pathname = usePathname();
  return (
    <div>
      <AppHeader />
      <AppNavBar />
      {children}
      {!pathname.startsWith('/channels') && (
        <ExoAdProvider
          classIdName="eas6a97888e17"
          zoneId="5770830"
          className={`hidden md:flex justify-center
          items-center md:w-full sticky z-20`}
        />
      )}
      <AppBottomNav />
    </div>
  );
}
