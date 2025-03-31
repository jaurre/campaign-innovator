
import { useState } from "react";
import { useContent } from "@/contexts/content-context";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy, MessageSquareText, RefreshCw } from "lucide-react";
import { useModules } from "@/contexts/module-context";
import { useToast } from "@/hooks/use-toast";

export function GenerationModule() {
  const { businessInfo, generatedContent, isGenerating, regenerateSection } = useContent();
  const { setActiveModule } = useModules();
  const [activeTab, setActiveTab] = useState("social");
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado al portapapeles",
      description: "El contenido ha sido copiado exitosamente.",
      duration: 2000,
    });
  };

  if (!generatedContent && !isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
        <MessageSquareText className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">No hay contenido generado</h2>
        <p className="text-muted-foreground max-w-md text-center">
          Primero completa el formulario de información de negocio para generar contenido.
        </p>
        <Button onClick={() => setActiveModule("input")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al formulario
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Card className="mb-4 fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <MessageSquareText className="h-6 w-6 text-accent" />
            <CardTitle className="text-2xl">Contenido Generado</CardTitle>
          </div>
          <CardDescription>
            Contenido personalizado para {businessInfo.name} en {businessInfo.industry}
          </CardDescription>
        </CardHeader>
      </Card>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Generando contenido personalizado...</p>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="social">Posts para Redes</TabsTrigger>
            <TabsTrigger value="email">Email Marketing</TabsTrigger>
            <TabsTrigger value="slogan">Slogans</TabsTrigger>
            <TabsTrigger value="ads">Anuncios</TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-xl font-medium">Posts para Redes Sociales</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => regenerateSection('socialPosts')}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerar todos
                </Button>
              </div>
              
              {generatedContent?.socialPosts.map((post) => (
                <Card key={post.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="mb-3 text-left">{post.text}</div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => regenerateSection('socialPosts', post.id)}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerar
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleCopy(post.text)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="email" className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-xl font-medium">Email Marketing</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => regenerateSection('emails')}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerar todos
                </Button>
              </div>
              
              {generatedContent?.emails.map((email) => (
                <Card key={email.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="mb-2 text-left">
                      <div className="font-medium mb-2">Asunto: {email.subject}</div>
                      <div className="whitespace-pre-line">{email.body}</div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => regenerateSection('emails', email.id)}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerar
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleCopy(`Asunto: ${email.subject}\n\n${email.body}`)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="slogan" className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-xl font-medium">Slogans</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => regenerateSection('slogans')}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerar todos
                </Button>
              </div>
              
              {generatedContent?.slogans.map((slogan) => (
                <Card key={slogan.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="text-xl font-medium text-center mb-4">{slogan.text}</div>
                    <div className="flex justify-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => regenerateSection('slogans', slogan.id)}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerar
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleCopy(slogan.text)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ads" className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-xl font-medium">Anuncios Publicitarios</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => regenerateSection('ads')}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerar todos
                </Button>
              </div>
              
              {generatedContent?.ads.map((ad) => (
                <Card key={ad.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="mb-2 text-left">
                      <div className="font-medium mb-2">Copy:</div>
                      <div className="mb-4">{ad.copy}</div>
                      <div className="font-medium mb-2">Enfoque:</div>
                      <div className="text-muted-foreground">{ad.focus}</div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => regenerateSection('ads', ad.id)}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerar
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleCopy(`Copy: ${ad.copy}\n\nEnfoque: ${ad.focus}`)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
