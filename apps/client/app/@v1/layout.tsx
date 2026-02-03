import { AgeConfirmation } from '@/app/@v1/(legal)/components/AgeConfirmation';
import { CookieBanner } from '@/app/@v1/(legal)/components/CookieBanner';
import { AppSidebar } from '@/components/AppSideBar';
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar';
import { Toaster } from '@workspace/ui/components/sonner';
import { ThemeProvider } from 'next-themes';

export default async function V1Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AgeConfirmation />
      <SidebarProvider>
        <div className="flex w-full min-h-screen overflow-hidden">
          <AppSidebar />
          <SidebarInset className="flex flex-1 flex-col min-h-screen">
            <Toaster position="top-center" closeButton richColors theme="system" />
            <main className="flex-1 w-full overflow-x-hidden">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      <CookieBanner />
    </ThemeProvider>
  );
}
