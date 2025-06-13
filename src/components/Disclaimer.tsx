
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const Disclaimer = () => {
  return (
    <Alert className="max-w-2xl mx-auto bg-amber-50 border-amber-200">
      <Info className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-sm text-amber-800">
        <strong>Important:</strong> This AI only answers questions about Ontario's official 2025 fishing regulations. 
        It cannot provide weather information, general fishing tips, or advice beyond the regulations. 
        Always verify critical information with official sources.
      </AlertDescription>
    </Alert>
  );
};
