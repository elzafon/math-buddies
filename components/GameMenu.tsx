
import React from 'react';
import { Play } from 'lucide-react';

interface GameMenuProps {
  onStart: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
      <div className="mb-6 relative">
        <h1 className="text-5xl sm:text-7xl md:text-8xl text-indigo-600 drop-shadow-lg leading-tight font-fun">
          חברים למתמטיקה!
        </h1>
        <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 animate-pulse">
            <span className="text-3xl sm:text-4xl">⭐</span>
        </div>
        <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 animate-bounce">
            <span className="text-3xl sm:text-4xl">🍎</span>
        </div>
      </div>
      
      <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-md">
        פתרו בעיות חשבון מהנות עם הצעצועים האהובים עליכם ועוגות טעימות! האם תצליחו להגיע ל-20?
      </p>

      <button
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 font-bold text-white transition-all duration-200 bg-indigo-600 font-fun text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl hover:bg-indigo-700 active:scale-95 shadow-xl hover:shadow-2xl touch-manipulation"
      >
        <Play className="ml-3 w-6 h-6 sm:w-8 sm:h-8 fill-current rotate-180" />
        בואו נשחק
      </button>
      
      <div className="mt-8 sm:mt-12 grid grid-cols-4 gap-4 opacity-50">
        <span className="text-3xl sm:text-4xl">🍰</span>
        <span className="text-3xl sm:text-4xl">🖐️</span>
        <span className="text-3xl sm:text-4xl">🧸</span>
        <span className="text-3xl sm:text-4xl">🌟</span>
      </div>
    </div>
  );
};

export default GameMenu;
