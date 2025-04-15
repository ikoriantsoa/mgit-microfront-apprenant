
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WebinarCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      
      <CardHeader className="p-4 pb-2">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-24 mt-1" />
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </CardFooter>
    </Card>
  );
}
