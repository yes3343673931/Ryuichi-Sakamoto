import { motion } from 'motion/react';
import photo1 from './1.png';
import photo2a from './2a.png';
import photo3a from './3a.png';

const photos = [photo1, photo2a, photo3a];

export default function PersonalPhotos() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mb-24 text-center"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 italic">个人瞬间 / Personal Moments</span>
        <h2 className="font-serif text-5xl mt-4 font-extralight tracking-tight">肖像 / Portrait</h2>
      </motion.div>

      {/* Photos Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative glass rounded-2xl overflow-hidden"
          >
            {/* Image Container */}
            <div className="w-full aspect-square overflow-hidden relative bg-black/30">
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Decorative border */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/10 group-hover:border-white/20 transition-colors" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
