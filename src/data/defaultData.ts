import { GiftData } from '../types';
import gfPhoto1 from '../assets/images/1771170672617.jpg';
import gfPhoto2 from '../assets/images/1771170672930.jpg';
import untilIFoundYouSong from '../assets/audio/Stephen Sanchez - Until I Found You (Official Video).mp3';

export const defaultGiftData: GiftData = {
  girlfriendName: "Vanshika",
  senderName: "Rohan",
  headerBadge: "HAPPY GIRLFRIEND'S DAY",
  headerSubtitle: "I made this just for you, Vanshika — so you'd remember how deeply loved you are.",
  
  songTitle: "Until I Found You",
  songArtist: "Stephen Sanchez",
  songTagline: "I would never fall in love until I found her... until I found you, Vanshika ♡",
  songAudioUrl: untilIFoundYouSong,
  
  photosTitle: "every version of you, my favourite",
  photosSubtitle: "every single picture reminds me how lucky I am to have you, Vanshika ♡",
  photos: [
    {
      id: "1",
      url: gfPhoto1,
      caption: "Every time I look at you, my heart forgets how to beat properly... 🥺💖",
      tag: "MY FAVOURITE VIEW 🌸"
    },
    {
      id: "2",
      url: gfPhoto2,
      caption: "You have no idea how irresistibly pretty you look when you laugh, Vanshika 🙈✨",
      tag: "PURE SUNSHINE ☀️"
    }
  ],
  
  wheelTitle: "pick a reason, any reason",
  wheelSubtitle: "every single one of them is true about you ♡",
  reasons: [
    "being with you, Vanshika, feels like home",
    "your laugh is my absolute favourite sound",
    "you turn ordinary moments into magic",
    "you make me want to be a better man for you",
    "it's you. it will always be you, Vanshika",
    "the gentle way you care for me every single day"
  ],
  
  letterTitle: "a letter for Vanshika",
  letterGreeting: "Vanshika, my love,",
  letterParagraphs: [
    "I wanted to build something private and special just for you — a place where our moments, a sweet melody, and all my love for you live.",
    "Thank you for being my anchor and my happiness — for our late-night conversations, for laughing at my silly jokes, and for understanding me better than anyone else ever could.",
    "I hope today brings a big smile to your face, Vanshika. On the days I forget to say it out loud — please remember, I choose you today, tomorrow, and forever."
  ],
  letterSignOff: "yours, always & forever,",
  
  scratchTitle: "scratch this — softly",
  scratchSubtitle: "a private secret from Rohan to Vanshika. use your finger or mouse.",
  scratchSecret: "Vanshika, you are the absolute prettiest girl in the world and my entire heart. Every single day spent with you is my favourite gift, and I love you more than words can ever say! 💖🌸✨",
  
  finaleTitle: "here, these are for you, Vanshika 🌷",
  finaleSubtitle: "just between us two 🙈",
  finaleNote: "don't say anything — just take them, keep the smile, and remember how much Rohan loves you 😚\n— yours, always ♡"
};
