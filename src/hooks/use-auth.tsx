
import { useState, useEffect, createContext, useContext } from "react";
import { createClient, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

// Initialize Supabase client - this is a placeholder that should be replaced
// with your actual Supabase URL and anon key when connected to Supabase
const supabaseUrl = "https://your-project.supabase.co";
const supabaseAnonKey = "your-anon-key";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithLinkedin: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for active session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setIsLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error de inicio de sesión",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "Registro exitoso",
        description: "Te hemos enviado un email de confirmación",
      });
    } catch (error: any) {
      toast({
        title: "Error de registro",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error al cerrar sesión",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/account",
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión con Google",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const loginWithLinkedin = async () => {
    try {
      // Note: LinkedIn OAuth needs to be enabled in Supabase Auth settings
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin",
        options: {
          redirectTo: window.location.origin + "/account",
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión con LinkedIn",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error al enviar el email de recuperación",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    loginWithGoogle,
    loginWithLinkedin,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
