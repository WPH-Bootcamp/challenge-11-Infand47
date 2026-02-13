"use client";

import { motion, AnimatePresence } from "motion/react";
import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  Music4,
} from "lucide-react";

// Komponen Visualizer Bar yang bergerak
const Visualizer = ({ isPlaying }: { isPlaying: boolean }) => {
  return (
    <div className="flex items-center gap-1 h-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-purple-500 rounded-full"
          animate={{
            height: isPlaying ? [4, 16, 8, 14, 6] : 4,
          }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // Persentase default
  const [currentTime, setCurrentTime] = useState("1:23");
  const [duration, setDuration] = useState("3:45");
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Link lagu sampel (Bisa diganti dengan file lokal Anda)
  const songUrl =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3";

  // Tombol Play/Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      audioRef.current.muted = nextMute;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      const prog = (current / total) * 100;
      setProgress(prog);

      setCurrentTime(formatTime(current));
      if (!isNaN(total)) setDuration(formatTime(total));
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans text-white">
      {/* elemen audio */}
      <audio
        ref={audioRef}
        src={songUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className=" w-125 h-87.5 bg-neutral-950 p-4 rounded-4xl shadow-2xl border border-white/5 relative overflow-hidden"
      >
        {/* Glow Effect saat Playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-purple-500/5 blur-[80px] pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-8">
            {/* Album Art */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-28 h-28 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group cursor-pointer"
            >
              <Music4 className="w-10 h-10 text-zinc-900/80 group-hover:scale-110 transition-transform" />
            </motion.div>

            {/* Song Info */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 tracking-tight">
                Awesome Song Title
              </h2>
              <p className="text-zinc-500 text-sm mb-4">Amazing Artist</p>

              <Visualizer isPlaying={isPlaying} />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 mb-8">
            <div className="relative w-full h-1.5 bg-zinc-800 rounded-full cursor-pointer overflow-hidden group">
              <motion.div
                className="absolute top-0 left-0 h-full bg-zinc-400 group-hover:bg-purple-500 transition-colors"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 font-medium tabular-nums">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-8 px-2">
            <button className="text-zinc-500 hover:text-white transition-colors">
              <Shuffle size={18} />
            </button>

            <div className="flex items-center gap-6">
              <button className="text-zinc-300 hover:text-white transition-colors active:scale-90">
                <SkipBack size={24} fill="currentColor" />
              </button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:bg-purple-500 transition-colors"
              >
                {isPlaying ? (
                  <Pause size={28} fill="white" className="text-white" />
                ) : (
                  <Play size={28} fill="white" className="text-white ml-1" />
                )}
              </motion.button>

              <button className="text-zinc-300 hover:text-white transition-colors active:scale-90">
                <SkipForward size={24} fill="currentColor" />
              </button>
            </div>

            <button className="text-zinc-500 hover:text-white transition-colors">
              <Repeat size={18} />
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-3 px-2">
            <Volume2 
            size={16} 
            className={`w-4 h-auto cursor-pointer transition-opacity ${isMuted ? "opacity-20" : "opacity-60 hover:opacity-100"}`}
            onClick={toggleMute} />
            <div className="flex-1 h-1 bg-zinc-800 rounded-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-full w-[65%] bg-zinc-600 group-hover:bg-zinc-400 transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
