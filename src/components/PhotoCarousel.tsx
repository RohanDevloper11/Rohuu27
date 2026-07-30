import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { PhotoItem } from '../types';
import { audioEngine } from '../utils/audioSynth';

interface PhotoCarouselProps {
  girlfriendName: string;
  photos: PhotoItem[];
  photosTitle: string;
  photosSubtitle: string;
  onNextSection: () => void;
  onUpdatePhotos?: (photos: PhotoItem[]) => void;
}

export const PhotoCarousel: React.FC<PhotoCarouselProps> = ({
  girlfriendName,
  photos,
  photosTitle,
  photosSubtitle,
  onNextSection
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) return null;

  const safeIndex = currentIndex % photos.length;
  const currentPhoto = photos[safeIndex] || photos[0];

  const handlePrev = () => {
    audioEngine.playHeartPop();
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    audioEngine.playHeartPop();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <section id="gallery" className="min-h-[90vh] flex flex-col items-center justify-center py-16 px-4 text-center relative z-10">
      
      {/* Top script tag */}
      <span className="font-cursive text-2xl text-purple-700/80 mb-2">
        my favourite pictures of you, {girlfriendName}
      </span>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-pink-200 shadow-sm mb-4">
        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
        <span className="text-[11px] font-bold tracking-widest text-pink-600 uppercase">
          {currentPhoto.tag || 'MY FAVOURITE GIRL'}
        </span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-slate-900 max-w-xl mx-auto leading-tight mb-2">
        {photosTitle}
      </h2>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-8 font-medium">
        {photosSubtitle}
      </p>

      {/* Polaroid Card Wrapper */}
      <div className="relative w-full max-w-md mx-auto my-2">
        
        {/* Flower Stickers */}
        <span className="absolute -top-6 -left-3 text-2xl z-30 animate-bounce">🌸</span>
        <span className="absolute -top-6 -right-3 text-2xl z-30 animate-float">🌷</span>

        {/* Washi Tape Strip at top */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-purple-200/80 backdrop-blur-sm border-y border-purple-300 z-30 shadow-sm rotate-1 opacity-90" />

        {/* Polaroid Card */}
        <div className="glass-card bg-white rounded-3xl p-5 sm:p-6 shadow-2xl shadow-purple-200/60 border border-purple-100 flex flex-col items-center relative overflow-hidden transition-all duration-300">
          
          {/* Main Photo Area */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-inner group">
            <img
              src={currentPhoto.url}
              alt={currentPhoto.caption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              title="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-slate-700 shadow-md flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              title="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-slate-700 shadow-md flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Photo Counter */}
          <span className="text-[11px] font-bold tracking-widest text-purple-600 uppercase mt-4">
            0{currentIndex + 1} / 0{photos.length}
          </span>

          {/* Handwritten Caption */}
          <p className="font-cursive text-2xl text-slate-800 mt-1 max-w-xs leading-snug">
            {currentPhoto.caption}
          </p>

        </div>

        {/* Thumbnail Row */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {photos.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                audioEngine.playHeartPop();
                setCurrentIndex(idx);
              }}
              className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'border-purple-600 scale-110 shadow-md shadow-purple-300'
                  : 'border-white opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={p.url}
                alt={p.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

      </div>

      {/* Up Next Section */}
      <div className="mt-14 flex flex-col items-center gap-3">
        <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400">
          UP NEXT ↓
        </span>
        <span className="font-cursive text-xl text-purple-700/90">
          next — a little wheel of reasons →
        </span>
        <button
          onClick={() => {
            audioEngine.playHeartPop();
            onNextSection();
          }}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-300 hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer mt-1"
        >
          <span>SPIN FOR A REASON</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};
