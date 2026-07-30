export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  tag?: string;
}

export interface GiftData {
  girlfriendName: string;
  senderName: string;
  headerBadge: string;
  headerSubtitle: string;
  
  // Music section
  songTitle: string;
  songArtist: string;
  songTagline: string;
  songAudioUrl?: string; // Optional custom MP3 URL
  
  // Gallery
  photosTitle: string;
  photosSubtitle: string;
  photos: PhotoItem[];
  
  // Reasons Wheel
  wheelTitle: string;
  wheelSubtitle: string;
  reasons: string[];
  
  // Love Letter
  letterTitle: string;
  letterGreeting: string;
  letterParagraphs: string[];
  letterSignOff: string;
  
  // Scratch Card
  scratchTitle: string;
  scratchSubtitle: string;
  scratchSecret: string;
  
  // Finale
  finaleTitle: string;
  finaleSubtitle: string;
  finaleNote: string;
}
