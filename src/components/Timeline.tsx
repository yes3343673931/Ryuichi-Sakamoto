import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const milestones = [
  {
    year: "1952",
    title: "初端 / Beginnings",
    description: "出生于东京。自幼学习古典作曲与民族音乐学，探索不同世界间的融合。Born in Tokyo, studying classical composition.",
    category: "生命 / Life"
  },
  {
    year: "1978",
    title: "黄色魔术交响乐团 / YMO",
    description: "与细野晴臣、高桥幸宏共同开创电子乐。重新定义了流行乐与技术的边界。Pioneering electronic music.",
    category: "音乐 / Music"
  },
  {
    year: "1983",
    title: "圣诞快乐，劳伦斯先生",
    description: "戛纳获奖配乐作品。凭借极简主义的完美旋律确立了传奇电影配乐大师的地位。Establishing his name as a legendary film composer.",
    category: "影音 / Cinema"
  },
  {
    year: "1987",
    title: "末代皇帝 / The Last Emperor",
    description: "荣获奥斯卡最佳原创配乐奖。其和弦的深度获得了全球范围内的认可。Winning the Academy Award.",
    category: "影音 / Cinema"
  },
  {
    year: "2017",
    title: "async",
    description: "确诊后对自然、时间与死亡的沉思。一部大气磅礴的实验性杰作。A meditation on nature, time, and mortality.",
    category: "实验 / Experimental"
  },
  {
    year: "2023",
    title: "12",
    description: "最后的声影日记。每首曲目都以创作日期命名，将音乐剥离至最纯粹的本质。A final sonic diary.",
    category: "晚期作品 / Later Works"
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-8 pt-32 relative">
      {/* Decorative Aside Element (Floating) */}
      <aside className="absolute -left-20 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 z-20">
        <div className="flex flex-col gap-6">
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent ml-1"></div>
          <div className="text-[10px] rotate-180 [writing-mode:vertical-lr] tracking-[0.4em] uppercase opacity-30">1952 — 2023</div>
        </div>
      </aside>

      <div className="relative max-w-4xl mx-auto">
        {/* The Path */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 overflow-hidden">
          <motion.div 
            className="w-full bg-white/20 origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="space-y-48">
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Dot */}
              <div className="absolute left-1/2 w-2 h-2 rounded-full bg-white/40 -translate-x-1/2 z-10 blur-[1px]" />
              
              {/* Content Card */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-20 text-right' : 'pl-20 text-left'}`}>
                <span className="text-xs uppercase tracking-[0.3em] font-light opacity-30 block mb-2">
                  {item.year} — {item.category}
                </span>
                <h3 className="font-serif text-3xl mb-4 font-light text-glow">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-50 font-light max-w-sm ml-auto mr-0">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
