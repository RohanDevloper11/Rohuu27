import React, { useRef, useEffect, useState } from 'react';
import { Heart, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioSynth';

interface ScratchCardSectionProps {
  girlfriendName: string;
  scratchTitle: string;
  scratchSubtitle: string;
  scratchSecret: string;
  onNextSection: () => void;
}

export const ScratchCardSection: React.FC<ScratchCardSectionProps> = ({
  girlfriendName,
  scratchTitle,
  scratchSubtitle,
  scratchSecret,
  onNextSection
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match parent box size accurately
    const parent = canvas.parentElement;
    const width = parent ? parent.clientWidth : (canvas.offsetWidth || 360);
    const height = parent ? parent.clientHeight : (canvas.offsetHeight || 220);
    canvas.width = width;
    canvas.height = height;

    // Fill gradient overlay
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fbcfe8');
    grad.addColorStop(0.5, '#e9d5ff');
    grad.addColorStop(1, '#f472b6');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add romantic text overlay
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(219, 39, 119, 0.4)';
    ctx.shadowBlur = 6;
    ctx.fillText('scratch me softly ♡', width / 2, height / 2);

    setIsScratched(false);
  };

  useEffect(() => {
    // Delay slightly to ensure card layout/dimensions are calculated
    const timer = setTimeout(() => {
      initCanvas();
    }, 50);
    return () => clearTimeout(timer);
  }, [scratchSecret]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkScratchProgress();
  };

  const checkScratchProgress = () => {
    if (isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;

    if (percentage > 45) {
      setIsScratched(true);
      audioEngine.playCelebrationChime();
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#a855f7', '#f472b6']
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawing) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDrawing(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDrawing && e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <section id="scratch" className="min-h-[85vh] flex flex-col items-center justify-center py-16 px-4 text-center relative z-10">
      
      {/* Top script tag */}
      <span className="font-cursive text-2xl text-purple-700/80 mb-2">
        just between us
      </span>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-pink-200 shadow-sm mb-4">
        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
        <span className="text-[11px] font-bold tracking-widest text-pink-600 uppercase">
          A SMALL SECRET
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-slate-900 max-w-xl mx-auto leading-tight mb-2">
        {scratchTitle}
      </h2>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-8 font-medium">
        {scratchSubtitle}
      </p>

      {/* Scratch Off Card Box */}
      <div className="relative w-full max-w-lg min-h-[16rem] rounded-3xl bg-white border border-purple-100 shadow-xl shadow-purple-200/50 p-6 sm:p-8 flex flex-col items-center justify-center text-center my-2 overflow-hidden select-none">
        
        {/* Underlying Secret Message */}
        <div className="relative z-0 px-2 sm:px-4 py-2">
          <span className="text-3xl mb-2 block animate-bounce">💖✨</span>
          <p className="font-serif-display font-bold text-base sm:text-xl text-purple-950 leading-relaxed max-w-md mx-auto">
            "{scratchSecret}"
          </p>
          <p className="font-cursive text-xl text-pink-600 mt-3 font-semibold">
            for {girlfriendName} ♡
          </p>
        </div>

        {/* Scratch Canvas Overlay */}
        {!isScratched && (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="absolute inset-0 w-full h-full rounded-3xl cursor-pointer z-10 touch-none transition-opacity duration-500"
          />
        )}

        {/* Reset button if scratched */}
        {isScratched && (
          <button
            onClick={initCanvas}
            title="Scratch again"
            className="absolute bottom-2 right-3 p-1.5 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs flex items-center gap-1 z-20"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase">Reset</span>
          </button>
        )}
      </div>

      {/* Subquote */}
      <p className="font-cursive text-2xl text-purple-800 mt-6">
        if you smiled — that was the whole point ♡
      </p>

      {/* Up Next Navigation */}
      <div className="mt-14 flex flex-col items-center gap-3">
        <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400">
          UP NEXT ↓
        </span>
        <span className="font-cursive text-xl text-purple-700/90">
          next — one last little thing →
        </span>
        <button
          onClick={() => {
            audioEngine.playHeartPop();
            onNextSection();
          }}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-300 hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer mt-1"
        >
          <span>ONE LAST THING</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};
