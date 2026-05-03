import { motion } from 'motion/react';

interface IntroProps {
  onEnter: () => void;
  key?: string;
}

export default function Intro({ onEnter }: IntroProps) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#050505] z-[100]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Abstract Background Element (CSS) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Animated Ripple/Aura */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-[800px] h-[800px] border border-white/5 rounded-full flex items-center justify-center"
        >
          <div className="w-[80%] h-[80%] border border-white/10 rounded-full flex items-center justify-center">
            <div className="w-[60%] h-[60%] border border-white/20 rounded-full"></div>
          </div>
        </motion.div>
      </div>

      <div className="relative text-center space-y-12 max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, delay: 0.5 }}
          className="space-y-6"
        >
          <h1 className="font-serif italic text-6xl md:text-8xl tracking-tight text-white/90">
            坂本龙一
          </h1>
          <p className="text-sm tracking-[0.2em] font-light opacity-50 max-w-md mx-auto leading-relaxed">
            声音、自然与时间的交响。<br/>Sound, Nature, and Time.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          whileHover={{ opacity: 1, letterSpacing: '0.2em' }}
          onClick={onEnter}
          className="px-12 py-4 border border-white/20 hover:border-white/40 transition-all text-xs uppercase tracking-widest font-light mt-12"
          id="enter-button"
        >
          跨入空间 / Enter the space
        </motion.button>
      </div>

      <motion.div 
        className="absolute bottom-12 opacity-20 text-[10px] uppercase tracking-widest"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        寂静是一种景观 / Quietness is a landscape
      </motion.div>
    </motion.div>
  );
}
