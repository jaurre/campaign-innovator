
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ModuleProvider } from "@/contexts/module-context";
import { ContentProvider } from "@/contexts/content-context";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";
import { SubscriptionProvider } from "@/hooks/use-subscription";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "@/components/protected-route";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider defaultTheme="system">
        <AuthProvider>
          <SubscriptionProvider>
            <ModuleProvider>
              <ContentProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route 
                      path="/" 
                      element={
                        <ProtectedRoute>
                          <Index />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/auth" element={<Auth />} />
                    <Route 
                      path="/account" 
                      element={
                        <ProtectedRoute>
                          <Account />
                        </ProtectedRoute>
                      } 
                    />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </ContentProvider>
            </ModuleProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
