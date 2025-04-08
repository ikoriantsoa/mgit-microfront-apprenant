import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  LayoutDashboard,
  Video,
  Calendar,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false); // État pour le toggle collapse sur desktop
  const [mobileOpen, setMobileOpen] = useState(false); // État pour le menu mobile
  const location = useLocation();

  // Gestion du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true); // Collapsed par défaut sur mobile
      } else {
        setCollapsed(false); // Déplier sur desktop
      }
    };

    handleResize(); // Initialisation
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Éléments de navigation
  const navItems = [
    {
      title: "Tableau de bord",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      title: "Webinaires",
      icon: Video,
      href: "/webinaires",
    },
    {
      title: "Calendrier",
      icon: Calendar,
      href: "/calendrier",
    },
  ];

  // Contenu principal de la barre latérale
  const SidebarContent = ({ isMobile }: { isMobile?: boolean }) => (
    <>
      {/* En-tête */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
        <Link to="/">
          <div
            className={cn(
              "flex items-center gap-3",
              collapsed && !isMobile ? "justify-center w-full" : ""
            )}
          >
            {!collapsed || isMobile ? (
              <div className="h-14 w-14 rounded-full overflow-hidden bg-gradient-to-br from-primary to-primary flex items-center justify-center shadow-inner">
                <img
                  src="public/f64815e6-3df2-40f5-90df-32208f468511.jpeg"
                  alt="Logo"
                />
              </div>
            ) : null}
            {!collapsed || isMobile ? (
              <span className="text-xl font-bold text-sidebar-foreground text-blue-900">
                TalentUp
              </span>
            ) : null}
          </div>
        </Link>

        {/* Bouton de basculement (chevron) */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hidden md:flex"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.href ||
            location.pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.title}
              to={item.href}
              onClick={() => {
                if (mobileOpen) {
                  setMobileOpen(false); // Fermer le panneau mobile si ouvert
                }
              }}
              className={cn(
                "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out relative",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                  : "",
                collapsed && !isMobile ? "justify-center" : "justify-start"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-transform duration-300 ease-in-out",
                  collapsed && !isMobile ? "mx-auto" : "mr-3",
                  isActive ? "text-primary scale-125" : ""
                )}
              />
              {(isMobile || !collapsed) && (
                <span
                  className={cn(
                    "truncate transition-opacity duration-300 ease-in-out",
                    collapsed && !isMobile && !isActive
                      ? "opacity-0 absolute left-full ml-2 bg-background p-1 rounded-md shadow-md"
                      : "opacity-100"
                  )}
                >
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      {/* Bouton de menu pour mobile */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-background/80 backdrop-blur-sm"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Ouvrir le menu</span>
      </Button>

      {/* Barre latérale modale pour mobile */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-sidebar border-sidebar-border w-64">
          <SidebarContent isMobile />
        </SheetContent>
      </Sheet>

      {/* Barre latérale pour desktop */}
      <div
        className={cn(
          "hidden md:flex flex-col bg-sidebar border-r border-sidebar-border h-screen sticky top-0",
          collapsed ? "w-16" : "w-64",
          "transition-all duration-300 ease-in-out",
          className
        )}
      >
        <SidebarContent />
      </div>
    </>
  );
}
