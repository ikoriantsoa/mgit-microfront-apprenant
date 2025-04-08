import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Menu,
  LayoutDashboard, 
  Video, 
  Calendar
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
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1024);
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    {
      title: "Tableau de bord",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      title: "Webinaires",
      icon: Video,
      href: "/webinars",
    },
    {
      title: "Calendrier",
      icon: Calendar,
      href: "/calendar",
    },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center w-full" : "")}>
          {!collapsed && (
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-primary to-primary flex items-center justify-center shadow-inner">
              <Video className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
          )}
          {!collapsed && (
            <span className="text-xl font-semibold text-sidebar-foreground">TalentUp</span>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn("text-sidebar-foreground", collapsed ? "ml-auto" : "")}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm" : "",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                collapsed ? "mx-auto" : "mr-3",
                isActive ? "text-primary" : ""
              )} />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </Link>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setMobileOpen(true)} 
        className="fixed top-4 left-4 z-50 md:hidden bg-background/80 backdrop-blur-sm"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-sidebar border-sidebar-border w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

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
