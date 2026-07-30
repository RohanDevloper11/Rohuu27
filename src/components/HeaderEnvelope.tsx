import React, { useState } from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface HeaderEnvelopeProps {
  girlfriendName: string;
  headerBadge: string;
  headerSubtitle: string;
  onOpenNext: () => void;
}

export const HeaderEnvelope: React.FC<HeaderEnvelopeProps> = ({
  girlfriendName,
  headerBadge,
  headerSubtitle,
  onOpenNext
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const initialLetter = girlfriendName ? girlfriendName.charAt(0).toUpperCase() : 'L';

  const handleEnvelopeClick = () => {
    audioEngine.playSwoosh();
    audioEngine.playHeartPop();
    setIsOpen(true);
    setTimeout(() => {
      onOpenNext();
    }, 600);
  };

  return (
    <section id="hero" className="min-h-[85vh] flex flex-col items-center justify-center pt-8 pb-12 px-4 text-center relative z-10">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-purple-200 shadow-sm mb-6">
        <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
        <span className="text-[11px] font-bold tracking-widest text-purple-800 uppercase">
          {headerBadge}
        </span>
      </div>

      {/* Headline: hi, [Name] ♡ */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-bold text-slate-900 tracking-tight mb-4">
        hi, <span className="text-slate-900">{girlfriendName}</span>{' '}
        <span className="text-pink-500 inline-block animate-gentle-pulse">♡</span>
      </h1>

      {/* Subtitle in romantic script */}
      <p className="font-cursive text-2xl sm:text-3xl text-purple-700/90 max-w-xl mx-auto mb-10 leading-relaxed">
        {headerSubtitle}
      </p>

      {/* Interactive Love Envelope Graphic */}
      <div className="relative my-4 group cursor-pointer" onClick={handleEnvelopeClick}>
        
        {/* Soft shadow glow behind envelope */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity"></div>

        {/* Envelope Container */}
        <div className="relative w-64 h-48 sm:w-80 sm:h-56 bg-[#fde8e8] border-2 border-pink-300 rounded-2xl shadow-xl shadow-purple-200/50 flex items-center justify-center transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105">
          
          {/* Envelope Top Flap */}
          <div 
            className={`absolute top-0 inset-x-0 h-1/2 bg-[#fbcfe8] border-b-2 border-pink-300 rounded-t-2xl origin-top transition-transform duration-700 ${
              isOpen ? '[transform:rotateX(180deg)] z-0' : 'z-20'
            }`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
            }}
          />

          {/* Letter inside emerging when opened */}
          <div 
            className={`absolute w-[88%] h-[80%] bg-white rounded-lg shadow-inner border border-pink-100 p-4 transition-all duration-700 flex flex-col items-center justify-center text-center ${
              isOpen ? '-translate-y-12 z-10 opacity-100' : 'translate-y-2 opacity-90 z-10'
            }`}
          >
            <p className="font-cursive text-pink-600 text-xl font-bold">
              For {girlfriendName} ♡
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Tap to unveil your Happy Girlfriend Day gifts
            </p>
          </div>

          {/* Envelope Front V-folds */}
          <div 
            className="absolute inset-0 border-pink-300/80 pointer-events-none z-20 rounded-b-2xl overflow-hidden"
          >
            <div 
              className="absolute bottom-0 left-0 w-1/2 h-full bg-[#fce7f3] border-r border-t border-pink-200"
              style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }}
            />
            <div 
              className="absolute bottom-0 right-0 w-1/2 h-full bg-[#fce7f3] border-l border-t border-pink-200"
              style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
            />
          </div>

          {/* Heart Seal with Girlfriend Initial */}
          <div className="absolute z-30 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full shadow-md shadow-rose-300/60 border-2 border-white flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <div className="relative flex items-center justify-center">
              <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-pink-300/40 fill-pink-300/40" />
              <span className="absolute font-bold text-white text-xl sm:text-2xl drop-shadow">
                {initialLetter}
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Open It Hint */}
      <button 
        onClick={handleEnvelopeClick}
        className="mt-6 text-xs uppercase tracking-widest text-purple-700/80 font-semibold hover:text-purple-900 flex items-center gap-1 group"
      >
        <span>OPEN IT</span>
        <span className="text-pink-500 group-hover:translate-x-0.5 transition-transform">♡</span>
      </button>

      {/* Scroll Down Section Cue */}
      <div className="mt-12 flex flex-col items-center gap-1 text-slate-400 text-xs">
        <span className="font-semibold tracking-wider uppercase text-[10px] text-purple-400">
          FOR {girlfriendName.toUpperCase()} ♡
        </span>
        <ChevronDown className="w-4 h-4 text-purple-400 animate-bounce mt-1" />
      </div>

    </section>
  );
};
