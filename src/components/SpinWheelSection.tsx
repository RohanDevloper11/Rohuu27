import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioSynth';

interface SpinWheelSectionProps {
  girlfriendName: string;
  wheelTitle: string;
  wheelSubtitle: string;
  reasons: string[];
  onNextSection: () => void;
}

const sectorColors = [
  '#fbcfe8', // soft pink
  '#e9d5ff', // soft lavender
  '#fef08a', // soft warm butter yellow
  '#f472b6', // pink accent
  '#c084fc', // purple accent
  '#fed7aa'  // warm peach
];

export const SpinWheelSection: React.FC<SpinWheelSectionProps> = ({
  girlfriendName,
  wheelTitle,
  wheelSubtitle,
  reasons,
  onNextSection
}) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const totalSectors = reasons.length || 6;
  const sectorAngle = 360 / totalSectors;

  const handleSpin = () => {
    if (isSpinning) return;

    audioEngine.playHeartPop();
    setIsSpinning(true);
    setSelectedReason(null);

    // Pick random index
    const randomIndex = Math.floor(Math.random() * totalSectors);
    
    // Calculate rotation so top pointer hits selected segment
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const targetAngle = extraSpins * 360 + (totalSectors - randomIndex) * sectorAngle - sectorAngle / 2;

    // Tick sound intervals during rotation
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      audioEngine.playWheelTick();
      tickCount++;
      if (tickCount >= 18) clearInterval(tickInterval);
    }, 150);

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const wonReason = reasons[randomIndex];
      setSelectedReason(wonReason);
      audioEngine.playCelebrationChime();

      // Fire heart confetti
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#8b5cf6', '#f472b6', '#d8b4fe']
      });
    }, 3500);
  };

  // Calculate clean short sector labels
  const getShortReasonLabel = (reason: string, idx: number): string => {
    const lower = reason.toLowerCase();
    if (lower.includes('home')) return 'Feels Like Home ♡';
    if (lower.includes('laugh') || lower.includes('sound')) return 'Your Laugh 🎵';
    if (lower.includes('magic') || lower.includes('moments')) return 'Ordinary Magic ✨';
    if (lower.includes('better')) return 'Better Man 💖';
    if (lower.includes('always')) return 'Always You ♡';
    if (lower.includes('care') || lower.includes('gentle')) return 'Your Care 🌸';
    if (lower.includes('smile')) return 'Your Smile 😊';
    if (lower.includes('pretty') || lower.includes('beautiful')) return 'So Beautiful 🌷';
    
    // Default fallback truncation
    if (reason.length <= 18) return reason;
    const words = reason.split(' ');
    if (words.length >= 3) return words.slice(0, 3).join(' ') + '...';
    return reason.substring(0, 16) + '...';
  };

  return (
    <section id="wheel" className="min-h-[90vh] flex flex-col items-center justify-center py-16 px-4 text-center relative z-10">
      
      {/* Script Tag */}
      <span className="font-cursive text-2xl text-purple-700/80 mb-2">
        reasons I love you, {girlfriendName}
      </span>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-pink-200 shadow-sm mb-4">
        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
        <span className="text-[11px] font-bold tracking-widest text-pink-600 uppercase">
          SPIN THE WHEEL
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-slate-900 max-w-xl mx-auto leading-tight mb-2">
        {wheelTitle}
      </h2>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-8 font-medium">
        {wheelSubtitle}
      </p>

      {/* Wheel Graphic Container */}
      <div className="relative w-[280px] h-[280px] sm:w-88 sm:h-88 md:w-96 md:h-96 my-4 flex items-center justify-center max-w-[92vw] max-h-[92vw]">
        
        {/* Top Pointer */}
        <div className="absolute -top-4 z-30 transform -translate-x-1/2 left-1/2 filter drop-shadow-lg">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-pink-600" />
        </div>

        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-300 to-purple-300 blur-xl opacity-40 animate-pulse" />

        {/* Rotating Wheel Canvas/SVG */}
        <div 
          className="w-full h-full rounded-full border-4 border-white shadow-2xl shadow-purple-200/80 overflow-hidden relative"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3.5s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {reasons.map((reason, idx) => {
              const startAngle = idx * sectorAngle;
              const endAngle = (idx + 1) * sectorAngle;

              const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
              const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
              const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
              const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

              const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
              const midAngle = (startAngle + sectorAngle / 2) % 360;
              const color = sectorColors[idx % sectorColors.length];
              const shortLabel = getShortReasonLabel(reason, idx);

              // Correct orientation: if on left half (90 to 270 deg), rotate 180 deg so text is always right-side up!
              const isLeftSide = midAngle > 90 && midAngle < 270;
              const textRotation = isLeftSide ? midAngle + 180 : midAngle;
              const textX = isLeftSide ? 22 : 78;
              const textAnchor = isLeftSide ? 'start' : 'end';

              return (
                <g key={idx}>
                  <path d={pathData} fill={color} stroke="#ffffff" strokeWidth="1" />
                  
                  {/* Text on sector - non-upside-down radial layout */}
                  <g transform={`rotate(${textRotation}, 50, 50)`}>
                    <text
                      x={textX}
                      y="50.8"
                      fill="#3b0764"
                      fontSize="3.6"
                      fontWeight="700"
                      textAnchor={textAnchor}
                      dominantBaseline="middle"
                      className="font-sans-clean select-none"
                      style={{ letterSpacing: '0.02em' }}
                    >
                      {shortLabel}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Center Heart Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full border-4 border-pink-300 shadow-lg flex items-center justify-center z-20">
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-gentle-pulse" />
          </div>
        </div>

      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className={`mt-6 px-8 py-3.5 rounded-full text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
          isSpinning
            ? 'bg-purple-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-purple-300 hover:scale-105 active:scale-95'
        }`}
      >
        <span>{isSpinning ? 'SPINNING...' : 'SPIN IT 🌸'}</span>
      </button>

      {/* Selected Reason Modal */}
      {selectedReason && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/40 backdrop-blur-sm animate-fade-in">
          <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-pink-200 relative animate-scale-up">
            
            <button
              onClick={() => setSelectedReason(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-200 shadow-inner">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-bounce" />
            </div>

            <span className="text-[10px] font-bold tracking-widest text-purple-600 uppercase block mb-1">
              REASON FOR {girlfriendName.toUpperCase()} ♡
            </span>

            <h3 className="font-serif-display font-bold text-2xl text-slate-900 mb-3">
              "{selectedReason}"
            </h3>

            <p className="font-cursive text-xl text-purple-700">
              and I mean this with my whole heart ♡
            </p>

            <button
              onClick={() => setSelectedReason(null)}
              className="mt-6 w-full py-3 rounded-full bg-pink-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-pink-600 transition-colors shadow-md"
            >
              SWEET ♡
            </button>
          </div>
        </div>
      )}

      {/* Up Next Navigation */}
      <div className="mt-14 flex flex-col items-center gap-3">
        <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400">
          UP NEXT ↓
        </span>
        <span className="font-cursive text-xl text-purple-700/90">
          next — a letter I wrote for you →
        </span>
        <button
          onClick={() => {
            audioEngine.playHeartPop();
            onNextSection();
          }}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-300 hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer mt-1"
        >
          <span>READ MY LETTER</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};
