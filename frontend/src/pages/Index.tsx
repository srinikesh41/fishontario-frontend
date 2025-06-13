import { useState } from "react";
import { Header } from "@/components/Header";
import { QuestionInput } from "@/components/QuestionInput";
import { SampleQuestions } from "@/components/SampleQuestions";
import { AnswerDisplay } from "@/components/AnswerDisplay";
import { Disclaimer } from "@/components/Disclaimer";
import { useToast } from "@/hooks/use-toast";
import { askQuestion } from "../lib/api";

const Index = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleReset = () => {
    setQuestion("");
    setAnswer("");
    setSources([]);
    setError(null);
    setIsLoading(false);
  };

  const handleQuestionSubmit = async (newQuestion: string) => {
    setQuestion(newQuestion);
    setAnswer("");
    setSources([]);
    setError(null);
    setIsLoading(true);

    try {
      const response = await askQuestion(newQuestion);
      setAnswer(response.answer);
      setSources(response.sources || []);
      toast({
        title: "Answer found!",
        description: "Information retrieved from Ontario fishing regulations.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get answer. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <Header onReset={handleReset} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-lg text-gray-700 mb-8">
            Ask me anything about Ontario's fishing regulations in plain English. 
            I've read the entire 200-page official document so you don't have to!
          </p>
        </div>

        <Disclaimer />

        <div className="space-y-6">
          <QuestionInput onSubmit={handleQuestionSubmit} isLoading={isLoading} />
          
          <AnswerDisplay 
            question={question}
            answer={answer}
            sources={sources}
            isLoading={isLoading}
            error={error}
          />
          
          {!question && !isLoading && (
            <SampleQuestions 
              onQuestionSelect={handleQuestionSubmit} 
              isLoading={isLoading}
            />
          )}
        </div>

        <footer className="text-center text-sm text-gray-500 pt-8">
          <p>© 2025 FishOntario - Unofficial guide to Ontario fishing regulations</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
