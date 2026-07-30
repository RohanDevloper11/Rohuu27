import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { GiftData } from './types';
import { defaultGiftData } from './data/defaultData';
import { FloatingHearts } from './components/FloatingHearts';
import { TopNav } from './components/TopNav';
import { HeaderEnvelope } from './components/HeaderEnvelope';
import { OurSongSection } from './components/OurSongSection';
import { PhotoCarousel } from './components/PhotoCarousel';
import { SpinWheelSection } from './components/SpinWheelSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { ScratchCardSection } from './components/ScratchCardSection';
import { FlowersFinale } from './components/FlowersFinale';
import { WelcomeModal } from './components/WelcomeModal';
import { audioEngine } from './utils/audioSynth';

const PAGES = [
  { id: 'envelope', title: 'Home' },
  { id: 'song', title: 'Our Song' },
  { id: 'gallery', title: 'Pictures' },
  { id: 'wheel', title: 'Reasons Wheel' },
  { id: 'letter', title: 'Love Letter' },
  { id: 'scratch', title: 'Secret' },
  { id: 'finale', title: 'Flowers 🌷' },
];

export default function App() {
  const [giftData, setGiftData] = useState<GiftData>(() => {
    try {
      const saved = localStorage.getItem('vanshika_gift_data_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.photos && parsed.photos.length > 0) {
          return {
            ...defaultGiftData,
            ...parsed,
            songAudioUrl: defaultGiftData.songAudioUrl,
            songTitle: defaultGiftData.songTitle,
            songArtist: defaultGiftData.songArtist,
          };
        }
      }
    } catch (e) {
      console.error('Failed to load saved gift data', e);
    }
    return defaultGiftData;
  });

  const updateGiftData = (updater: (prev: GiftData) => GiftData) => {
    setGiftData((prev) => {
      const updated = updater(prev);
      try {
        localStorage.setItem('vanshika_gift_data_v4', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save gift data', e);
      }
      return updated;
    });
  };
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [activePage, setActivePage] = useState('envelope');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const handleToggleMusic = () => {
    audioEngine.toggleMusic(giftData.songAudioUrl, (playing) => {
      setIsMusicPlaying(playing);
    });
  };

  const goToPage = (pageId: string) => {
    audioEngine.playHeartPop();
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentIndex = PAGES.findIndex(p => p.id === activePage);
  const prevPage = currentIndex > 0 ? PAGES[currentIndex - 1].id : null;
  const nextPage = currentIndex < PAGES.length - 1 ? PAGES[currentIndex + 1].id : null;

  return (
    <div className="min-h-screen relative text-slate-800 font-sans-clean select-none flex flex-col justify-between">
      
      <div>
        {/* Initial Welcome Popup */}
        <WelcomeModal
          isOpen={showWelcomeModal}
          onClose={() => setShowWelcomeModal(false)}
        />

        {/* Background Floating Hearts */}
        <FloatingHearts />

        {/* Top Navbar */}
        <TopNav
          girlfriendName={giftData.girlfriendName}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          activePage={activePage}
          onSelectPage={goToPage}
          onGoBack={prevPage ? () => goToPage(prevPage) : undefined}
        />

        {/* Mobile Page Indicator Pills */}
        <div className="md:hidden max-w-5xl mx-auto px-3 mt-2 flex items-center gap-1.5 overflow-x-auto py-1.5 no-scrollbar scroll-smooth">
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => goToPage(p.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                activePage === p.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm shadow-pink-300 font-bold'
                  : 'bg-white/90 text-slate-700 border border-purple-100 hover:bg-purple-50'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Main Page Area with Motion Page Transitions */}
        <main className="relative z-10 max-w-4xl mx-auto px-4 py-4 min-h-[75vh] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full"
            >
              {activePage === 'envelope' && (
                <HeaderEnvelope
                  girlfriendName={giftData.girlfriendName}
                  headerBadge={giftData.headerBadge}
                  headerSubtitle={giftData.headerSubtitle}
                  onOpenNext={() => goToPage('song')}
                />
              )}

              {activePage === 'song' && (
                <OurSongSection
                  girlfriendName={giftData.girlfriendName}
                  songTitle={giftData.songTitle}
                  songArtist={giftData.songArtist}
                  songTagline={giftData.songTagline}
                  songAudioUrl={giftData.songAudioUrl}
                  isMusicPlaying={isMusicPlaying}
                  onToggleMusic={handleToggleMusic}
                  onNextSection={() => goToPage('gallery')}
                  onUpdateSong={(updatedSong) => {
                    updateGiftData(prev => ({ ...prev, ...updatedSong }));
                  }}
                />
              )}

              {activePage === 'gallery' && (
                <PhotoCarousel
                  girlfriendName={giftData.girlfriendName}
                  photos={giftData.photos}
                  photosTitle={giftData.photosTitle}
                  photosSubtitle={giftData.photosSubtitle}
                  onNextSection={() => goToPage('wheel')}
                  onUpdatePhotos={(updatedPhotos) => {
                    updateGiftData(prev => ({ ...prev, photos: updatedPhotos }));
                  }}
                />
              )}

              {activePage === 'wheel' && (
                <SpinWheelSection
                  girlfriendName={giftData.girlfriendName}
                  wheelTitle={giftData.wheelTitle}
                  wheelSubtitle={giftData.wheelSubtitle}
                  reasons={giftData.reasons}
                  onNextSection={() => goToPage('letter')}
                />
              )}

              {activePage === 'letter' && (
                <LoveLetterSection
                  girlfriendName={giftData.girlfriendName}
                  senderName={giftData.senderName}
                  letterTitle={giftData.letterTitle}
                  letterGreeting={giftData.letterGreeting}
                  letterParagraphs={giftData.letterParagraphs}
                  letterSignOff={giftData.letterSignOff}
                  onNextSection={() => goToPage('scratch')}
                />
              )}

              {activePage === 'scratch' && (
                <ScratchCardSection
                  girlfriendName={giftData.girlfriendName}
                  scratchTitle={giftData.scratchTitle}
                  scratchSubtitle={giftData.scratchSubtitle}
                  scratchSecret={giftData.scratchSecret}
                  onNextSection={() => goToPage('finale')}
                />
              )}

              {activePage === 'finale' && (
                <FlowersFinale
                  girlfriendName={giftData.girlfriendName}
                  senderName={giftData.senderName}
                  finaleTitle={giftData.finaleTitle}
                  finaleSubtitle={giftData.finaleSubtitle}
                  finaleNote={giftData.finaleNote}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Bottom Page Bar */}
      <footer className="sticky bottom-3 z-30 max-w-md mx-auto px-4 pb-2 w-full pointer-events-auto">
        <div className="glass-card rounded-full px-4 py-2 shadow-lg shadow-purple-200/50 border border-white/90 flex items-center justify-between">
          <button
            onClick={() => prevPage && goToPage(prevPage)}
            disabled={!prevPage}
            className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              prevPage
                ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                : 'opacity-30 cursor-not-allowed text-slate-400'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-700">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" />
            <span className="font-bold tracking-wide">{PAGES[currentIndex].title}</span>
          </div>

          <button
            onClick={() => nextPage && goToPage(nextPage)}
            disabled={!nextPage}
            className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              nextPage
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xs hover:scale-105'
                : 'opacity-30 cursor-not-allowed text-slate-400'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

    </div>
  );
}

