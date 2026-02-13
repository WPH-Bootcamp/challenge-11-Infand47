"use client";

// TODO: Import dependencies yang diperlukan
import { motion } from "motion/react";
import { Play, Pause, SkipBack, SkipForward, 
  Shuffle, Repeat, Volume2, Music } from "lucide-react";

interface PlayerProps {
  state: 'paused' | 'loading' | 'playing';
}

// export function MusicPlayer() {
  // TODO: Implementasikan state management untuk playing, paused, loading
  
  // TODO: Implementasikan handler untuk play/pause
  
  // TODO: Implementasikan komponen music player sesuai desain Figma
  // Struktur yang perlu dibuat:
  // - Container dengan background dan shadow animations
  // - Album artwork dengan rotation dan scale animations
  // - Equalizer bars dengan stagger effect
  // - Progress bar dengan fill animation
  // - Control buttons (play/pause, skip, volume)
  
//   return (
//     <div className="w-full max-w-md">
//       {/* TODO: Implementasikan music player di sini */}
//       <p className="text-center text-gray-500">
//         Mulai implementasi music player di sini
//       </p>
//     </div>
//   );
// }
const MusicPlayerCard = ({ state }: PlayerProps) => {
  const isPlaying = state === 'playing';
  const isLoading = state === 'loading';

return (
    <div className={`relative group w-100 bg-[#121212] border border-white/5 rounded-2xl p-6 transition-all duration-500 ${
      isPlaying ? 'shadow-[0_0_30px_rgba(168,85,247,0.2)] border-purple-500/30' : ''
    }`}>
      <div className="flex gap-4 mb-6">
        {/* Album Art */}
        <div className="w-24 h-24 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
          <Music className="text-black/80 w-10 h-10" />
        </div>

        {/* Info & Visualizer */}
        <div className="flex flex-col justify-center flex-1">
          <h3 className="text-white font-bold text-lg leading-tight">Awesome Song Title</h3>
          <p className="text-gray-400 text-sm mb-3">Amazing Artist</p>
          
          {/* Visualizer/Indicator */}
          <div className="flex items-end gap-1 h-6">
            {state === 'paused' && (
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-2 h-2 bg-purple-600/40 rounded-sm" />
                ))}
              </div>
            )}
            {state === 'loading' && (
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-2 h-4 bg-purple-600/60 animate-pulse rounded-sm" />
                ))}
              </div>
            )}
            {state === 'playing' && (
              <div className="flex items-end gap-1 h-8">
                {[0.6, 0.4, 0.8, 0.5, 0.7].map((h, i) => (
                  <div 
                    key={i} 
                    className="w-2 bg-purple-500 rounded-sm animate-bounce" 
                    style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1 mb-6">
        <div className="relative h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`absolute h-full rounded-full transition-all duration-300 ${isPlaying ? 'bg-purple-500' : 'bg-gray-600'}`} 
            style={{ width: '40%' }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-500 font-medium">
          <span>1:23</span>
          <span>3:45</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <Shuffle className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
        <SkipBack className="w-5 h-5 text-gray-300 fill-current hover:text-white cursor-pointer" />
        
        <button className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
          isLoading ? 'bg-gray-700' : 'bg-purple-600 hover:scale-105 active:scale-95'
        }`}>
          {state === 'playing' ? (
            <Pause className="w-6 h-6 text-white fill-current" />
          ) : (
            <Play className={`w-6 h-6 text-white fill-current ${isLoading ? 'opacity-50' : ''} ml-1`} />
          )}
        </button>

        <SkipForward className="w-5 h-5 text-gray-300 fill-current hover:text-white cursor-pointer" />
        <Repeat className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3">
        <Volume2 className="w-4 h-4 text-gray-500" />
        <div className="h-1 w-full bg-gray-800 rounded-full relative">
          <div className="absolute h-full w-[60%] bg-gray-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default function MusicPlayer() {
  return (
    <div className="w-full h-full bg-black p-12 text-white font-sans ">
      {/* <h1 className="text-xl font-semibold mb-12 opacity-80">Music Player Controls</h1> */}
      
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
        {/* <div className="space-y-4">
          <span className="text-gray-500 text-sm ml-2">Paused</span>
          <MusicPlayerCard state="paused" />
        </div>
        
        <div className="space-y-4">
          <span className="text-gray-500 text-sm ml-2">Loading</span>
          <MusicPlayerCard state="loading" />
        </div> */}

        <div className="space-y-4">
          {/* <span className="text-gray-500 text-sm ml-2">Playing</span> */}
          <MusicPlayerCard state="playing" />
        </div>
      {/* </div> */}
    </div>
  );
}