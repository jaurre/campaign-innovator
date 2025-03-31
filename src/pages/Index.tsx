
import { useModules } from "@/contexts/module-context";
import { AppLayout } from "@/components/app-layout";
import { InputModule } from "@/components/modules/input-module";
import { GenerationModule } from "@/components/modules/generation-module";
import { TemplatesModule } from "@/components/modules/templates-module";
import { AnalyticsModule } from "@/components/modules/analytics-module";

const Index = () => {
  const { activeModule, enabledModules } = useModules();

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

  return (
    <AppLayout>
      {renderActiveModule()}
    </AppLayout>
  );
};

export default Index;
