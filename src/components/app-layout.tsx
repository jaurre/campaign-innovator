import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HelpDialog } from "@/components/help-dialog";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 overflow-x-hidden p-4 md:p-6">
            {children}
          </main>
        </div>
        <footer className="border-t p-4">
          <div className="flex justify-end">
            <HelpDialog />
          </div>
        </footer>
      </div>
    </SidebarProvider>
  );
}
