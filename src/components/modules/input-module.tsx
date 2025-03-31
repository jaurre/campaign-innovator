
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "@/contexts/content-context";
import { useModules } from "@/contexts/module-context";
import { ArrowRight, FileInput } from "lucide-react";

// Common industries for suggestions
const industries = [
  "Tecnología", "Salud", "Educación", "Alimentación", "Moda", "Belleza", 
  "Hogar", "Automotriz", "Construcción", "Finanzas", "Turismo", "Deportes", 
  "Arte y Cultura", "Entretenimiento", "E-commerce", "Consultoría"
];

export function InputModule() {
  const { businessInfo, setBusinessInfo, generateContent, isGenerating } = useContent();
  const { setActiveModule, enabledModules } = useModules();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({ ...prev, [name]: value }));
    
    // Show industry suggestions
    if (name === "industry" && value) {
      const filtered = industries.filter(industry => 
        industry.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectChange = (value: string) => {
    setBusinessInfo(prev => ({ ...prev, objective: value }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setBusinessInfo(prev => ({ ...prev, industry: suggestion }));
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateContent();
    if (enabledModules.generation) {
      setActiveModule("generation");
    }
  };

  const formIsValid = businessInfo.name && businessInfo.industry && businessInfo.objective;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="fade-in">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <FileInput className="h-6 w-6 text-accent" />
            <CardTitle className="text-2xl">Información de Negocio</CardTitle>
          </div>
          <CardDescription>
            Introduce los datos de tu empresa para generar contenido de marketing personalizado
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Negocio</Label>
              <Input
                id="name"
                name="name"
                value={businessInfo.name}
                onChange={handleInputChange}
                placeholder="Ej. MediSalud Plus"
                required
              />
            </div>
            
            <div className="space-y-2 relative">
              <Label htmlFor="industry">Rubro o Industria</Label>
              <Input
                id="industry"
                name="industry"
                value={businessInfo.industry}
                onChange={handleInputChange}
                placeholder="Ej. Salud, Tecnología, Educación"
                required
              />
              
              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-muted"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="objective">Objetivo de la Campaña</Label>
              <Select 
                value={businessInfo.objective} 
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lanzamiento">Lanzamiento</SelectItem>
                  <SelectItem value="Promoción">Promoción</SelectItem>
                  <SelectItem value="Fidelización">Fidelización</SelectItem>
                  <SelectItem value="Posicionamiento">Posicionamiento</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="keywords">
                Palabras clave (Opcional, separadas por comas)
              </Label>
              <Textarea
                id="keywords"
                name="keywords"
                value={businessInfo.keywords}
                onChange={handleInputChange}
                placeholder="Ej. innovación, calidad, confianza"
                className="resize-none"
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={!formIsValid || isGenerating}
              size="lg"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">Procesando</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Generar Contenido
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
