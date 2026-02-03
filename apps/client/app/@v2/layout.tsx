import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar';
import { Toaster } from '@workspace/ui/components/sonner';
import { ThemeProvider } from 'next-themes';
import { AppBottomNav } from './components/AppBottomNav';
import { AppSidebar } from './components/AppSidebar';
import { MobileHeader } from './components/MobileHeader';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <div className="flex w-full h-svh overflow-hidden">
          <AppSidebar />
          <SidebarInset className="flex flex-1 flex-col h-svh overflow-hidden">
            <MobileHeader />
            <Toaster position="top-center" closeButton richColors theme="system" />
            <main id="v2-main-content" className="flex-1 w-full overflow-hidden flex flex-col">
              {children}
            </main>
            <AppBottomNav />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
