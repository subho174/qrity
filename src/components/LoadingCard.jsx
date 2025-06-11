import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function LoadingCard() {
  return (
    <Card className="p-6 mt-8 flex flex-col border-0 items-center justify-center bg-background hover:bg-background text-muted-foreground">
      <Loader2 className="animate-spin h-6 w-6 mb-2" />
      <span>Fetching attendance data...</span>
    </Card>
  );
}
