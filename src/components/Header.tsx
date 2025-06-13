
import { Fish } from "lucide-react";

interface HeaderProps {
  onReset?: () => void;
}

export const Header = ({ onReset }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6">
      <div className="container mx-auto px-4">
        <div 
          className="flex items-center justify-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={onReset}
        >
          <Fish className="h-8 w-8" />
          <h1 className="text-3xl font-bold">FishOntario</h1>
        </div>
        <p className="text-center text-blue-100 mt-2 text-lg">
          Your AI guide to Ontario's 2025 fishing regulations
        </p>
      </div>
    </header>
  );
};
