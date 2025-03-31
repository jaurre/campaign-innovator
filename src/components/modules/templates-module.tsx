
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContent } from "@/contexts/content-context";
import { useModules } from "@/contexts/module-context";
import { ArrowLeft, ExternalLink, Layout } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const templateCategories = [
  {
    id: "social",
    name: "Redes Sociales",
    templates: [
      { id: 1, name: "Post Corporativo", image: "bg-gradient-to-r from-blue-500 to-purple-600" },
      { id: 2, name: "Anuncio de Promoción", image: "bg-gradient-to-r from-orange-400 to-pink-500" },
      { id: 3, name: "Post Informativo", image: "bg-gradient-to-r from-green-400 to-emerald-500" },
      { id: 4, name: "Testimonio de Cliente", image: "bg-gradient-to-r from-yellow-400 to-amber-500" },
    ]
  },
  {
    id: "email",
    name: "Email Marketing",
    templates: [
      { id: 1, name: "Newsletter Mensual", image: "bg-gradient-to-r from-sky-400 to-blue-500" },
      { id: 2, name: "Anuncio de Producto", image: "bg-gradient-to-r from-violet-500 to-purple-600" },
      { id: 3, name: "Invitación a Evento", image: "bg-gradient-to-r from-amber-400 to-orange-500" },
    ]
  },
  {
    id: "ads",
    name: "Anuncios Publicitarios",
    templates: [
      { id: 1, name: "Banner Web", image: "bg-gradient-to-r from-indigo-500 to-blue-600" },
      { id: 2, name: "Flyer Digital", image: "bg-gradient-to-r from-rose-400 to-red-500" },
      { id: 3, name: "Slide para Presentación", image: "bg-gradient-to-r from-teal-400 to-emerald-500" },
    ]
  }
];

export function TemplatesModule() {
  const { businessInfo, generatedContent } = useContent();
  const { setActiveModule } = useModules();
  const { toast } = useToast();

  const handleOpenTemplate = () => {
    toast({
      title: "Simulando apertura de plantilla",
      description: "En una implementación real, esto abriría la plantilla en Canva u otra herramienta de diseño.",
      duration: 3000,
    });
  };

  return (
    <div className="w-full fade-in">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6 text-accent" />
            <CardTitle className="text-2xl">Plantillas Visuales</CardTitle>
          </div>
          <CardDescription>
            Selecciona una plantilla para personalizar tu contenido de marketing
          </CardDescription>
        </CardHeader>
      </Card>

      {!generatedContent ? (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <Layout className="w-16 h-16 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Primero genera contenido</h2>
          <p className="text-muted-foreground max-w-md text-center">
            Para aprovechar al máximo las plantillas, primero genera contenido en el módulo anterior.
          </p>
          <Button onClick={() => setActiveModule("input")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ir al formulario
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="social" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            {templateCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {templateCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.templates.map(template => (
                  <Card key={template.id} className="overflow-hidden card-hover">
                    <div className={`h-40 ${template.image}`}></div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Plantilla optimizada para {businessInfo.industry}
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">Vista previa</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>
                              {template.name} - Vista previa
                            </DialogTitle>
                          </DialogHeader>
                          <div className={`w-full aspect-video ${template.image} rounded-md flex items-center justify-center`}>
                            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-md max-w-[90%]">
                              <h3 className="text-center font-bold mb-2">{businessInfo.name}</h3>
                              {category.id === 'social' && generatedContent.socialPosts[0]?.text && (
                                <p className="text-sm">
                                  {generatedContent.socialPosts[0].text.substring(0, 100)}...
                                </p>
                              )}
                              {category.id === 'email' && generatedContent.emails[0]?.subject && (
                                <p className="text-sm">
                                  <span className="font-bold">Asunto:</span> {generatedContent.emails[0].subject}
                                </p>
                              )}
                              {category.id === 'ads' && generatedContent.ads[0]?.copy && (
                                <p className="text-sm">
                                  {generatedContent.ads[0].copy.substring(0, 100)}...
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                toast({
                                  title: "Función simulada",
                                  description: "En una implementación real, esto descargaría la plantilla.",
                                });
                              }}
                            >
                              Descargar
                            </Button>
                            <Button onClick={handleOpenTemplate}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Abrir en editor
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
