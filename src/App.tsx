/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';

// Sections
import Intro from './components/Intro';
import Timeline from './components/Timeline';
import MusicSpace from './components/MusicSpace';
import CreativeSpace from './components/CreativeSpace';
import Reflection from './components/Reflection';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize ambient audio
  useEffect(() => {
    // Solari-like ambient track for better atmosphere
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'); 
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioMuted) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
      setIsAudioMuted(!isAudioMuted);
    }
  };

  const handleEnter = () => {
    setHasEntered(true);
    // Auto-play audio on user interaction if not explicitly muted
    if (!isAudioMuted && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* Grain / Noise Overlay */}
      <div className="fixed inset-0 noise-overlay z-50 pointer-events-none" />

      {/* Global Background & Glows */}
      <div className="fixed inset-0 bg-[#050505] -z-10 overflow-hidden">
        <div className="ambient-glow-blue" />
        <div className="ambient-glow-emerald" />
      </div>

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <Intro key="intro" onEnter={handleEnter} />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative"
          >
            {/* HUD / Navigation Controls */}
            <header className="fixed top-0 left-0 w-full p-10 flex justify-between items-center z-40">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="text-xs tracking-[0.5em] font-light uppercase opacity-60"
              >
                RYUICHI SAKAMOTO
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-8"
              >
                <nav className="hidden md:flex gap-8 text-[10px] tracking-[0.3em] uppercase opacity-40">
                  <a href="#timeline" className="hover:opacity-100 transition-opacity">时光轴 / Timeline</a>
                  <a href="#music" className="hover:opacity-100 transition-opacity">声像 / Archive</a>
                  <a href="#creative" className="hover:opacity-100 transition-opacity">互动 / Interactive</a>
                </nav>
                
                <button
                  onClick={toggleAudio}
                  className="p-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors"
                  id="audio-toggle"
                >
                  {isAudioMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </motion.div>
            </header>

            <div className="flex flex-col gap-32 pb-32">
              <section id="timeline">
                <Timeline />
              </section>

              <section id="music">
                <MusicSpace />
              </section>

              <section id="creative">
                <CreativeSpace />
              </section>

              <section id="reflection">
                <Reflection />
              </section>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

