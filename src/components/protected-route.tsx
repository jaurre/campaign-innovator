
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useSubscription } from "@/hooks/use-subscription";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requireSubscription = false 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isSubscribed, isLoading: subscriptionLoading } = useSubscription();
  
  // If still loading auth state, show a loading indicator
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Verificando sesión...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, redirect to auth page
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  // If subscription is required but still loading subscription status
  if (requireSubscription && subscriptionLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Verificando suscripción...</p>
        </div>
      </div>
    );
  }
  
  // If subscription is required but user isn't subscribed
  if (requireSubscription && !isSubscribed) {
    return <Navigate to="/account" replace />;
  }
  
  return <>{children}</>;
}
