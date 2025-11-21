'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Database, BarChart3, Terminal, Cloud, Calculator, Cpu, Code2, Layers } from 'lucide-react';

// --- Data & Types ---
type Category = 'All' | 'Backend' | 'Visualization' | 'Data Science' | 'Cloud';

interface Skill {
  name: string;
  category: Category;
  level: number;
  description: string;
  icon: any;
  color: string;
}

const skills: Skill[] = [
  {
    name: 'Python',
    category: 'Backend',
    level: 95,
    description: 'Data processing & ML pipelines',
    icon: Terminal,
    color: '#3b82f6', // Blue
  },
  {
    name: 'SQL',
    category: 'Backend',
    level: 98,
    description: 'Complex queries & optimization',
    icon: Database,
    color: '#10b981', // Emerald
  },
  {
    name: 'Power BI',
    category: 'Visualization',
    level: 90,
    description: 'Dashboard & report design',
    icon: BarChart3,
    color: '#f59e0b', // Amber
  },
  {
    name: 'Tableau',
    category: 'Visualization',
    level: 88,
    description: 'Interactive analytics',
    icon: Layers,
    color: '#ef4444', // Red
  },
  {
    name: 'Excel',
    category: 'Data Science',
    level: 92,
    description: 'Advanced formulas & VBA',
    icon: Calculator,
    color: '#22c55e', // Green
  },
  {
    name: 'R',
    category: 'Data Science',
    level: 85,
    description: 'Statistical analysis',
    icon: Code2,
    color: '#8b5cf6', // Violet
  },
  {
    name: 'Pandas',
    category: 'Data Science',
    level: 94,
    description: 'Data manipulation',
    icon: Cpu,
    color: '#6366f1', // Indigo
  },
  {
    name: 'AWS',
    category: 'Cloud',
    level: 80,
    description: 'Data warehousing',
    icon: Cloud,
    color: '#f97316', // Orange
  },
];

// --- Components ---

// 1. The "Neural Plate" Card
const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.2, 0.8]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative h-[200px] w-full perspective-1000"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative h-full w-full rounded-3xl bg-gray-900/40 border border-white/10 backdrop-blur-md overflow-hidden group cursor-default"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glare Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
          style={{
            background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 80%)`,
            filter: useMotionTemplate`brightness(${brightness})`,
          }}
        />

        {/* Internal Circuit Pattern */}
        <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500 z-0"
             style={{ 
                backgroundImage: `radial-gradient(${skill.color} 1px, transparent 0)`, 
                backgroundSize: '12px 12px' 
             }} 
        />

        <div className="relative z-10 h-full p-6 flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div 
              className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform duration-300"
              style={{ color: skill.color }}
            >
              <skill.icon size={24} />
            </div>
            <div className="text-right">
              <span className="block text-3xl font-mono font-bold text-white">{skill.level}%</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Proficiency</span>
            </div>
          </div>

          {/* Content */}
          <div>
             <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
               {skill.name}
             </h3>
             <p className="text-sm text-gray-400 font-mono">{skill.description}</p>
          </div>

          {/* Progress Bar (Bottom) */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-4">
             <motion.div 
                className="h-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
             />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Section ---
export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const categories: Category[] = ['All', 'Backend', 'Visualization', 'Data Science', 'Cloud'];

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return skills;
    return skills.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 bg-black border-t border-white/5 overflow-hidden">
      
      {/* --- Background FX --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Circuit Lines */}
         <svg className="absolute top-0 left-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
               <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
         </svg>
         
         {/* Gradient Orbs */}
         <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <p className="text-emerald-500 font-mono text-xs tracking-[0.2em] uppercase">System Competencies</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Technical <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                Stack.
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
               A comprehensive breakdown of data processing, visualization, and infrastructure capabilities.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div 
             className="flex flex-wrap gap-2"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="popLayout">
             <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
             >
               {filteredSkills.map((skill, idx) => (
                 <SkillCard key={skill.name} skill={skill} index={idx} />
               ))}
             </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Stats Decoration */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-wrap gap-12 opacity-50">
           <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded-lg"><Database size={20} className="text-white"/></div>
              <div>
                 <p className="text-[10px] font-mono uppercase text-gray-500">Total Technologies</p>
                 <p className="text-white font-bold">{skills.length} Modules Active</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded-lg"><Terminal size={20} className="text-white"/></div>
              <div>
                 <p className="text-[10px] font-mono uppercase text-gray-500">Core Focus</p>
                 <p className="text-white font-bold">Data Engineering</p>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}