
import { useState, useEffect, createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

// Initialize Supabase client - placeholder to be replaced with your actual Supabase
const supabaseUrl = "https://your-project.supabase.co";
const supabaseAnonKey = "your-anon-key";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type SubscriptionContextType = {
  isSubscribed: boolean;
  isLoading: boolean;
  checkSubscription: () => Promise<void>;
  initiateSubscription: () => Promise<void>;
  redirectToCustomerPortal: () => Promise<void>;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Check subscription status whenever user changes
  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setIsSubscribed(false);
    }
  }, [user]);

  const checkSubscription = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // This calls our Supabase Edge Function that will verify with Stripe
      const { data, error } = await supabase.functions.invoke("check-subscription", {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });
      
      if (error) throw error;
      
      setIsSubscribed(data?.subscribed || false);
    } catch (error: any) {
      console.error("Error checking subscription:", error);
      toast({
        title: "Error al verificar suscripción",
        description: error.message || "No se pudo verificar el estado de la suscripción",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const initiateSubscription = async () => {
    if (!user) {
      toast({
        title: "Necesitas iniciar sesión",
        description: "Por favor inicia sesión para suscribirte",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // This calls our Supabase Edge Function that creates a Stripe Checkout session
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });
      
      if (error) throw error;
      
      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No se recibió URL de pago");
      }
    } catch (error: any) {
      console.error("Error initiating subscription:", error);
      toast({
        title: "Error al iniciar suscripción",
        description: error.message || "No se pudo iniciar el proceso de pago",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToCustomerPortal = async () => {
    if (!user) return;
    
    try {
      // This calls our Supabase Edge Function that creates a Stripe Customer Portal session
      const { data, error } = await supabase.functions.invoke("create-portal-session", {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });
      
      if (error) throw error;
      
      // Redirect to Stripe Customer Portal
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No se recibió URL del portal");
      }
    } catch (error: any) {
      console.error("Error redirecting to customer portal:", error);
      toast({
        title: "Error al abrir portal de cliente",
        description: error.message || "No se pudo acceder al portal de gestión de suscripción",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    isSubscribed,
    isLoading,
    checkSubscription,
    initiateSubscription,
    redirectToCustomerPortal,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};
