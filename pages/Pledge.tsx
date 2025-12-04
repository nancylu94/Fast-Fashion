import React, { useState } from 'react';
import { PageView, PledgeItem } from '../types';
import { Check, Gamepad2, HeartHandshake } from 'lucide-react';

interface PledgeProps {
  onNavigate: (page: PageView) => void;
}

const PLEDGES: PledgeItem[] = [
  { id: 1, text: "I pledge to buy second-hand first.", icon: "🏷️" },
  { id: 2, text: "I will wear my clothes at least 30 times.", icon: "🔄" },
  { id: 3, text: "I will repair before I replace.", icon: "🧵" },
  { id: 4, text: "I will not treat clothing as disposable.", icon: "🚫" },
  { id: 5, text: "I will support ethical, durable brands.", icon: "🌿" },
  { id: 6, text: "I will wash clothes less to save water & fiber.", icon: "💧" },
  { id: 7, text: "I will donate responsibly, not dump trash.", icon: "📦" },
  { id: 8, text: "I will spread the word about #ReDressTheWorld.", icon: "🗣️" },
];

const Pledge: React.FC<PledgeProps> = ({ onNavigate }) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const togglePledge = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(item => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const allChecked = checkedItems.length === PLEDGES.length;
  const progress = (checkedItems.length / PLEDGES.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6 text-blue-600">
            <HeartHandshake size={32} />
          </div>
          <h1 className="text-4xl font-black text-blue-900 mb-4 uppercase tracking-tight">Make The Pledge</h1>
          <p className="text-slate-600">
            Commit to these 8 simple actions to stop the flow of waste to the Global South.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-slate-200 rounded-full h-4 overflow-hidden border border-slate-300">
          <div 
            className="bg-gradient-to-r from-blue-400 to-rose-400 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Pledges List */}
        <div className="space-y-4 mb-12">
          {PLEDGES.map((pledge) => (
            <div 
              key={pledge.id}
              onClick={() => togglePledge(pledge.id)}
              className={`
                group flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none shadow-sm
                ${checkedItems.includes(pledge.id) 
                  ? 'bg-blue-50 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]' 
                  : 'bg-white border-slate-200 hover:border-blue-200 hover:shadow-md'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 transition-colors
                ${checkedItems.includes(pledge.id)
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'border-slate-300 text-transparent group-hover:border-blue-300'
                }
              `}>
                <Check size={16} strokeWidth={4} />
              </div>
              <div className="flex-1">
                <span className="text-2xl mr-3">{pledge.icon}</span>
                <span className={`font-medium ${checkedItems.includes(pledge.id) ? 'text-blue-900' : 'text-slate-600'}`}>
                  {pledge.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Area */}
        <div className="text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Ready to take action?</h3>
          <p className="text-slate-600 mb-8">
            See the impact of waste in our interactive experience.
          </p>
          
          <button
            onClick={() => onNavigate('game')}
            className={`
              w-full md:w-auto px-8 py-4 rounded-full font-black text-lg flex items-center justify-center mx-auto transition-all duration-300 text-white
              ${allChecked 
                ? 'bg-blue-500 hover:bg-blue-600 scale-110 shadow-lg shadow-blue-500/30' 
                : 'bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/30'
              }
            `}
          >
            <Gamepad2 className="mr-2" />
            {allChecked ? "PLAY OCEAN RESCUE" : "PLAY GAME"}
          </button>
          
          {!allChecked && (
            <p className="text-xs text-slate-500 mt-4">
              (Tip: Completing the pledge turns the button Blue!)
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Pledge;