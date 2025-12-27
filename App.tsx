
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Problem, GameStatus } from './types';
import { generateProblem } from './utils/mathGenerator';
import ObjectVisual from './components/ObjectVisual';
import GameMenu from './components/GameMenu';
import { Trophy, ArrowRight, RefreshCw, X, CheckCircle2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<GameStatus>(GameStatus.MENU);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [aiCheer, setAiCheer] = useState<string>('');
  
  const inputRef = useRef<HTMLInputElement>(null);

  const nextLevel = useCallback((currentScore: number) => {
    const p = generateProblem(currentScore);
    setCurrentProblem(p);
    setUserInput('');
    setFeedback(null);
    setAiCheer('');
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const startNewGame = () => {
    setScore(0);
    setStreak(0);
    setStatus(GameStatus.PLAYING);
    nextLevel(0);
  };

  const getEncouragement = async (isCorrect: boolean) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = isCorrect 
        ? "Give a short, super enthusiastic 3-5 word encouragement for a child who just got a math problem right."
        : "Give a short, gentle 3-5 word encouragement for a child to try a math problem again.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiCheer(response.text || '');
    } catch (e) {
      setAiCheer(isCorrect ? "Great job!" : "Keep trying!");
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentProblem || userInput === '') return;

    const userVal = parseInt(userInput);
    if (userVal === currentProblem.answer) {
      const newScore = score + 10;
      setFeedback({ type: 'success', message: 'Correct!' });
      setScore(newScore);
      setStreak(s => s + 1);
      getEncouragement(true);
      setTimeout(() => {
        nextLevel(newScore);
      }, 2000);
    } else {
      setFeedback({ type: 'error', message: 'Not quite! Try again.' });
      setStreak(0);
      getEncouragement(false);
      setUserInput('');
    }
  };

  const handleKeyPress = (num: number) => {
    setUserInput(prev => (prev.length < 2 ? prev + num : prev));
  };

  const handleClear = () => setUserInput('');

  return (
    <div className="min-h-screen bg-[#f0f4f8] p-4 md:p-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1.5 rounded-xl shadow-sm">
            <Trophy className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-xl sm:text-2xl font-fun text-indigo-900">{score}</span>
        </div>
        
        <div className="flex-1 flex justify-center">
           {status === GameStatus.PLAYING && (
              <div className="flex gap-0.5">
                {Array.from({ length: Math.min(streak, 5) }).map((_, i) => (
                  <span key={i} className="text-xl sm:text-2xl animate-bounce">🔥</span>
                ))}
              </div>
           )}
        </div>

        <button 
          onClick={() => setStatus(GameStatus.MENU)}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <X size={28} className="sm:w-8 sm:h-8" />
        </button>
      </div>

      <main className="w-full max-w-2xl flex-1 flex flex-col justify-center">
        {status === GameStatus.MENU ? (
          <GameMenu onStart={startNewGame} />
        ) : (
          <div className="flex flex-col items-center w-full">
            {/* Main Problem Card */}
            {currentProblem && (
              <div className={`w-full ${currentProblem.bgColor} p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] card-shadow border-4 sm:border-8 border-white flex flex-col items-center justify-center transition-all duration-500`}>
                
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-6 sm:mb-10">
                  {/* Left Number */}
                  <span className="text-6xl sm:text-8xl font-fun text-white drop-shadow-md">
                    {currentProblem.num1}
                  </span>

                  {/* Operator */}
                  <span className="text-4xl sm:text-6xl font-fun text-white opacity-80">
                    {currentProblem.operator}
                  </span>

                  {/* Visual Representation */}
                  <div className="p-2 sm:p-4 bg-white/20 rounded-2xl sm:rounded-3xl backdrop-blur-sm border-2 sm:border-4 border-white/40 min-w-[100px] flex items-center justify-center">
                    <ObjectVisual type={currentProblem.objectType} count={currentProblem.num2} />
                  </div>

                  <span className="text-4xl sm:text-6xl font-fun text-white opacity-80">
                    =
                  </span>

                  {/* Answer Input Area */}
                  <div className="relative group">
                    <div className={`w-24 h-24 sm:w-36 sm:h-36 bg-white rounded-2xl sm:rounded-3xl border-4 sm:border-8 ${feedback?.type === 'success' ? 'border-green-400' : 'border-gray-100'} shadow-inner flex items-center justify-center`}>
                      <span className={`text-5xl sm:text-7xl font-fun ${feedback?.type === 'success' ? 'text-green-500' : 'text-indigo-600'}`}>
                        {userInput || '?'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Feedback Area */}
                <div className="h-12 sm:h-16 flex items-center justify-center text-center">
                  {feedback && (
                    <div className={`flex items-center gap-2 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-bold text-lg sm:text-2xl animate-bounce ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5 sm:w-8 sm:h-8" /> : <AlertCircle className="w-5 h-5 sm:w-8 sm:h-8" />}
                      {feedback.message}
                    </div>
                  )}
                  {!feedback && aiCheer && (
                    <div className="text-white font-fun text-lg sm:text-2xl animate-pulse italic">
                      "{aiCheer}"
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Number Pad for Mobile/Tablets */}
            <div className="mt-6 sm:mt-8 grid grid-cols-5 gap-2 sm:gap-3 w-full max-w-sm sm:max-w-md">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
                <button
                  key={n}
                  onClick={() => handleKeyPress(n)}
                  className="bg-white hover:bg-indigo-50 active:bg-indigo-100 text-indigo-600 font-fun text-2xl sm:text-3xl py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-md transition-all active:scale-90 touch-manipulation"
                >
                  {n}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="col-span-2 bg-red-100 hover:bg-red-200 text-red-600 font-fun text-lg sm:text-xl py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center touch-manipulation"
              >
                Clear
              </button>
              <button
                onClick={() => handleSubmit()}
                className="col-span-3 bg-indigo-600 hover:bg-indigo-700 text-white font-fun text-lg sm:text-xl py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 touch-manipulation"
              >
                Check <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Hidden form for physical keyboard users */}
            <form onSubmit={handleSubmit} className="hidden">
                <input 
                  ref={inputRef}
                  type="number" 
                  value={userInput} 
                  onChange={(e) => setUserInput(e.target.value.slice(0, 2))}
                  autoFocus
                />
            </form>
          </div>
        )}
      </main>

      {/* Footer Decoration */}
      <footer className="mt-4 sm:mt-auto py-4 text-gray-400 flex gap-4 text-xs sm:text-sm font-medium">
         <span>Learn with Joy</span>
         <span>•</span>
         <span>Count to 20</span>
      </footer>
    </div>
  );
};

export default App;
