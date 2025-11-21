'use client';

import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate,
} from 'framer-motion';
import { useRef, useState, useEffect, useCallback, MouseEvent as ReactMouseEvent } from 'react';

// --- DATA ---
interface ExperienceEntry {
  id: string; // Changed to string for a cooler ID look like "01"
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  theme: string; // Main color tone
  gradient: string; // Tailwind gradient classes
}

const experiences: ExperienceEntry[] = [
  {
    id: '01',
    title: 'Senior Data Analyst',
    company: 'TechCorp Analytics',
    period: '2022 - Present',
    description: 'Architecting enterprise data warehouses and leading high-velocity analyst squads to transform raw metrics into actionable business intelligence.',
    technologies: ['SQL', 'Python', 'AWS Redshift', 'Apache Spark'],
    theme: '#10b981', // Emerald
    gradient: 'from-emerald-500/20 via-teal-500/5 to-transparent',
  },
  {
    id: '02',
    title: 'Data Visualization Lead',
    company: 'DataViz Solutions',
    period: '2020 - 2022',
    description: 'Bridging the gap between complex datasets and human intuition through the creation of intuitive, predictive modeling dashboards.',
    technologies: ['Tableau', 'R Studio', 'PostgreSQL', 'Salesforce API'],
    theme: '#3b82f6', // Blue
    gradient: 'from-blue-500/20 via-indigo-500/5 to-transparent',
  },
  {
    id: '03',
    title: 'Junior Business Analyst',
    company: 'Finance Corp',
    period: '2019 - 2020',
    description: 'Optimized financial reporting workflows by developing automated VBA frameworks and advanced forecasting models.',
    technologies: ['Advanced Excel', 'VBA', 'MS SQL Server', 'Power Query'],
    theme: '#f97316', // Orange
    gradient: 'from-orange-500/20 via-rose-500/5 to-transparent',
  },
];

// --- THE NEW "QUANTUM GLASS" CARD ---
const ExperienceCard = ({ item }: { item: ExperienceEntry }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Create a dynamic border glow that follows the mouse
  const borderHighlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${item.theme}50, transparent 80%)`;

  return (
    <motion.div
      className="group relative h-[500px] w-[90vw] md:w-[480px] lg:h-[580px] lg:w-[550px] flex-shrink-0 rounded-[2rem] overflow-hidden select-none perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01, y: -5 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* 1. The Base Glass Layer & Noise Texture */}
      <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-2xl rounded-[2rem] border border-white/10">
         {/* Noise overlay for materiality */}
         <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
         />
      </div>

      {/* 2. The Reactive Border Glow (Mouse follower) */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ 
          border: '1px solid transparent',
          background: borderHighlight,
          maskImage: 'linear-gradient(white, white)',
          // This trick applies the gradient only to the border area
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* 3. Internal Ambient "Energy Orb" */}
      <motion.div 
         className={`absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br ${item.gradient} blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity duration-700`}
         animate={{ 
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 90 : 0
         }}
         transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* 4. Content Layer */}
      <div className="relative h-full flex flex-col p-8 md:p-10 z-20">
        {/* Header: ID and Period */}
        <div className="flex justify-between items-start mb-10">
          <div 
            className="h-14 w-14 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl"
            style={{ boxShadow: isHovered ? `0 0 30px -10px ${item.theme}` : '' }}
          >
            <span className="text-white font-bold font-mono text-2xl tracking-tighter" style={{ color: item.theme }}>{item.id}</span>
          </div>
          {/* Glass Pill for Date */}
          <div className="px-4 py-2 rounded-full border border-white/10 bg-gray-900/30 backdrop-blur-md flex items-center gap-3 shadow-sm">
             <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: item.theme }} />
             <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">{item.period}</span>
          </div>
        </div>

        {/* Title & Company */}
        <div className="mb-8 relative">
          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-none tracking-tight">
            {item.title}
          </h3>
          <p className="text-lg text-gray-400 font-mono flex items-center gap-2">
            <span style={{ color: item.theme }}>//</span> {item.company}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-10 text-sm md:text-base font-light border-l-2 border-white/5 pl-6">
          {item.description}
        </p>

        {/* Footer: Tech Stack "Levitating Chips" */}
        <div className="mt-auto">
          <p className="text-xs font-mono text-gray-500 mb-4 uppercase tracking-widest">Core Technologies</p>
          <div className="flex flex-wrap gap-3">
            {item.technologies.map((tech, i) => (
              <motion.span 
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3, boxShadow: `0 5px 15px -5px ${item.theme}40` }}
                className="text-xs font-medium text-gray-300 bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:border-white/20 hover:text-white transition-all cursor-default backdrop-blur-sm shadow-sm"
                style={{ hover: { borderColor: item.theme } }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN SECTION (The Engine - Unchanged functionally) ---
export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // The exact x position of the track
  const x = useMotionValue(0);
  // Smooth physics for the wheel scroll
  const smoothX = useSpring(x, { damping: 40, stiffness: 300 });
  
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  // Update scroll constraints on resize
  const updateConstraints = useCallback(() => {
    if (trackRef.current && containerRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      // Add padding (200px) to allow pulling the last card fully into view center
      setConstraints({ left: -(trackWidth - containerWidth + 200), right: 0 });
    }
  }, []);

  useEffect(() => {
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    // A slight delay to ensure fonts/layout are loaded before calculating width
    const timeout = setTimeout(updateConstraints, 500);
    return () => {
      window.removeEventListener('resize', updateConstraints);
      clearTimeout(timeout);
    }
  }, [updateConstraints]);

  // --- THE HYBRID SCROLL ENGINE ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const isVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (isVertical) {
        const currentX = x.get();
        // Speed up the scroll a bit with a multiplier (* 1.5)
        const newX = currentX - (e.deltaY * 1.5); 

        const isAtStart = currentX >= 0 && e.deltaY < 0;
        const isAtEnd = currentX <= constraints.left && e.deltaY > 0;

        if (!isAtStart && !isAtEnd) {
           e.preventDefault();
           x.set(Math.max(constraints.left, Math.min(0, newX)));
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [constraints, x]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-black min-h-screen flex flex-col justify-center overflow-hidden py-24"
    >
      {/* --- Background FX --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Subtle deep grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-32 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none">
              Professional <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Chronology.</span>
            </h2>
            <div className="flex items-center gap-6">
               <div className="h-px w-12 bg-gray-700" />
               <p className="text-gray-400 text-lg max-w-md font-light leading-relaxed">
                  A timeline of technical leadership and data-driven transformation. Drag or scroll to explore.
               </p>
            </div>
          </motion.div>
        </div>

        {/* --- Interactive Track --- */}
        <motion.div 
          className="w-full overflow-visible cursor-grab active:cursor-grabbing px-6 md:px-12 lg:px-32 py-10"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div 
            ref={trackRef}
            style={{ x: smoothX }}
            drag="x"
            dragConstraints={constraints}
            dragElastic={0.15}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            className="flex gap-8 md:gap-12 lg:gap-16 w-max pl-4"
          >
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} item={experience} />
            ))}

            {/* End Marker */}
            <div className="w-[200px] md:w-[300px] flex flex-col items-center justify-center opacity-30 group hover:opacity-100 transition-opacity">
               <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-6 group-hover:border-white/50 group-hover:scale-110 transition-all">
                 <span className="text-3xl">✨</span>
               </div>
               <p className="font-mono text-sm text-gray-400 uppercase tracking-widest">What's Next?</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}