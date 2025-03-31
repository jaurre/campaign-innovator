
import React, { createContext, useContext, useState } from "react";

export type Module = "input" | "generation" | "templates" | "analytics";

interface ModuleContextType {
  activeModule: Module;
  setActiveModule: (module: Module) => void;
  enabledModules: {
    input: boolean;
    generation: boolean;
    templates: boolean;
    analytics: boolean;
  };
  toggleModule: (module: Module) => void;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModule] = useState<Module>("input");
  const [enabledModules, setEnabledModules] = useState({
    input: true,
    generation: true,
    templates: true,
    analytics: true,
  });

  const toggleModule = (module: Module) => {
    setEnabledModules((prev) => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  return (
    <ModuleContext.Provider
      value={{
        activeModule,
        setActiveModule,
        enabledModules,
        toggleModule,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
};

export const useModules = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error("useModules must be used within a ModuleProvider");
  }
  return context;
};
