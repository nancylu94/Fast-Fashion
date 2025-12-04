import React, { useState } from 'react';
import { PageView } from '../types';
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface GameProps {
  onNavigate: (page: PageView) => void;
}

const Game: React.FC<GameProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-slate-900 p-4">
      
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <button 
          onClick={() => onNavigate('pledge')} 
          className="text-slate-400 hover:text-white flex items-center transition-colors font-bold uppercase tracking-widest text-sm"
        >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pledge
        </button>
      </div>

      {/* Video Player Container */}
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/40 border border-slate-800 group">
        
        {/* THE "VIDEO" SCENE (CSS Animation) */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-60'}`}>
          
          {/* Background: Murky Ocean Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-slate-900 to-black opacity-90"></div>
          
          {/* Animated Water Overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

          {/* --- Floating Fast Fashion Waste --- */}
          {/* Using emojis for cartoon style, heavily filtered */}
          <div className="absolute inset-0 overflow-hidden">
             {/* Keyframes for floating are defined in the style tag below */}
             <div className="absolute top-1/4 left-1/4 text-4xl animate-float-slow opacity-60 brightness-50 grayscale rotate-12">👕</div>
             <div className="absolute top-2/3 left-1/3 text-3xl animate-float-medium opacity-50 brightness-50 grayscale -rotate-45">👖</div>
             <div className="absolute top-1/2 right-1/4 text-5xl animate-float-fast opacity-70 brightness-50 grayscale rotate-180">👗</div>
             <div className="absolute bottom-10 left-10 text-4xl animate-float-slow opacity-60 brightness-50 grayscale rotate-90">👚</div>
             <div className="absolute top-10 right-10 text-3xl animate-float-medium opacity-50 brightness-50 grayscale -rotate-12">🧣</div>
             <div className="absolute bottom-1/3 right-1/3 text-4xl animate-float-fast opacity-60 brightness-50 grayscale rotate-45">👟</div>
          </div>

          {/* --- Sad Marine Animals --- */}
          {/* Filtered to look grey/sad/polluted */}
          <div className="absolute inset-0">
            {/* Green Sea Turtle */}
            <div className="absolute top-1/3 left-20 text-6xl animate-swim-slow grayscale brightness-75 drop-shadow-lg">
                🐢
            </div>

            {/* Bottlenose Dolphin */}
            <div className="absolute top-1/4 right-20 text-6xl animate-swim-medium grayscale brightness-75 scale-x-[-1] drop-shadow-lg">
                🐬
            </div>

            {/* Blue Swimming Crab (Bottom) */}
            <div className="absolute bottom-10 left-1/2 text-5xl animate-bounce-slow grayscale brightness-75 drop-shadow-lg">
                🦀
            </div>

            {/* Octopus (Hiding in corner) */}
            <div className="absolute bottom-20 right-12 text-6xl animate-pulse-slow grayscale brightness-75 drop-shadow-lg">
                🐙
            </div>

            {/* Sardinella Fish (School) */}
            <div className="absolute top-1/2 left-1/3 text-4xl animate-swim-fast grayscale brightness-75 opacity-80">
                🐟
            </div>
             <div className="absolute top-[55%] left-[36%] text-3xl animate-swim-fast grayscale brightness-75 opacity-80 delay-75">
                🐟
            </div>

            {/* Manta Ray (Simulated with shark emoji as ray emoji is limited, or generic shape) */}
            <div className="absolute top-2/3 right-1/3 text-8xl animate-float-slow grayscale brightness-50 opacity-60 blur-sm rotate-45">
                🦈
            </div>
          </div>

          {/* Overlay Text (Title) */}
          {!isPlaying && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">
                  OCEANS OF <span className="text-rose-500">CHANGE</span>
                </h1>
                <p className="text-slate-400 font-bold tracking-widest uppercase text-sm mb-8">A Short Film from Ghana</p>
                
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white rounded-full p-6 transition-transform hover:scale-110 shadow-lg shadow-rose-500/40"
                >
                  <Play size={48} fill="currentColor" className="ml-2" />
                </button>
             </div>
          )}

          {/* Controls Overlay (When Playing) */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsPlaying(false)} className="text-white hover:text-rose-500 transition-colors">
                        <Pause size={24} fill="currentColor" />
                    </button>
                    <div className="h-1 w-64 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 w-1/3 animate-pulse"></div>
                    </div>
                    <span className="text-xs text-slate-300 font-mono">00:34 / 02:15</span>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-blue-400">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <div className="px-2 py-1 bg-white/10 rounded text-xs text-white font-bold uppercase border border-white/20">
                        HD
                    </div>
                </div>
            </div>
          )}

        </div>
      </div>

      <div className="mt-8 text-center max-w-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">The Reality Beneath the Surface</h2>
        <p className="text-slate-400 leading-relaxed">
          While this is an animation, the scene is real. The beaches of Accra are covered in "dead white man's clothes" (Obroni Wawu), choking marine life and destroying local ecosystems.
        </p>
      </div>

      {/* CSS Styles for Animations */}
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