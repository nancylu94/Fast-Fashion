import React, { useState } from 'react';
import Home from './pages/Home';
import Pledge from './pages/Pledge';
import Game from './pages/Game';
import { PageView } from './types';
import { AlertTriangle, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simple navigation handler
  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 font-black text-xl tracking-tighter cursor-pointer text-blue-700"
            onClick={() => navigateTo('home')}
          >
            <AlertTriangle className="w-6 h-6 text-rose-500" />
            <span>#ReDress<span className="text-blue-900">TheWorld</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 font-bold text-sm uppercase tracking-widest text-slate-500">
            <button 
              onClick={() => navigateTo('home')}
              className={`hover:text-rose-500 transition-colors ${currentPage === 'home' ? 'text-blue-600' : ''}`}
            >
              The Crisis
            </button>
            <button 
              onClick={() => navigateTo('pledge')}
              className={`hover:text-rose-500 transition-colors ${currentPage === 'pledge' ? 'text-blue-600' : ''}`}
            >
              Take Action
            </button>
            <button 
              onClick={() => navigateTo('game')}
              className={`hover:text-rose-500 transition-colors ${currentPage === 'game' ? 'text-blue-600' : ''}`}
            >
              Ocean Rescue
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top-2 shadow-lg">
            <div className="flex flex-col p-4 gap-4 font-bold uppercase tracking-widest text-slate-600">
              <button onClick={() => navigateTo('home')} className="text-left py-2 hover:text-rose-500">The Crisis</button>
              <button onClick={() => navigateTo('pledge')} className="text-left py-2 hover:text-rose-500">Take Action</button>
              <button onClick={() => navigateTo('game')} className="text-left py-2 hover:text-rose-500">Ocean Rescue</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && <Home onNavigate={navigateTo} />}
        {currentPage === 'pledge' && <Pledge onNavigate={navigateTo} />}
        {currentPage === 'game' && <Game onNavigate={navigateTo} />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-8 px-4 text-center text-slate-500 text-sm">
        <p className="mb-2">Campaign against textile waste.</p>
        <p>&copy; {new Date().getFullYear()} #ReDressTheWorld. Ghana / Global South.</p>
      </footer>
    </div>
  );
};

export default App;