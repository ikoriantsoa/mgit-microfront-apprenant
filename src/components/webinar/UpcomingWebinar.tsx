
import { Calendar } from "lucide-react";

interface UpcomingWebinarProps {
  title: string;
  date: string;
  time: string;
  presenter: string;
}

export function UpcomingWebinar({ title }: UpcomingWebinarProps) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card/60 hover:bg-card transition-colors group">
      <div className="flex-shrink-0 h-12 w-12 rounded-md bg-primary flex items-center justify-center text-primary-foreground bg-[#74c9b2]">
        <Calendar className="h-6 w-6" />
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="text-sm font-medium line-clamp-1">{title}</h4>
        <div className="flex items-center mt-1">
        </div>
      </div>
    </div>
  );
}
