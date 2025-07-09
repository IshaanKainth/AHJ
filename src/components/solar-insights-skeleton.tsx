import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SolarInsightsSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-2/5" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-8 w-3/5" />
          <div className="space-y-4 pt-4 border-t">
            <div className="flex gap-4 items-center">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-4/5" />
            </div>
            <div className="flex gap-4 items-center">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-3/5" />
            </div>
            <div className="flex gap-4 items-center">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          </div>
           <div className="pt-4 border-t flex justify-between items-center">
             <Skeleton className="h-6 w-1/3" />
             <Skeleton className="h-8 w-1/4" />
           </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-1/3" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-4 pt-4 border-t">
            <div className="flex gap-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div className="space-y-2 flex-1">
                 <Skeleton className="h-5 w-1/4" />
                 <Skeleton className="h-4 w-3/4" />
                 <Skeleton className="h-4 w-2/4" />
              </div>
            </div>
             <div className="flex gap-4 items-center">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-2/5" />
            </div>
             <div className="flex gap-4 items-center">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-1/2" />
            </div>
             <div className="flex gap-4 items-center">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
