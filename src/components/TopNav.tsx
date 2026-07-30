import React from 'react';
import { Volume2, VolumeX, Heart, ArrowLeft } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface TopNavProps {
  girlfriendName: string;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  activePage: string;
  onSelectPage: (pageId: string) => void;
  onGoBack?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  girlfriendName,
  isMusicPlaying,
  onToggleMusic,
  activePage,
  onSelectPage,
  onGoBack
}) => {
  const handleNavClick = (pageId: string) => {
    audioEngine.playHeartPop();
    onSelectPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'envelope', label: 'Home' },
    { id: 'song', label: 'Our Song' },
    { id: 'gallery', label: 'Pictures' },
    { id: 'wheel', label: 'Reasons Wheel' },
    { id: 'letter', label: 'Love Letter' },
    { id: 'scratch', label: 'Secret' },
    { id: 'finale', label: 'Flowers 🌷' },
  ];

  return (
    <header className="sticky top-3 z-40 max-w-5xl mx-auto px-4 pointer-events-auto">
      <div className="glass-card rounded-full px-4 py-2.5 shadow-sm shadow-purple-200/50 flex items-center justify-between border border-white/80">
        
        {/* Left: Back Arrow or Logo Badge */}
        <div className="flex items-center gap-2">
          {activePage !== 'envelope' && onGoBack && (
            <button
              onClick={onGoBack}
              title="Go back"
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-pink-100/80 text-pink-700 hover:bg-pink-200 transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer mr-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          <button 
            onClick={() => handleNavClick('envelope')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center text-white shadow-sm shadow-pink-300 group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 block leading-tight">
                FOR {girlfriendName.toUpperCase()} ♡
              </span>
              <span className="text-[10px] text-pink-600 font-cursive text-[14px]">
                happy girlfriend day
              </span>
            </div>
          </button>
        </div>

        {/* Center Jumper Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-xs'
                    : 'hover:bg-purple-100/70 hover:text-purple-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Music Toggle */}
          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? 'Mute romantic melody' : 'Play romantic melody'}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
              isMusicPlaying
                ? 'bg-purple-600 text-white shadow-purple-300'
                : 'bg-white/80 text-slate-700 hover:bg-purple-100 border border-purple-200'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-pink-200" />
                <span>Music On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span>Play Music</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
