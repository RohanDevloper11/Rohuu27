import React from 'react';
import { Heart, ArrowRight, Flower2 } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface LoveLetterSectionProps {
  girlfriendName: string;
  senderName: string;
  letterTitle: string;
  letterGreeting: string;
  letterParagraphs: string[];
  letterSignOff: string;
  onNextSection: () => void;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({
  girlfriendName,
  senderName,
  letterGreeting,
  letterParagraphs,
  letterSignOff,
  onNextSection
}) => {
  return (
    <section id="letter" className="min-h-[90vh] flex flex-col items-center justify-center py-16 px-4 text-center relative z-10">
      
      {/* Top script tag */}
      <span className="font-cursive text-2xl text-purple-700/80 mb-2">
        a letter for {girlfriendName}
      </span>

      {/* Main Letter Card */}
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-200/60 border border-purple-100 text-left relative overflow-hidden my-4 group">
        
        {/* Decorative corner flowers */}
        <Flower2 className="absolute top-4 left-4 w-5 h-5 text-purple-300 opacity-60" />
        <Flower2 className="absolute top-4 right-4 w-5 h-5 text-pink-300 opacity-60" />

        {/* Badge Header */}
        <div className="text-center mb-4">
          <span className="text-[11px] font-bold tracking-widest uppercase text-purple-600 inline-flex items-center gap-1.5">
            <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
            <span>A LETTER FOR {girlfriendName.toUpperCase()}</span>
            <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
          </span>

          {/* Greeting */}
          <h2 className="font-cursive text-4xl sm:text-5xl font-bold text-slate-800 mt-2 mb-3 text-center">
            {letterGreeting || `${girlfriendName}, my love,`}
          </h2>

          {/* Dashed Line Divider */}
          <div className="flex items-center justify-center gap-2 text-pink-300 my-4 opacity-70">
            <span className="text-xs">🌸</span>
            <div className="w-48 border-b border-dashed border-pink-300" />
            <span className="text-xs">🌸</span>
          </div>
        </div>

        {/* Letter Paragraph 1 */}
        {letterParagraphs.length > 0 && (
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-medium">
            {letterParagraphs[0]}
          </p>
        )}

        {/* Cute Stickers Row */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="w-20 h-20 rounded-2xl bg-pink-50 border border-pink-200 p-2 flex flex-col items-center justify-center shadow-sm transform -rotate-3 hover:rotate-0 transition-transform">
            <span className="text-3xl">🐶🌺</span>
            <span className="text-[9px] font-bold text-pink-600 mt-1">for you</span>
          </div>

          <div className="w-20 h-20 rounded-2xl bg-purple-50 border border-purple-200 p-2 flex flex-col items-center justify-center shadow-sm transform rotate-2 hover:rotate-0 transition-transform">
            <span className="text-3xl">🐱💕</span>
            <span className="text-[9px] font-bold text-purple-600 mt-1">hug me</span>
          </div>

          <div className="w-20 h-20 rounded-2xl bg-pink-50 border border-pink-200 p-2 flex flex-col items-center justify-center shadow-sm transform -rotate-2 hover:rotate-0 transition-transform">
            <span className="text-3xl">💐🌷</span>
            <span className="text-[9px] font-bold text-pink-600 mt-1">i love you</span>
          </div>
        </div>

        {/* Remaining Paragraphs */}
        {letterParagraphs.slice(1).map((para, idx) => (
          <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed mb-5 font-medium">
            {para}
          </p>
        ))}

        {/* Bottom Divider */}
        <div className="flex items-center justify-center gap-2 text-pink-300 my-6 opacity-60">
          <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
          <div className="w-full border-b border-dashed border-pink-300" />
        </div>

        {/* Sign-Off */}
        <div className="mt-4 pt-2">
          <p className="font-cursive text-3xl text-purple-800">
            {letterSignOff || 'yours, always,'}
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">
            — {senderName || 'YOUR PERSON'}
          </p>
        </div>

      </div>

      {/* Up Next Navigation */}
      <div className="mt-14 flex flex-col items-center gap-3">
        <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400">
          UP NEXT ↓
        </span>
        <span className="font-cursive text-xl text-purple-700/90">
          next — one small secret →
        </span>
        <button
          onClick={() => {
            audioEngine.playHeartPop();
            onNextSection();
          }}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-300 hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer mt-1"
        >
          <span>ONE SMALL SECRET</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};
