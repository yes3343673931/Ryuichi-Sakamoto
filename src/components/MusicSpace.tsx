import { motion } from 'motion/react';
import { Play, Info } from 'lucide-react';

const albums = [
  {
    title: "async",
    year: "2017",
    description: "关于自然、物体与时间的专辑。在寂静中录制。An album of nature, objects, and time.",
    color: "rgba(100, 100, 100, 0.1)"
  },
  {
    title: "1996",
    year: "1996",
    description: "经典的三重奏版本，收录了最受喜爱的电影主题曲。Classic trio arrangements.",
    color: "rgba(150, 150, 150, 0.1)"
  },
  {
    title: "BTTB",
    year: "1998",
    description: "Back To The Basic. 能够呼吸的极简钢琴曲。Minimalist piano compositions that breathe.",
    color: "rgba(80, 120, 100, 0.1)"
  },
  {
    title: "Thousand Knives",
    year: "1978",
    description: "计算机遇上作曲的实验性首演。Experimental debut where computing meets composition.",
    color: "rgba(100, 100, 150, 0.1)"
  }
];

export default function MusicSpace() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mb-24 text-center"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 italic">声像馆 / Sonic Collections</span>
        <h2 className="font-serif text-5xl mt-4 font-extralight tracking-tight">聆听空间 / Listening Space</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {albums.map((album, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="group relative glass p-6 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[220px]"
          >
            <div className="flex items-center gap-4 mb-4 z-10">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white/40 rounded-full group-hover:animate-pulse"></div>
              </div>
              <div>
                <div className="text-xs font-medium tracking-wide">{album.title}</div>
                <div className="text-[10px] opacity-40 italic">{album.year}</div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/10 mb-4 z-10"></div>
            
            <p className="text-[11px] font-light leading-relaxed opacity-40 italic mb-4 relative z-10">
              {album.description}
            </p>

            {/* Subtle waveform decoration */}
            <div className="mt-auto flex gap-1 items-end h-8 relative z-10">
              {[...Array(12)].map((_, j) => (
                <motion.div
                  key={j}
                  className="w-1 bg-white/20"
                  animate={{ height: `${20 + Math.random() * 80}%` }}
                  transition={{ repeat: Infinity, duration: 1.5 + Math.random(), repeatType: "reverse" }}
                />
              ))}
            </div>

            <div className="flex gap-4 mt-4 relative z-10">
              <button className="text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-opacity">
                播放 / Play
              </button>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
