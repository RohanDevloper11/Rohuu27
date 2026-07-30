import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const handleOpen = () => {
    audioEngine.playCelebrationChime();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm sm:max-w-md bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-200 text-center overflow-hidden"
          >
            {/* Background floating glow circles */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-200/50 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-200/50 rounded-full blur-2xl pointer-events-none" />

            {/* Close X Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold px-3.5 py-1 rounded-full mb-4 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Special Message 💌</span>
            </div>

            {/* Cute Icon / Emoji Header */}
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-pink-100 via-rose-100 to-purple-100 flex items-center justify-center border border-pink-200 shadow-inner">
              <span className="text-4xl animate-bounce">🥰💖</span>
            </div>

            {/* Title / Dedicated Header */}
            <h2 className="font-cursive text-2xl sm:text-3xl text-pink-600 font-bold mb-3">
              Made by Rohan for you Vanshika jii 💕
            </h2>

            {/* Love Note Message */}
            <p className="text-slate-700 font-medium text-base sm:text-lg leading-relaxed mb-6 bg-pink-50/70 p-4 rounded-2xl border border-pink-100/80">
              I love you so much kuchuuu and Happy Girlfriend Day bubu my cutest babygirl 🥰❤️
            </p>

            {/* Action Button */}
            <button
              onClick={handleOpen}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-bold text-base shadow-lg shadow-pink-300/80 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-current animate-pulse text-white" />
              <span>Open My Surprise 💖</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
