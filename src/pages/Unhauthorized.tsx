
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Unhauthorized = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "403 Unhauthorized: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center space-y-5">
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-40 w-40 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-7xl font-bold text-white">403</span>
            </div>
            <div className="absolute -top-2 -right-2 h-10 w-10 rounded-full bg-red-500 text-white flex items-center justify-center animate-bounce">
              !
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold">Non autorisée</h1>
        
        <p className="text-muted-foreground">
          Désolé, vous n'êtes pas autorisée à accéder à cette plateforme.
        </p>
        
        <div className="pt-4">
          <Button asChild className="bg-red-500">
            <Link to="/">Retourner à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unhauthorized;
