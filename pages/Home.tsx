import React from 'react';
import { PageView } from '../types';
import { ArrowRight, Trash2, Globe, Shirt } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
        
        {/* Background Image: Aerial view of textile waste on beach */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-blue-900/60 to-slate-900/90 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=2574&auto=format&fit=crop" 
              alt="Aerial view of clothing waste on beach" 
              className="w-full h-full object-cover opacity-80"
            />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-rose-400/30 bg-rose-500/10 backdrop-blur-sm text-rose-300 font-bold tracking-widest text-xs uppercase">
            Fast Fashion Waste
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-white drop-shadow-2xl">
            GARMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">GRAVEYARD</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto mb-12 leading-relaxed font-medium drop-shadow-md">
            Every week, <strong>15 million</strong> used garments arrive in Accra. 
            <br className="hidden md:block" />
            Most of it ends up here: choking the ocean and burying the beaches.
          </p>
          <button
            onClick={() => onNavigate('pledge')}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-rose-600 font-lg rounded-full hover:bg-rose-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600 focus:ring-offset-slate-900 shadow-[0_0_20px_rgba(225,29,72,0.4)]"
          >
            <span>#ReDressGG</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">The Real Cost of Fast Fashion</h2>
            <div className="h-1 w-20 bg-rose-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:border-rose-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Shirt className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-800">Overproduction</h3>
              <p className="text-slate-600 leading-relaxed">
                Fashion brands produce twice the amount of clothes today compared to 2000. Most are worn less than 10 times.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:border-rose-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-rose-500 transition-colors duration-300">
                <Trash2 className="w-7 h-7 text-rose-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-800">Waste Colonialism</h3>
              <p className="text-slate-600 leading-relaxed">
                The Global North exports its textile waste to countries like Ghana, overwhelming local ecosystems and markets.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:border-rose-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-500 transition-colors duration-300">
                <Globe className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-800">Environmental Ruin</h3>
              <p className="text-slate-600 leading-relaxed">
                Synthetic fibers take hundreds of years to decompose, releasing microplastics into our food chain and oceans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-blue-900 px-4 border-t border-blue-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <blockquote className="text-3xl md:text-4xl font-serif italic text-white mb-8 leading-tight">
            "We are not a trash can for the world's excess. Our beaches are drowning in clothes nobody wants."
          </blockquote>
          <cite className="text-rose-400 font-bold not-italic tracking-widest uppercase text-sm">
            — Kantamanto Market Retailer
          </cite>
        </div>
      </section>
    </div>
  );
};

export default Home;