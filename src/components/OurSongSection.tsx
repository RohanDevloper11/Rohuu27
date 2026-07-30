import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Heart, ArrowRight, Edit3, Upload, Check, X } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface OurSongSectionProps {
  girlfriendName: string;
  songTitle: string;
  songArtist: string;
  songTagline: string;
  songAudioUrl?: string;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onNextSection: () => void;
  onUpdateSong?: (songData: { songTitle?: string; songArtist?: string; songAudioUrl?: string; songTagline?: string }) => void;
}

export const OurSongSection: React.FC<OurSongSectionProps> = ({
  girlfriendName,
  songTitle,
  songArtist,
  songTagline,
  songAudioUrl,
  isMusicPlaying,
  onToggleMusic,
  onNextSection,
  onUpdateSong
}) => {
  const [progress, setProgress] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const audioFileInputRef = useRef<HTMLInputElement>(null);

  const [editTitle, setEditTitle] = useState(songTitle);
  const [editArtist, setEditArtist] = useState(songArtist);
  const [editAudioUrl, setEditAudioUrl] = useState(songAudioUrl || '');
  const [editTagline, setEditTagline] = useState(songTagline);

  useEffect(() => {
    setEditTitle(songTitle);
    setEditArtist(songArtist);
    setEditAudioUrl(songAudioUrl || '');
    setEditTagline(songTagline);
  }, [songTitle, songArtist, songAudioUrl, songTagline]);

  useEffect(() => {
    let timer: number;
    if (isMusicPlaying) {
      timer = window.setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    } else {
      setProgress(0);
    }
    return () => clearInterval(timer);
  }, [isMusicPlaying]);

  const handlePlayClick = () => {
    onToggleMusic();
  };

  // Convert progress (0-100) to dummy seconds format (e.g. max 2:43 = 163 seconds)
  const totalSeconds = 163;
  const currentSeconds = Math.floor((progress / 100) * totalSeconds);
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <section id="music" className="min-h-[85vh] flex flex-col items-center justify-center py-16 px-4 text-center relative z-10">
      
      {/* Top script tag */}
      <span className="font-cursive text-2xl text-purple-700/80 mb-2">
        our song
      </span>

      {/* Pill Badge */}
      <button 
        onClick={handlePlayClick}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-pink-200 shadow-sm text-xs font-bold tracking-widest text-pink-600 uppercase mb-4 hover:scale-105 transition-transform"
      >
        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
        <span>{isMusicPlaying ? 'NOW PLAYING' : 'PRESS PLAY'}</span>
      </button>

      {/* Big Headline */}
      <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-slate-900 max-w-xl mx-auto leading-tight mb-3">
        this song always brings me back to you
      </h2>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-8 font-medium">
        {songTagline}
      </p>

      {/* Music Player Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-xl shadow-purple-200/50 border border-purple-100 flex flex-col gap-4 relative overflow-hidden group">
        
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          
          {/* Cute Toast / Heart Album Art Graphic */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-100 to-pink-100 border border-pink-200 flex items-center justify-center shadow-inner shrink-0 relative overflow-hidden">
            <span className="text-2xl animate-float">🍞💖🍞</span>
            {isMusicPlaying && (
              <div className="absolute inset-0 bg-pink-500/10 flex items-center justify-center">
                <Music className="w-6 h-6 text-pink-600 animate-bounce" />
              </div>
            )}
          </div>

          {/* Song Info */}
          <div className="text-left flex-1 min-w-0">
            <h3 className="font-serif-display font-bold text-lg text-slate-900 truncate">
              {songTitle}
            </h3>
            <p className="text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1 mt-0.5">
              <span>{songArtist}</span>
              <span className="text-pink-400">♡</span>
            </p>

            {/* Time Indicator */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mt-2">
              <span>{formatTime(currentSeconds)}</span>
              <span>2:43</span>
            </div>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={handlePlayClick}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-purple-300 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            {isMusicPlaying ? (
              <Pause className="w-6 h-6 fill-white" />
            ) : (
              <Play className="w-6 h-6 fill-white ml-0.5" />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div 
          className="w-full bg-purple-100 h-2 rounded-full overflow-hidden cursor-pointer relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newProgress = Math.min(100, Math.max(0, (clickX / rect.width) * 100));
            setProgress(newProgress);
            if (!isMusicPlaying) onToggleMusic();
          }}
        >
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      {/* Change Song Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => {
            audioEngine.playHeartPop();
            setIsEditModalOpen(true);
          }}
          className="px-4 py-2 rounded-full bg-white text-purple-700 border border-purple-200 font-bold text-xs shadow-sm hover:bg-purple-50 hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Change Song & Audio</span>
        </button>
      </div>

      {/* Hidden Audio File Input */}
      <input
        ref={audioFileInputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const audioUrl = URL.createObjectURL(file);
            setEditAudioUrl(audioUrl);
            if (!editTitle || editTitle === "Perfect") {
              setEditTitle(file.name.replace(/\.[^/.]+$/, ""));
            }
          }
        }}
      />

      {/* Change Song Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl text-left border border-purple-100 flex flex-col gap-4">
            
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-pink-500" />
                <h3 className="font-serif-display font-bold text-lg text-slate-900">
                  Change Our Romantic Song
                </h3>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Song Title
                </label>
                <input 
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="e.g. Perfect, Lover, Until I Found You"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-sans focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Artist / Subtitle
                </label>
                <input 
                  type="text"
                  value={editArtist}
                  onChange={(e) => setEditArtist(e.target.value)}
                  placeholder="e.g. Ed Sheeran / OUR SONG"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-sans focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Song Audio (MP3 / Sound File)
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={editAudioUrl}
                    onChange={(e) => setEditAudioUrl(e.target.value)}
                    placeholder="Audio URL (or click Upload Audio)"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 font-mono text-[11px] focus:outline-none focus:border-pink-500"
                  />
                  <button
                    type="button"
                    onClick={() => audioFileInputRef.current?.click()}
                    className="px-3 py-2 rounded-xl bg-purple-100 text-purple-700 font-bold hover:bg-purple-200 shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload MP3</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Song Subtitle Tagline
                </label>
                <input 
                  type="text"
                  value={editTagline}
                  onChange={(e) => setEditTagline(e.target.value)}
                  placeholder="e.g. this song always brings me back to you"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-sans focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t mt-2">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onUpdateSong) {
                    onUpdateSong({
                      songTitle: editTitle,
                      songArtist: editArtist,
                      songAudioUrl: editAudioUrl,
                      songTagline: editTagline,
                    });
                  }
                  setIsEditModalOpen(false);
                }}
                className="px-6 py-2 rounded-xl bg-pink-500 text-white font-bold text-xs hover:bg-pink-600 shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Song</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Handwritten Quote */}
      <p className="font-cursive text-2xl text-purple-800 mt-8">
        I'll be humming this until I see you again, {girlfriendName} ♡
      </p>

      {/* Up Next Navigation */}
      <div className="mt-14 flex flex-col items-center gap-3">
        <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400">
          UP NEXT ↓
        </span>
        <span className="font-cursive text-xl text-purple-700/90">
          next — a few of my favourite yous →
        </span>
        <button
          onClick={() => {
            audioEngine.playHeartPop();
            onNextSection();
          }}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-300 hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer mt-1"
        >
          <span>SEE YOUR PICTURES</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};
