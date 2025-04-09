import { Bell, LogOut, User, Settings, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import keycloak from "@/keycloak/keycloak";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Conteneur principal */}
        <div className="flex items-center justify-between w-full">
          {/* Bouton hamburger pour mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => console.log("Sidebar toggle")}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Texte centré */}
          <div className="flex items-center justify-center flex-grow mx-4">
            <span className="text-red-950 text-sm font-bold lg:text-2xl">
              MGIT Service - Le partage c'est notre ADN
            </span>
          </div>

          {/* Actions à droite */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Nouveau webinaire ajouté</span>
                    <span className="text-xs text-muted-foreground">
                      Il y a 5 minutes
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">
                      Rappel: Webinaire à venir
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Il y a 1 heure
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-primary">
                  Marquer tout comme lu
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            

            {/* Menu utilisateur */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/32x32" alt="Avatar" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <button onClick={() => keycloak.logout({redirectUri: window.location.origin})}>
                <DropdownMenuItem className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}