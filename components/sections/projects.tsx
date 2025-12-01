'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, BarChart3, Layers, Zap, Activity } from 'lucide-react';

// --- Types ---
interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  stats: { label: string; value: string }[];
  image: string;
  tags: string[];
  color: string; // Hex or Tailwind color reference
  link: string;
}

const projects: Project[] = [
  {
    id: '01',
    title: 'E-Commerce Power BI',
    description: '$3.14M E-Commerce Power BI Dashboard | Japan +31.8% | Smartwatch +27.7% | Live + Full .pbix 🚀🇪🇬',
    category: 'BI & Analytics',
    stats: [
      { label: 'Revenue', value: '$3.14M' },
      { label: 'Growth', value: '+31.8%' },
    ],
    image: '/E-Commerce-PowerBI-Dashboard.png', // Replace with real image
    tags: ['Power BI', 'Data Visualization'],
    color: '#10b981', // Emerald
    link: 'https://github.com/HOSSAM-AMRR/E-Commerce-PowerBI-Dashboard',
  },
  {
    id: '02',
    title: 'Sales & Marketing Strategy',
    description: 'Comprehensive strategic analysis of Sales and Marketing performance. Features two integrated dashboards to optimize marketing ROI.',
    category: 'Strategy',
    stats: [
      { label: 'Dashboards', value: '2' },
      { label: 'Focus', value: 'ROI' },
    ],
    image: '/Sales-Marketing-Strategy-Review.png',
    tags: ['Strategy', 'Marketing', 'Analysis'],
    color: '#8b5cf6', // Violet
    link: 'https://github.com/HOSSAM-AMRR/Sales-Marketing-Strategy-Review',
  },
  {
    id: '03',
    title: 'Sales Profitability',
    description: 'Deep analysis of sales profitability, customer segmentation, and product performance. Derived from Excel sources to optimize margins.',
    category: 'Analysis',
    stats: [
      { label: 'Source', value: 'Excel' },
      { label: 'Goal', value: 'Margins' },
    ],
    image: '/Advanced-Sales-Profitability-Analysis.png',
    tags: ['Excel', 'Segmentation', 'Profitability'],
    color: '#f59e0b', // Amber
    link: 'https://github.com/HOSSAM-AMRR/Advanced-Sales-Profitability-Analysis',
  },
  {
    id: '04',
    title: 'E-commerce Sales EDA',
    description: 'Deep exploratory data analysis (EDA) using Python/Pandas to identify core revenue drivers and customer segmentation.',
    category: 'Data Science',
    stats: [
      { label: 'Tech', value: 'Python' },
      { label: 'Focus', value: 'EDA' },
    ],
    image: '/api/placeholder/800/600',
    tags: ['Python', 'Pandas', 'EDA'],
    color: '#3b82f6', // Blue
    link: 'https://github.com/HOSSAM-AMRR/E-commerce-Sales-EDA-Strategy',
  },
];

// --- Components ---

// 1. The Holographic Preview Window (Desktop Right Side)
const ProjectPreview = ({ activeProject }: { activeProject: Project }) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-gray-900/50 backdrop-blur-xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          className="relative h-full w-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background Image */}
          < div className="absolute inset-0 bg-gray-800" >
            {/* Replace src with activeProject.image */}
            {
              !activeProject.image.includes('api/placeholder') ? (
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover opacity-50"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black opacity-50" />
              )
            }

            {/* Placeholder pattern to simulate image */}
            {
              activeProject.image.includes('api/placeholder') && (
                <div className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `radial-gradient(${activeProject.color} 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                  }}
                />
              )
            }

            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />
          </div >

          {/* Content Overlay */}
          < div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 bg-gradient-to-t from-black via-black/20 to-transparent" >

            {/* Top Badge */}
            < div className="flex justify-between items-start" >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="px-4 py-2 rounded-full backdrop-blur-md border border-white/10 bg-black/30 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeProject.color }} />
                <span className="text-xs font-mono text-white/80 uppercase tracking-widest">{activeProject.category}</span>
              </motion.div>

              <motion.a
                href={activeProject.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.a>
            </div >

            {/* Bottom Info */}
            < div >
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-lg leading-tight"
              >
                {activeProject.title}
              </motion.h3>

              <div className="flex flex-wrap gap-3 mb-8">
                {activeProject.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="text-xs font-mono px-3 py-1.5 rounded bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg w-fit"
              >
                {activeProject.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">{stat.label}</span>
                    <span className="text-xl font-mono font-bold text-white">{stat.value}</span>
                  </div>
                ))}
              </motion.div>
            </div >
          </div >
        </motion.div >
      </AnimatePresence >
    </div >
  );
};

// 2. The List Item (Desktop Left Side)
const ProjectListItem = ({
  project,
  isActive,
  onClick
}: {
  project: Project;
  isActive: boolean;
  onClick: () => void
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`group relative p-6 cursor-pointer rounded-2xl transition-all duration-300 border ${isActive ? 'border-white/10' : 'border-transparent'}`}
      whileHover={{ x: 10 }}
    >
      {/* Active Background Highlight */}
      {isActive && (
        <motion.div
          layoutId="activeProjectBackground"
          className="absolute inset-0 bg-white/5 rounded-2xl"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <div className="relative z-10 flex justify-between items-center">
        <div>
          <p className={`text-xs font-mono mb-2 transition-colors ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
            0{projects.indexOf(project) + 1} / {project.category}
          </p>
          <h4 className={`text-xl font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
            {project.title}
          </h4>
        </div>

        {/* Active Indicator Arrow */}
        <motion.div
          animate={{
            opacity: isActive ? 1 : 0,
            x: isActive ? 0 : -10
          }}
          className="text-white"
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color, boxShadow: `0 0 10px ${project.color}` }} />
        </motion.div>
      </div>
    </motion.div>
  );
};

// 3. Mobile Card (Displayed only on < lg screens)
const MobileProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl mb-8 group"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />

      {/* Background Image/Pattern */}
      <div className="absolute inset-0 bg-gray-800 opacity-50" />

      {!project.image.includes('api/placeholder') ? (
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
      ) : (
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `radial-gradient(${project.color} 1px, transparent 0)`, backgroundSize: '20px 20px' }}
        />
      )}

      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/70 backdrop-blur-md">
            {project.category}
          </span>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <ArrowUpRight className="text-white w-5 h-5" />
          </a>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2">{project.description}</p>

        <div className="flex gap-4 border-t border-white/10 pt-4">
          {project.stats.map((stat, i) => (
            <div key={i}>
              <p className="text-[10px] text-gray-500 uppercase">{stat.label}</p>
              <p className="text-lg text-white font-mono font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function ProjectsShowcase() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const activeProject = projects.find(p => p.id === activeId) || projects[0];

  return (
    <section id="projects" className="relative bg-black py-24 px-6 md:px-12 lg:px-24 overflow-hidden">

      {/* Ambient Background Noise & Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Glowing Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <p className="text-emerald-400 font-mono text-sm tracking-[0.2em] mb-4">/// SELECTED WORKS</p>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                Project <span className="text-gray-700">Index.</span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-sm text-sm md:text-base leading-relaxed border-l border-white/10 pl-6">
              A curated collection of data engineering pipelines, ML models, and analytics dashboards built for scale.
            </p>
          </motion.div>
        </div>

        {/* --- DESKTOP LAYOUT (LG+) --- */}
        <div className="hidden lg:grid grid-cols-12 gap-12 h-[600px]">

          {/* Left: Project List */}
          <div className="col-span-5 flex flex-col justify-center space-y-2">
            {projects.map((project) => (
              <ProjectListItem
                key={project.id}
                project={project}
                isActive={activeId === project.id}
                onClick={() => setActiveId(project.id)}
              />
            ))}
          </div>

          {/* Right: Holographic Preview */}
          <div className="col-span-7">
            <ProjectPreview activeProject={activeProject} />
          </div>
        </div>

        {/* --- MOBILE LAYOUT (< LG) --- */}
        <div className="lg:hidden flex flex-col">
          {projects.map((project, index) => (
            <MobileProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Footer / CTA */}
        <div className="mt-16 flex justify-center">
          <a href="https://github.com/HOSSAM-AMRR?tab=repositories" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 rounded-full bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-colors inline-block">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="text-white font-mono text-sm tracking-widest flex items-center gap-2">
              VIEW GITHUB ARCHIVE <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}