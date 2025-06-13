
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SampleQuestionsProps {
  onQuestionSelect: (question: string) => void;
  isLoading: boolean;
}

export const SampleQuestions = ({ onQuestionSelect, isLoading }: SampleQuestionsProps) => {
  const sampleQuestions = [
    "How many trout can I keep in Ontario?",
    "Do children need a fishing license?",
    "What are the walleye size limits in Zone 10?",
    "When is bass season open?",
    "What waters are open year-round for fishing?",
    "Can I use live bait in provincial parks?"
  ];

  return (
    <Card className="p-6 bg-green-50 border-green-100">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        Not sure what to ask? Try these examples:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sampleQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            className="text-left justify-start h-auto p-3 text-sm border-green-200 hover:bg-green-100 hover:border-green-300"
            onClick={() => onQuestionSelect(question)}
            disabled={isLoading}
          >
            {question}
          </Button>
        ))}
      </div>
    </Card>
  );
};
