
import React, { createContext, useContext, useState } from "react";

export interface BusinessInfo {
  name: string;
  industry: string;
  objective: string;
  keywords: string;
}

export interface GeneratedContent {
  socialPosts: { id: number; text: string }[];
  emails: { id: number; subject: string; body: string }[];
  slogans: { id: number; text: string }[];
  ads: { id: number; copy: string; focus: string }[];
}

interface ContentContextType {
  businessInfo: BusinessInfo;
  setBusinessInfo: React.Dispatch<React.SetStateAction<BusinessInfo>>;
  generatedContent: GeneratedContent | null;
  setGeneratedContent: React.Dispatch<React.SetStateAction<GeneratedContent | null>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  generateContent: () => void;
  regenerateSection: (section: keyof GeneratedContent, id?: number) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: "",
    industry: "",
    objective: "Lanzamiento",
    keywords: "",
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock content generation - in a real app, this would call an API
  const generateContent = () => {
    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const mockContent: GeneratedContent = {
        socialPosts: [
          { id: 1, text: `¡${businessInfo.name} llega con una propuesta única en ${businessInfo.industry}! Descubre por qué somos la mejor opción para ti. #${businessInfo.industry.replace(/\s+/g, '')} #Innovación` },
          { id: 2, text: `En ${businessInfo.name} entendemos tus necesidades. Nuestro equipo de expertos está listo para ayudarte a alcanzar tus metas. ¡Contáctanos hoy mismo!` },
          { id: 3, text: `¿Buscas calidad en ${businessInfo.industry}? ${businessInfo.name} tiene las soluciones que necesitas. Visítanos y compruébalo tú mismo. #Calidad #${businessInfo.industry.replace(/\s+/g, '')}` },
        ],
        emails: [
          { 
            id: 1, 
            subject: `${businessInfo.name}: Revolucionando el sector de ${businessInfo.industry}`, 
            body: `Estimado cliente,\n\nNos complace presentarte ${businessInfo.name}, tu nueva solución integral en ${businessInfo.industry}. Nuestro objetivo es ayudarte a ${businessInfo.objective === 'Lanzamiento' ? 'despegar con fuerza' : 'mejorar tu posicionamiento'} en el mercado.\n\nDescubre nuestras ofertas exclusivas para nuevos clientes.\n\nSaludos cordiales,\nEquipo de ${businessInfo.name}` 
          },
          { 
            id: 2, 
            subject: `Descubre cómo ${businessInfo.name} está transformando ${businessInfo.industry}`, 
            body: `Hola,\n\nEl mundo de ${businessInfo.industry} está cambiando rápidamente, y en ${businessInfo.name} estamos a la vanguardia de esta transformación.\n\nQuisiera invitarte a conocer nuestras soluciones diseñadas especialmente para ayudarte a alcanzar tus objetivos de negocio.\n\n¿Podríamos agendar una breve reunión para discutir cómo podemos colaborar?\n\nAtentamente,\nDirección Comercial\n${businessInfo.name}` 
          },
        ],
        slogans: [
          { id: 1, text: `${businessInfo.name}: Innovación y excelencia en ${businessInfo.industry}` },
          { id: 2, text: `Transformando ${businessInfo.industry}, mejorando vidas - ${businessInfo.name}` },
        ],
        ads: [
          { 
            id: 1, 
            copy: `Descubre por qué ${businessInfo.name} es la elección número uno en ${businessInfo.industry}. Calidad, servicio y experiencia en un solo lugar.`, 
            focus: `Destacar la propuesta de valor única y la credibilidad de la marca.` 
          },
          { 
            id: 2, 
            copy: `¿Problemas con ${businessInfo.industry.toLowerCase()}? ${businessInfo.name} tiene la solución que has estado buscando. Contáctanos hoy.`, 
            focus: `Enfoque en resolución de problemas específicos del sector, llamada a la acción directa.` 
          },
        ],
      };
      
      setGeneratedContent(mockContent);
      setIsGenerating(false);
    }, 2000);
  };

  const regenerateSection = (section: keyof GeneratedContent, id?: number) => {
    if (!generatedContent) return;
    
    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const updatedContent = { ...generatedContent };
      
      if (id !== undefined) {
        // Regenerate specific item
        if (section === 'socialPosts') {
          const index = updatedContent.socialPosts.findIndex(post => post.id === id);
          if (index !== -1) {
            updatedContent.socialPosts[index] = {
              id,
              text: `¡Nuevo y mejorado! ${businessInfo.name} presenta su innovador enfoque en ${businessInfo.industry}. Nuestro compromiso es superar tus expectativas. #${businessInfo.keywords.split(',')[0] || businessInfo.industry.replace(/\s+/g, '')}`
            };
          }
        } 
        // Handle other specific regenerations similarly
      } else {
        // Regenerate entire section
        if (section === 'socialPosts') {
          updatedContent.socialPosts = [
            { id: 1, text: `¡Renovamos nuestra imagen! ${businessInfo.name} se transforma para ofrecerte lo mejor en ${businessInfo.industry}. #Renovación #${businessInfo.industry.replace(/\s+/g, '')}` },
            { id: 2, text: `La excelencia en ${businessInfo.industry} tiene nombre: ${businessInfo.name}. Descubre nuestro enfoque único y personalizado.` },
            { id: 3, text: `En ${businessInfo.name} combinamos tecnología y experiencia para revolucionar ${businessInfo.industry}. ¡Únete a nuestra comunidad!` },
          ];
        }
        // Handle other section regenerations similarly
      }
      
      setGeneratedContent(updatedContent);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <ContentContext.Provider
      value={{
        businessInfo,
        setBusinessInfo,
        generatedContent,
        setGeneratedContent,
        isGenerating,
        setIsGenerating,
        generateContent,
        regenerateSection,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
