
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModules } from "@/contexts/module-context";
import { useAuth } from "@/hooks/use-auth";
import { useSubscription } from "@/hooks/use-subscription";
import { AppLayout } from "@/components/app-layout";
import { InputModule } from "@/components/modules/input-module";
import { GenerationModule } from "@/components/modules/generation-module";
import { TemplatesModule } from "@/components/modules/templates-module";
import { AnalyticsModule } from "@/components/modules/analytics-module";

const Index = () => {
  const { activeModule, enabledModules } = useModules();
  const { isAuthenticated } = useAuth();
  const { isSubscribed, isLoading: subscriptionLoading } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is authenticated but not subscribed, redirect to account page
    if (isAuthenticated && !subscriptionLoading && !isSubscribed) {
      navigate("/account");
    }
  }, [isAuthenticated, isSubscribed, subscriptionLoading, navigate]);

  const renderActiveModule = () => {
    if (!enabledModules[activeModule]) {
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
          <h2 className="text-2xl font-semibold">Módulo desactivado</h2>
          <p className="text-muted-foreground max-w-md text-center">
            Este módulo está actualmente desactivado. Puedes activarlo en la configuración del sidebar.
          </p>
        </div>
      );
    }

    switch (activeModule) {
      case "input":
        return <InputModule />;
      case "generation":
        return <GenerationModule />;
      case "templates":
        return <TemplatesModule />;
      case "analytics":
        return <AnalyticsModule />;
      default:
        return <InputModule />;
    }
  };

  if (subscriptionLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Verificando suscripción...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {renderActiveModule()}
    </AppLayout>
  );
};

export default Index;
