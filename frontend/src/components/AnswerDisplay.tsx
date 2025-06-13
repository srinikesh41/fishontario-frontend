import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Loader2, BookOpen } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AnswerDisplayProps {
  question: string;
  answer: string;
  sources: string[];
  isLoading: boolean;
  error: string | null;
}

export const AnswerDisplay = ({ question, answer, sources, isLoading, error }: AnswerDisplayProps) => {
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);

  if (!question && !isLoading) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {question && (
        <Card className="p-4 bg-blue-50 border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-2">Your Question:</h3>
          <p className="text-blue-700">{question}</p>
        </Card>
      )}

      {isLoading && (
        <Card className="p-6">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <p className="text-gray-600">Looking up regulations...</p>
          </div>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      {answer && !isLoading && (
        <Card className="p-6 bg-white border-green-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
            <div className="w-full">
              <h3 className="font-semibold text-green-800 mb-3">Based on Ontario's 2025 Fishing Regulations:</h3>
              <div className="prose prose-sm max-w-none text-gray-700">
                {answer.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2 last:mb-0">{paragraph}</p>
                ))}
              </div>

              {sources && sources.length > 0 && (
                <Collapsible
                  open={isSourcesOpen}
                  onOpenChange={setIsSourcesOpen}
                  className="mt-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <BookOpen className="h-4 w-4" />
                      <span>Source Excerpts</span>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {isSourcesOpen ? "Hide sources" : "Show sources"}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="space-y-2">
                    {sources.map((source, index) => (
                      <Card key={index} className="p-3 bg-gray-50 text-sm text-gray-600">
                        {source}
                      </Card>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
