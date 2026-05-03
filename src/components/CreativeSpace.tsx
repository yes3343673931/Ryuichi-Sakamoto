import { motion } from 'motion/react';
import React, { useRef, useEffect, useState } from 'react';

export default function CreativeSpace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedElement, setSelectedElement] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const elements = [
    { emoji: '🎹', color: 'rgba(255, 255, 255, 0.1)', sound: 'https://cdn.freesound.org/previews/203/203460_3457198-lq.mp3' }, // Piano
    { emoji: '🌊', color: 'rgba(100, 180, 255, 0.1)', sound: 'https://cdn.freesound.org/previews/400/400632_1648170-lq.mp3' }, // Water
    { emoji: '🍃', color: 'rgba(140, 200, 140, 0.1)', sound: 'https://cdn.freesound.org/previews/173/173921_1333148-lq.mp3' }, // Leaves
    { emoji: '🎐', color: 'rgba(200, 160, 255, 0.1)', sound: 'https://cdn.freesound.org/previews/339/339810_5121236-lq.mp3' }  // Chime
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      life: number;
      maxLife: number;
      color: string;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.maxLife = Math.random() * 150 + 80;
        this.life = this.maxLife;
        this.color = color;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
      }

      draw() {
        if (!ctx) return;
        const opacity = this.life / this.maxLife;
        ctx.fillStyle = this.color.replace('0.1)', `${opacity * 0.4})`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        particles.forEach(p => {
          const dx = this.x - p.x;
          const dy = this.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.strokeStyle = this.color.replace('0.1)', `${opacity * (1 - dist/60) * 0.1})`);
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        });
      }
    }

    const handleResize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };

    const onInteraction = (x: number, y: number) => {
      setIsActive(true);
      const currentElement = elements[selectedElementRef.current];
      
      for(let i = 0; i < 3; i++) {
        particles.push(new Particle(x, y, currentElement.color));
      }

      if (Math.random() > 0.95) {
        const audio = new Audio(currentElement.sound);
        audio.volume = 0.1;
        audio.play().catch(() => {});
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      onInteraction(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      onInteraction(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (particles.length < 100 && Math.random() > 0.9) {
        const currentElement = elements[selectedElementRef.current];
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, currentElement.color));
      }

      particles = particles.filter(p => {
        p.update();
        p.draw();
        return p.life > 0;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Use a ref to access selected element inside the animation/event loop without closure issues
  const selectedElementRef = useRef(selectedElement);
  useEffect(() => {
    selectedElementRef.current = selectedElement;
  }, [selectedElement]);

  // Interaction handling is now managed by event listeners inside useEffect

  return (
    <div className="max-w-6xl mx-auto px-8 py-32">
      <div className="text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 italic">互动环节 / Interactive Session</span>
        <h2 className="font-serif text-5xl mt-4 font-extralight tracking-tight">共创 / Co-create</h2>
        <p className="mt-6 text-sm opacity-40 font-light max-w-xl mx-auto leading-relaxed uppercase tracking-[0.2em]">
          挥动光标，在寂静中生成未完成的回响<br/>
          <span className="text-[10px] lowercase italic opacity-30">Move your cursor to generate unfinished resonance</span>
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[600px] border border-white/5 bg-[#080808] overflow-hidden cursor-crosshair group rounded-2xl"
      >
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 z-10"
        />
        
        {/* Interaction Prompt Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ opacity: isActive ? 0 : [0.2, 0.4, 0.2], y: isActive ? -20 : 0 }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-[10px] uppercase tracking-[1em] font-light text-center"
          >
            触碰静谧 / Touch the silence
          </motion.div>
        </div>

        {/* Ambient "Sound Layer" Visuals */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none" 
          style={{ 
            background: `radial-gradient(circle at center, ${elements[selectedElement].color.replace('0.1)', '0.05)')} 0%, transparent 70%)`,
            opacity: isActive ? 1 : 0 
          }}
        />

        {/* Bottom Layer Controls (Glassy) */}
        <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-3">
          <div className="text-[9px] tracking-[0.3em] uppercase opacity-30">声音元素 / Sonic Elements</div>
          <div className="flex gap-3">
            {elements.map((el, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedElement(idx);
                }}
                className={`w-10 h-10 rounded-full glass flex items-center justify-center text-sm transition-all ${
                  selectedElement === idx ? 'bg-white text-black opacity-100 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {el.emoji}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
