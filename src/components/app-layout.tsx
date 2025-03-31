
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModuleProvider } from "@/contexts/module-context";
import { ContentProvider } from "@/contexts/content-context";
import { ThemeProvider } from "@/components/theme-provider";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider defaultTheme="system">
      <ModuleProvider>
        <ContentProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <main className="flex-1 overflow-x-hidden p-4 md:p-6">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ContentProvider>
      </ModuleProvider>
    </ThemeProvider>
  );
}
