
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-primary",
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`h-8 w-8 rounded-md ${iconColor} bg-primary/10 flex items-center justify-center`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`text-xs ${
              change.positive 
                ? "text-green-500" 
                : "text-red-500"
            } flex items-center mt-1`}
          >
            <span>
              {change.positive ? "+" : "-"}{change.value}
            </span>
            <span className="ml-1 text-muted-foreground">depuis le dernier mois</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
