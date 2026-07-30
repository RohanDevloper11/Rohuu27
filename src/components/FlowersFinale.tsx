import React, { useState } from 'react';
import { Heart, Sparkles, Share2, Check, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioSynth';
import catKissGif from '../assets/images/cat-kiss.gif';
import bubuDuduGif from '../assets/images/bubu-dudu-kisses.gif';

interface FlowersFinaleProps {
  girlfriendName: string;
  senderName: string;
  finaleTitle: string;
  finaleSubtitle: string;
  finaleNote: string;
}

export const FlowersFinale: React.FC<FlowersFinaleProps> = ({
  girlfriendName,
  senderName,
  finaleTitle,
  finaleSubtitle,
  finaleNote
}) => {
  const [claimed, setClaimed] = useState(false);
  const [isKissRevealed, setIsKissRevealed] = useState(false);

  const handleClaim = () => {
    audioEngine.playCelebrationChime();
    setClaimed(true);

    // Multi-stage confetti celebration
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#f43f5e', '#a855f7', '#fb7185', '#d8b4fe']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#f43f5e', '#a855f7', '#fb7185', '#d8b4fe']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section id="finale" className="min-h-[85vh] flex flex-col items-center justify-center py-16 px-4 text-center relative z-10">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-pink-200 shadow-sm mb-6">
        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
        <span className="text-[11px] font-bold tracking-widest text-pink-600 uppercase">
          MADE FOR VANSHIKA BY ROHAN ♡
        </span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-slate-900 max-w-xl mx-auto leading-tight mb-2">
        {finaleTitle || `here, these are for you, ${girlfriendName} 🌷`}
      </h2>

      {/* Subtitle */}
      <p className="font-cursive text-2xl text-purple-700/90 max-w-md mx-auto mb-8">
        {finaleSubtitle || 'just between us two 🙈'}
      </p>

      {/* Doodle Artwork Graphic Box */}
      <div 
        onClick={handleClaim}
        className="relative my-4 group cursor-pointer"
      >
        <div className="w-full max-w-[290px] sm:max-w-sm h-64 sm:h-72 rounded-3xl bg-white/90 backdrop-blur-md border border-pink-200 shadow-2xl shadow-purple-200/60 p-5 flex flex-col items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-105">
          
          {/* Heart burst background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-100 to-purple-100 opacity-60 group-hover:opacity-100 transition-opacity" />

          {claimed ? (
            <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-md border-2 border-pink-300 bg-pink-50 p-1 mb-2">
                <img 
                  src={bubuDuduGif} 
                  alt="Bubu Dudu kisses" 
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://media.tenor.com/gU58n92eH4AAAAAi/peach-goma.gif";
                  }}
                />
              </div>
              <span className="font-cursive text-2xl text-pink-600 font-bold">
                Tulips & Kisses Accepted! 🌷💖
              </span>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl sm:text-6xl animate-bounce">🙈</span>
                <div className="text-6xl sm:text-7xl animate-float filter drop-shadow-md">
                  💐
                </div>
                <span className="text-5xl sm:text-6xl animate-bounce">😳</span>
              </div>
              <span className="font-cursive text-2xl text-pink-600 font-bold text-center">
                Tap to receive your tulips, Vanshika 🌷
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Romantic Note */}
      <div className="max-w-md mx-auto mt-6 text-slate-600 text-xs sm:text-sm font-medium leading-relaxed px-4">
        <p>
          don't say anything — just take them, keep that beautiful smile, and remember how much Rohan loves you 😚
        </p>
        <p className="font-cursive text-2xl text-purple-800 mt-2 font-bold">
          — yours, always & forever, Rohan ♡
        </p>
      </div>

      {/* Kissing Cat GIF & MUAH Section */}
      <div className="mt-8 flex flex-col items-center justify-center relative">
        <div 
          onClick={() => {
            setIsKissRevealed(true);
            audioEngine.playKissSound();
            confetti({
              particleCount: 25,
              spread: 70,
              origin: { y: 0.8 },
              colors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af']
            });
          }}
          className="group cursor-pointer relative flex flex-col items-center p-4 rounded-3xl bg-white/90 backdrop-blur-sm border border-pink-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          {/* Floating Muah Badge */}
          <div className="absolute -top-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs px-3.5 py-1 rounded-full shadow-md animate-pulse flex items-center gap-1.5 z-10">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>{isKissRevealed ? 'MUAH! 😘' : 'SECRET KISS 💋'}</span>
          </div>

          {!isKissRevealed ? (
            /* Locked / Unrevealed state */
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100 border-2 border-dashed border-pink-300 shadow-inner p-4 text-center">
              <div className="text-5xl sm:text-6xl animate-bounce mb-2">
                💋
              </div>
              <span className="text-xs sm:text-sm font-bold text-pink-600">
                Tap to reveal your big kiss!
              </span>
            </div>
          ) : (
            /* Revealed Cat Kiss GIF state */
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden relative flex items-center justify-center bg-pink-50 p-1 border-2 border-pink-300 shadow-inner animate-in fade-in zoom-in duration-300">
              <img 
                src={catKissGif} 
                alt="Cat kiss - Muah!"
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://media.tenor.com/83p1sB6-ZqgAAAAd/cat-kiss.gif";
                }}
              />
            </div>
          )}

          <span className="text-xs font-bold text-pink-600 font-cursive text-base sm:text-lg mt-2 group-hover:scale-105 transition-transform text-center">
            {isKissRevealed 
              ? 'Big kiss from Rohan! 💋 (Tap again!)' 
              : 'Tap for a big kiss from Rohan! 💋'}
          </span>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-6 flex items-center justify-center">
        <button
          onClick={handleClaim}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-200 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <span>CELEBRATE OUR LOVE 🌷</span>
        </button>
      </div>

      <footer className="mt-16 text-[11px] font-semibold text-purple-400 tracking-widest uppercase">
        HAPPY GIRLFRIEND DAY • VANSHIKA & ROHAN ♡
      </footer>

    </section>
  );
};
