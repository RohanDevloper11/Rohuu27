// Romantic Web Audio Synthesizer for ambient music and sound effects

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private musicInterval: number | null = null;
  private currentNoteIndex = 0;
  
  // Custom audio element if user provides MP3 URL
  private customAudio: HTMLAudioElement | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play custom audio URL if provided, otherwise play synthetic romantic piano chord melody
  public toggleMusic(customUrl?: string, onStateChange?: (playing: boolean) => void) {
    this.initContext();

    if (customUrl) {
      if (!this.customAudio || this.customAudio.src !== customUrl) {
        if (this.customAudio) {
          this.customAudio.pause();
        }
        this.customAudio = new Audio(customUrl);
        this.customAudio.loop = true;
      }

      if (this.isPlayingMusic) {
        this.customAudio.pause();
        this.isPlayingMusic = false;
        if (onStateChange) onStateChange(false);
      } else {
        this.customAudio.play().then(() => {
          this.isPlayingMusic = true;
          if (onStateChange) onStateChange(true);
        }).catch(() => {
          // Fallback to synth if audio play fails
          this.startSynthMelody();
          this.isPlayingMusic = true;
          if (onStateChange) onStateChange(true);
        });
      }
      return;
    }

    // Default synth mode
    if (this.isPlayingMusic) {
      this.stopSynthMelody();
      this.isPlayingMusic = false;
      if (onStateChange) onStateChange(false);
    } else {
      this.startSynthMelody();
      this.isPlayingMusic = true;
      if (onStateChange) onStateChange(true);
    }
  }

  public isMusicActive(): boolean {
    return this.isPlayingMusic;
  }

  private startSynthMelody() {
    this.stopSynthMelody();
    this.currentNoteIndex = 0;

    // Soft romantic chord progression in G Major / E Minor (G - D - Em - C)
    // Frequencies (Hz) for soft piano-like sine notes
    const sequence = [
      // Chord 1: G Major
      { notes: [196.00, 246.94, 293.66, 392.00], duration: 1.2 }, // G3, B3, D4, G4
      { notes: [293.66, 392.00, 493.88], duration: 0.8 },
      // Chord 2: D Major
      { notes: [146.83, 220.00, 293.66, 369.99], duration: 1.2 }, // D3, A3, D4, F#4
      { notes: [293.66, 369.99, 440.00], duration: 0.8 },
      // Chord 3: E Minor
      { notes: [164.81, 246.94, 329.63, 392.00], duration: 1.2 }, // E3, B3, E4, G4
      { notes: [329.63, 392.00, 493.88], duration: 0.8 },
      // Chord 4: C Major
      { notes: [130.81, 261.63, 329.63, 392.00], duration: 1.2 }, // C3, C4, E4, G4
      { notes: [329.63, 392.00, 523.25], duration: 0.8 }
    ];

    const playNext = () => {
      if (!this.isPlayingMusic) return;
      const step = sequence[this.currentNoteIndex % sequence.length];
      step.notes.forEach((freq, idx) => {
        this.playSoftNote(freq, step.duration, idx * 0.12);
      });
      this.currentNoteIndex++;
    };

    playNext();
    this.musicInterval = window.setInterval(playNext, 2000);
  }

  private stopSynthMelody() {
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  private playSoftNote(freq: number, duration: number, delay = 0) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine'; // Pure soft warmth
      osc.frequency.setValueAtTime(freq, now);

      // Attack - Decay - Sustain - Release
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // AudioContext error handling
    }
  }

  // Sound Effect: Heart Click Pop
  public playHeartPop() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // ignore
    }
  }

  // Sound Effect: Envelope Open Swoosh
  public playSwoosh() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.25);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // ignore
    }
  }

  // Sound Effect: Wheel Spin Tick
  public playWheelTick() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }

  // Sound Effect: Kiss Pop / Muah!
  public playKissSound() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.18);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.20);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.21);
    } catch {
      // ignore
    }
  }

  // Sound Effect: Winner Chime / Celebration
  public playCelebrationChime() {
    this.initContext();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playSoftNote(freq, 0.6, idx * 0.08);
    });
  }
}

export const audioEngine = new AudioEngine();
