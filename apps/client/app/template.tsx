import { AppBottomNav } from '@/components/AppBottomNav';
import AppHeader from '@/components/AppHeader';
import { AppNavBar } from '@/components/AppNavBar';
import { ExoAdProvider } from '@/components/ExoAdProvider';

interface Props {
  children: React.ReactNode;
}
export default function RootTemplate({ children }: Props) {
  return (
    <div>
      <AppHeader />
      <AppNavBar />
      {children}
      <ExoAdProvider
        classIdName="eas6a97888e17"
        zoneId="5770830"
        className={`hidden md:flex justify-center
          items-center md:w-full sticky z-20`}
      />
      <AppBottomNav />
    </div>
  );
}
