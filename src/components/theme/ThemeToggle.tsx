
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "standard" ? "eco" : "standard")}
          className="rounded-full"
        >
          <Leaf 
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              theme === "eco" ? "text-primary" : "text-muted-foreground"
            }`} 
          />
          <span className="sr-only">Changer le thème</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Mode {theme === "eco" ? "éco" : "standard"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
