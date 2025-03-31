
import { 
  BarChart, 
  FileInput, 
  Layers, 
  Layout, 
  MessageSquareText, 
  Settings
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Module, useModules } from "@/contexts/module-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function AppSidebar() {
  const { activeModule, setActiveModule, enabledModules, toggleModule } = useModules();

  const menuItems: { title: string; module: Module; icon: React.ElementType }[] = [
    { title: "Entrada de Información", module: "input", icon: FileInput },
    { title: "Generación de Contenido", module: "generation", icon: MessageSquareText },
    { title: "Plantillas Visuales", module: "templates", icon: Layout },
    { title: "Análisis Estratégico", module: "analytics", icon: BarChart },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 px-2">
          <Layers className="h-6 w-6 text-accent" />
          <span className="text-xl font-semibold">CampañaAI</span>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} active={activeModule === item.module}>
                  <SidebarMenuButton 
                    disabled={!enabledModules[item.module]}
                    onClick={() => setActiveModule(item.module)}
                    className={!enabledModules[item.module] ? "opacity-50" : ""}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Configuración</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-3 py-2">
              <h3 className="mb-2 text-sm font-medium">Activar/Desactivar Módulos</h3>
              
              {menuItems.map((item) => (
                <div key={`toggle-${item.module}`} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <Label htmlFor={`toggle-${item.module}`} className="text-sm">
                      {item.title}
                    </Label>
                  </div>
                  <Switch
                    id={`toggle-${item.module}`}
                    checked={enabledModules[item.module]}
                    onCheckedChange={() => toggleModule(item.module)}
                  />
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <span className="text-sm">v1.0</span>
          </div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
