import React, { useState } from 'react';
import { PageView } from '../types';
import { ArrowLeft, Check, Send, ChevronRight } from 'lucide-react';

interface GameProps {
  onNavigate: (page: PageView) => void;
}

const Game: React.FC<GameProps> = ({ onNavigate }) => {
  // Steps: 0 = Pledge Q, 1 = Name Q, 2 = Sustainability Q, 3 = Result Reveal, 4 = Final Thank You
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [tempName, setTempName] = useState('');
  
  // Controls visibility of the question card for transitions
  const [showCard, setShowCard] = useState(true);

  // Helper to manage the flow: Hide Card -> Update State -> Wait -> Show Card
  const advanceStep = (nextStep: number, beforeUpdate?: () => void) => {
    // 1. Start fading out the card
    setShowCard(false);

    // 2. Update the world state immediately (so background animations trigger)
    // We update the state immediately so the user sees the effect (green turtle, etc.)
    // while the card is disappearing.
    if (beforeUpdate) beforeUpdate();
    setStep(nextStep);

    // 3. Wait for 2.5 seconds to let user see the ocean, then fade card back in
    setTimeout(() => {
      setShowCard(true);
    }, 2500);
  };

  // Handlers
  const handlePledgeYes = () => {
    advanceStep(1);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      advanceStep(2, () => setUserName(tempName));
    }
  };

  const handleSustainabilityYes = () => {
    advanceStep(3);
  };

  const handleContinueToFinal = () => {
    advanceStep(4);
  };

  // Visual State Helpers
  const isTurtleColored = step >= 1;
  const showNameTag = step >= 2;
  const isTrashCleaned = step >= 3;
  const isOceanClean = step >= 3;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-slate-900 p-4 font-sans">
      
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <button 
          onClick={() => onNavigate('pledge')} 
          className="text-slate-400 hover:text-white flex items-center transition-colors font-bold uppercase tracking-widest text-sm"
        >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pledge
        </button>
      </div>

      {/* Main Interactive Container */}
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/40 border border-slate-800 group">
        
        {/* === SCENE LAYER === */}
        <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
          
          {/* Background: Dynamic Ocean Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-2000 ease-in-out
            ${isOceanClean 
              ? 'from-blue-500 via-blue-700 to-slate-800' // Lighter, cleaner blue
              : 'from-blue-950 via-slate-950 to-black'    // Dark, polluted
            }
          `}></div>
          
          {/* Animated Water Noise Overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

          {/* === NEW BACKGROUND AMBIENCE === */}

          {/* Bubbles / Suspended Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div 
                key={`bubble-${i}`}
                className="absolute rounded-full bg-white/5"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  animation: `float-slow ${Math.random() * 10 + 5}s ease-in-out infinite`,
                  animationDelay: `-${Math.random() * 10}s`
                }}
              />
            ))}
          </div>

          {/* Distant Schools of Fish (Blurred) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className="absolute top-1/3 left-[5%] opacity-10 text-xs text-slate-300 animate-swim-slow blur-[1px]">
                🐟🐟 <br/> 🐟🐟🐟
             </div>
             <div className="absolute bottom-1/3 right-[5%] opacity-10 text-xs text-slate-300 animate-swim-medium scale-x-[-1] blur-[1px]">
                🐟🐟🐟 <br/> 🐟🐟
             </div>
             <div className="absolute top-2/3 left-[20%] opacity-5 text-sm text-slate-400 animate-swim-fast blur-[2px]">
                🐟 <br/> 🐟🐟
             </div>
          </div>

          {/* Distant Floating Debris (Blurred background waste) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 blur-[2px]">
             <div className="absolute top-[10%] left-[80%] text-2xl animate-float-slow delay-700 grayscale rotate-45">👕</div>
             <div className="absolute bottom-[20%] right-[40%] text-xl animate-float-medium delay-1000 grayscale rotate-12">🧦</div>
             <div className="absolute top-[60%] left-[5%] text-2xl animate-float-fast delay-500 grayscale -rotate-12">👟</div>
          </div>

          {/* --- Floating Fast Fashion Waste (Foreground) --- */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             {/* This shirt DISAPPEARS at step 3 - Moved down to center-left */}
             <div className={`absolute top-1/2 left-1/4 text-4xl animate-float-slow transition-all duration-1000 
                ${isTrashCleaned ? 'opacity-0 scale-0' : 'opacity-60 brightness-50 grayscale rotate-12'}`}>
                👕
             </div>
             
             {/* Other trash remains (showing partial progress) */}
             <div className="absolute top-2/3 left-1/3 text-3xl animate-float-medium opacity-50 brightness-50 grayscale -rotate-45">👖</div>
             <div className="absolute top-1/2 right-1/4 text-5xl animate-float-fast opacity-70 brightness-50 grayscale rotate-180">👗</div>
             <div className="absolute bottom-10 left-10 text-4xl animate-float-slow opacity-60 brightness-50 grayscale rotate-90">👚</div>
             <div className="absolute top-1/3 right-10 text-3xl animate-float-medium opacity-50 brightness-50 grayscale -rotate-12">🧣</div>
          </div>

          {/* --- Marine Animals --- */}
          <div className="absolute inset-0 pointer-events-none">
            
            {/* --- HERO TURTLE --- */}
            {/* TRANSFORMS based on Step 1 - Moved down to prevent UI overlap */}
            <div className="absolute top-1/2 left-20 z-10 transition-all duration-1000 ease-out">
                {/* Name Tag */}
                {showNameTag && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-blue-900 shadow-lg animate-in fade-in slide-in-from-bottom-2 whitespace-nowrap">
                        {userName}
                    </div>
                )}
                
                {/* The Turtle Emoji */}
                <div className={`text-7xl animate-swim-slow transition-all duration-1000 
                    ${isTurtleColored 
                        ? 'grayscale-0 brightness-110 drop-shadow-[0_0_30px_rgba(34,197,94,0.6)] scale-110' 
                        : 'grayscale brightness-50 blur-[1px]'
                    }
                `}>
                    🐢
                </div>
            </div>

            {/* Other animals (remain sad/grey for contrast) */}
            {/* Moved Dolphin down from top-1/4 to top-2/3 to clear top UI */}
            <div className="absolute top-2/3 right-20 text-6xl animate-swim-medium grayscale brightness-50 opacity-60 scale-x-[-1]">🐬</div>
            <div className="absolute bottom-10 left-1/2 text-5xl animate-bounce-slow grayscale brightness-50 opacity-60">🦀</div>
            <div className="absolute bottom-20 right-12 text-6xl animate-pulse-slow grayscale brightness-50 opacity-60">🐙</div>
            {/* Moved Fish from top-1/2 to bottom-1/3 */}
            <div className="absolute bottom-1/3 left-1/3 text-4xl animate-swim-fast grayscale brightness-50 opacity-50">🐟</div>
          </div>

        </div>

        {/* === UI INTERACTION LAYER === */}
        <div className="absolute inset-0 flex items-start justify-center pt-8 px-4 z-20 pointer-events-none">
          
          {/* Card Container */}
          {/* Added transition classes controlled by `showCard` state */}
          <div className={`
             pointer-events-auto bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-lg w-full border border-white/50 
             transition-all duration-1000 ease-in-out transform
             ${showCard ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95 pointer-events-none'}
          `}>
            
            {/* STEP 0: Pledge Question */}
            {step === 0 && (
                <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-slate-800">Welcome to the Ocean.</h3>
                    <p className="text-slate-600">The water is dark and lifeless due to waste. Let's see if we can change that.</p>
                    <div className="h-px bg-slate-200 w-full my-4"></div>
                    <p className="text-lg font-medium text-blue-900">Did you sign the #ReDress pledge?</p>
                    <button 
                        onClick={handlePledgeYes}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                    >
                        <Check size={20} /> Yes, I did!
                    </button>
                </div>
            )}

            {/* STEP 1: Name Input */}
            {step === 1 && (
                <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-green-600">Look! The turtle is healing!</h3>
                    <p className="text-slate-600">Your commitment brings life back to the ocean.</p>
                    <div className="h-px bg-slate-200 w-full my-4"></div>
                    <p className="text-lg font-medium text-blue-900">What is your name?</p>
                    <form onSubmit={handleNameSubmit} className="flex gap-2">
                        <input 
                            type="text" 
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            placeholder="Enter your name..."
                            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                            autoFocus={showCard} // Only autofocus when card is visible
                        />
                        <button 
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!tempName.trim()}
                        >
                            <Send size={24} />
                        </button>
                    </form>
                </div>
            )}

            {/* STEP 2: Sustainability Question */}
            {step === 2 && (
                <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-blue-600">Hi, {userName}!</h3>
                    <p className="text-slate-600">You are now part of this ecosystem.</p>
                    <div className="h-px bg-slate-200 w-full my-4"></div>
                    <p className="text-lg font-medium text-blue-900 leading-tight">
                        Did you think about the sustainability of the clothes you put on today?
                    </p>
                    <div className="flex gap-3 pt-2">
                        <button 
                            onClick={handleSustainabilityYes}
                            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:scale-105"
                        >
                            Yes
                        </button>
                        <button 
                             onClick={() => alert("That's okay! Start thinking about it tomorrow!")}
                            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-3 px-4 rounded-xl transition-all"
                        >
                            Not really
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 3: Result Reveal */}
            {step === 3 && (
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-2">
                        <span className="text-3xl">✨</span>
                    </div>
                    <h3 className="text-2xl font-black text-blue-900">Change is Happening!</h3>
                    <p className="text-slate-700 text-lg">
                        Did you see that? <strong className="text-rose-500">A piece of waste disappeared</strong>, and the ocean got brighter.
                    </p>
                    <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                        "Your individual choices ripple out to create waves of change for Ghana and the world."
                    </p>
                    <button 
                        onClick={handleContinueToFinal}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2 mt-2"
                    >
                        Continue <ChevronRight size={20} />
                    </button>
                </div>
            )}

             {/* STEP 4: Final Thank You */}
             {step === 4 && (
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-2">
                        <span className="text-3xl">🌊</span>
                    </div>
                    <h3 className="text-2xl font-black text-blue-900">Thank You!</h3>
                    <p className="text-slate-800 text-lg leading-relaxed">
                        Thank you for saving the ocean today, <strong className="text-blue-600">{userName}</strong>.
                    </p>
                    <p className="text-slate-600">
                        Please come back again tomorrow to see how else you can contribute!
                    </p>
                    <div className="h-px bg-slate-200 w-full my-4"></div>
                    <button 
                        onClick={() => {
                            setStep(0);
                            setUserName('');
                            setTempName('');
                            setShowCard(true);
                        }}
                        className="mt-2 text-slate-400 hover:text-slate-600 text-sm underline underline-offset-4"
                    >
                        Replay Experience
                    </button>
                </div>
            )}

          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(-45deg); }
          50% { transform: translateY(-15px) translateX(10px) rotate(-35deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(180deg); }
          50% { transform: translateY(-10px) rotate(190deg); }
        }
        @keyframes swim-slow {
          0% { transform: translateX(0px); }
          50% { transform: translateX(20px); }
          100% { transform: translateX(0px); }
        }
        @keyframes swim-medium {
          0% { transform: translateX(0px) scaleX(-1); }
          50% { transform: translateX(-30px) scaleX(-1); }
          100% { transform: translateX(0px) scaleX(-1); }
        }
        @keyframes swim-fast {
          0% { transform: translateX(0px); }
          50% { transform: translateX(50px); }
          100% { transform: translateX(0px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-swim-slow { animation: swim-slow 8s ease-in-out infinite; }
        .animate-swim-medium { animation: swim-medium 7s ease-in-out infinite; }
        .animate-swim-fast { animation: swim-fast 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
};

export default Game;