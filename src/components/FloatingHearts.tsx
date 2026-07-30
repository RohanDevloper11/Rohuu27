import React, { useEffect, useState } from 'react';
import { audioEngine } from '../utils/audioSynth';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  speedY: number;
  symbol: string;
}

interface BurstHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  symbol: string;
}

const symbols = ['♥', '💖', '🌸', '✨', '💕', '🌷', '🎀'];
const colors = ['#f472b6', '#ec4899', '#a855f7', '#c084fc', '#f43f5e'];

export const FloatingHearts: React.FC = () => {
  const [ambientHearts, setAmbientHearts] = useState<HeartParticle[]>([]);
  const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([]);

  useEffect(() => {
    // Spawn 14 ambient floating hearts
    const initialHearts: HeartParticle[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.floor(Math.random() * 14) + 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      speedY: 0.15 + Math.random() * 0.2,
      symbol: symbols[Math.floor(Math.random() * symbols.length)]
    }));

    setAmbientHearts(initialHearts);

    const interval = setInterval(() => {
      setAmbientHearts((prev) =>
        prev.map((h) => ({
          ...h,
          y: h.y <= -10 ? 110 : h.y - h.speedY,
          x: h.x + Math.sin(h.y / 10) * 0.15
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleGlobalClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking interactive buttons
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('a')) {
      return;
    }

    audioEngine.playHeartPop();

    const newBurst: BurstHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      size: Math.floor(Math.random() * 12) + 20,
      symbol: symbols[Math.floor(Math.random() * symbols.length)]
    };

    setBurstHearts((prev) => [...prev.slice(-10), newBurst]);

    setTimeout(() => {
      setBurstHearts((prev) => prev.filter((b) => b.id !== newBurst.id));
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-auto z-0 overflow-hidden"
      onClick={handleGlobalClick}
    >
      {/* Floating Ambient Background Particles */}
      {ambientHearts.map((h) => (
        <span
          key={h.id}
          className="absolute select-none pointer-events-none opacity-40 transition-transform duration-300"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            fontSize: `${h.size}px`,
            color: h.color,
            transform: `rotate(${h.rotation}deg)`,
            filter: 'drop-shadow(0 2px 4px rgba(236,72,153,0.15))'
          }}
        >
          {h.symbol}
        </span>
      ))}

      {/* Burst Click Particles */}
      {burstHearts.map((b) => (
        <span
          key={b.id}
          className="fixed select-none pointer-events-none z-50 animate-bounce transition-all duration-700"
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
            fontSize: `${b.size}px`,
            transform: 'translate(-50%, -50%) scale(1.4)',
            filter: 'drop-shadow(0 4px 8px rgba(236,72,153,0.3))'
          }}
        >
          {b.symbol}
        </span>
      ))}
    </div>
  );
};
