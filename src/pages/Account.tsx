
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  LogOut, 
  ShieldCheck, 
  User, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { useAuth } from "@/hooks/use-auth";
import { useSubscription } from "@/hooks/use-subscription";
import { useToast } from "@/hooks/use-toast";

export default function Account() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const { 
    isSubscribed, 
    checkSubscription, 
    initiateSubscription, 
    redirectToCustomerPortal,
    isLoading: subscriptionLoading
  } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loadingPortal, setLoadingPortal] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/auth");
    } else if (isAuthenticated) {
      checkSubscription();
    }
  }, [authLoading, isAuthenticated, navigate, checkSubscription]);

  const handleStartSubscription = async () => {
    try {
      await initiateSubscription();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo iniciar la suscripción",
        variant: "destructive",
      });
    }
  };

  const handleCustomerPortal = async () => {
    try {
      setLoadingPortal(true);
      await redirectToCustomerPortal();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo acceder al portal de cliente",
        variant: "destructive",
      });
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo cerrar sesión",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Cargando información de cuenta...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Mi Cuenta</h1>
          <p className="text-muted-foreground">Gestiona tu suscripción y configuración de cuenta</p>
        </div>

        {!isSubscribed ? (
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle>Inicia tu Suscripción</CardTitle>
              </div>
              <CardDescription>
                Desbloquea acceso completo al generador de contenido de marketing con IA
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="rounded-lg border p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Plan Mensual Premium</h3>
                    <Badge variant="outline" className="text-lg font-bold">$20 USD</Badge>
                  </div>
                  <p className="text-muted-foreground">Facturación mensual con acceso completo a todas las características</p>
                  
                  <Separator className="my-2" />
                  
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Generación ilimitada de contenido</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Acceso a todas las plantillas visuales</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Herramientas de análisis estratégico</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Guardado histórico de campañas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-primary/5 flex justify-center py-6">
              <Button 
                size="lg" 
                onClick={handleStartSubscription} 
                disabled={subscriptionLoading}
                className="w-full max-w-xs"
              >
                {subscriptionLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-background"></span>
                    Procesando
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Iniciar Suscripción
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Información del Usuario</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">{user?.email}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Estado de la cuenta</div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="font-medium">Verificada</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle>Estado de Suscripción</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Plan actual</div>
                  <div className="flex items-center gap-2 font-medium">
                    {isSubscribed ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Plan Mensual Premium ($20 USD/mes)</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <span>Sin suscripción activa</span>
                      </>
                    )}
                  </div>
                </div>
                
                {isSubscribed ? (
                  <div>
                    <div className="text-sm text-muted-foreground">Estado</div>
                    <Badge 
                      variant="secondary" 
                      className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                    >
                      Activa
                    </Badge>
                  </div>
                ) : null}
              </div>
            </CardContent>
            {isSubscribed ? (
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleCustomerPortal}
                  disabled={loadingPortal}
                >
                  {loadingPortal ? "Cargando..." : "Gestionar Suscripción"}
                </Button>
              </CardFooter>
            ) : null}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
