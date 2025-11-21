"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Database, Terminal, Activity } from "lucide-react";

// --- Dynamic Imports ---
const Dither = dynamic(() => import("@/components/dither"), { ssr: false });
const TextPressure = dynamic(() => import("@/components/TextPressure"), {
  ssr: false,
});

// --- Utility Component: Magnetic Button ---
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3); // Pull strength
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="group relative px-8 py-4 bg-transparent border border-white/20 hover:border-white/80 transition-colors duration-500 overflow-hidden"
    >
      <span className="relative z-10 flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-white mix-blend-difference">
        {children}
      </span>
      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.button>
  );
};

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Mouse tracking for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Spotlight gradient
  const background = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.03),
    transparent 80%
  )`;

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] selection:bg-white selection:text-black">
      
      {/* --- Layer 1: Background & Grain --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {mounted && (
          <div className="absolute inset-0 opacity-30 mix-blend-color-dodge">
             {/* Your Dither component is excellent, kept here but lowered opacity for subtlety */}
            <Dither
              waveColor={[0.5, 0.5, 0.5]}
    disableAnimation={false}
    enableMouseInteraction={true}
    mouseRadius={0.3}
    colorNum={4}
    waveAmplitude={0.3}
    waveFrequency={3}
    waveSpeed={0.05}
            />
          </div>
        )}

        <motion.div
          className="absolute inset-0 z-10"
          style={{ background }}
        />
      </div>

      {/* --- Layer 2: HUD / Technical Frame --- */}
      {/* This adds the "Analyst" vibe */}
      <div className="absolute inset-4 md:inset-8 z-20 border border-white/5 pointer-events-none flex flex-col justify-between">
        {/* Top Row */}
        <div className="flex justify-between p-4">
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
            <Terminal size={12} />
            <span>SYS.READY</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
            <span>30°01'N / 31°13'E</span> {/* Cairo Lat/Long roughly */}
            <Activity size={12} />
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="flex justify-between p-4">
          <div className="text-[10px] font-mono text-white/40">
             {mousePosition.x}X / {mousePosition.y}Y
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
            <Database size={12} />
            <span>DATA STREAM: LIVE</span>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/40" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-white/40" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-white/40" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/40" />
      </div>

      {/* --- Layer 3: Main Content --- */}
      <div className="relative z-30 w-full max-w-7xl px-6 flex flex-col items-center text-center">
        
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/50"></span>
          <span className="font-mono text-xs md:text-sm tracking-[0.4em] text-white/60 uppercase">
            I'M
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-white/50"></span>
        </motion.div>

        {/* Main Title - Wrapper to handle responsive scaling of TextPressure */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full relative mb-8 h-[120px] md:h-[200px] flex items-center justify-center select-none"
        >
          <div className="absolute inset-0 w-full h-full">
             {/* Note: TextPressure handles its own responsiveness mostly, but the container confines it */}
            <TextPressure
              text="HOSSAM AMR"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#ffffff"
              minFontSize={40}
            />
          </div>
        </motion.div>

        {/* Animated Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-10 relative"
        >
            <div className="overflow-hidden">
                <p className="font-mono text-sm md:text-lg tracking-[0.2em] text-white/80 uppercase relative z-10">
                    <span className="text-red-500 mr-2">{">"}</span>
                    Data Analyst & Engineer
                </p>
            </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/50 font-sans text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-12 tracking-wide"
        >
          Transforming raw signals into actionable intelligence. 
          Specializing in SQL, Python, and predictive modeling to decode complex systems.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <MagneticButton>
            Explore Work <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </motion.div>
      </div>

      {/* --- Decorative Scroll Indicator --- */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Scroll to Initialize</p>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
            <motion.div 
                className="absolute top-0 w-full h-1/2 bg-white"
                animate={{ top: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
        </div>
      </motion.div>

    </section>
  );
}