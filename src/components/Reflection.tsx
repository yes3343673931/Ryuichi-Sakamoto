import { motion } from 'motion/react';

export default function Reflection() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-8 text-center bg-gradient-to-t from-[#050505] to-transparent">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 4 }}
        className="max-w-3xl space-y-16"
      >
        <blockquote className="font-serif text-2xl md:text-3xl italic font-light leading-relaxed opacity-60 text-glow">
          “钢琴的声音不会永远持续下去。<br/>
          它会消逝……与环境融为一体。”<br/>
          <span className="text-sm block mt-6 opacity-60 font-light not-italic">
            “The sound of the piano doesn't go on forever. It fades... It merges with the environment.”
          </span>
        </blockquote>
        
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[1em] opacity-40">艺术永恒，生命短暂 / Ars Longa, Vita Brevis</p>
          <div className="h-[1px] w-24 bg-white/10 mx-auto" />
        </div>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[10px] uppercase tracking-[0.5em] font-light opacity-30 hover:opacity-100 transition-opacity pt-12"
        >
          回归寂静 / Return to silence
        </motion.button>
      </motion.div>

      <footer className="mt-32 opacity-10 text-[9px] uppercase tracking-[0.3em] font-light">
        纪念坂本龙一 (1952 — 2023) / Dedicated to the memory of Ryuichi Sakamoto
      </footer>
    </div>
  );
}
