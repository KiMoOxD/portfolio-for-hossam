'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Copy, Check, ArrowUpRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import ProfileCard from '@/components/ProfileCard'; // Ensure this points to your ProfileCard file
import logo from '@/public/me.png'

// --- Components ---

const MagneticButton = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={className}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
};

const SocialLink = ({ href, icon: Icon }: { href: string, icon: any }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group relative p-2 md:p-4">
      <MagneticButton className="relative z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-colors duration-300">
        <Icon size={20} />
      </MagneticButton>
      <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
    </a>
  );
};

// --- Main Footer ---
export default function SignalFooter() {
  const [time, setTime] = useState('');
  const [copied, setCopied] = useState(false);
  const email = "me@hossam.amr";

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative w-full bg-black overflow-hidden border-t border-white/10">
      
      {/* --- Global Background FX --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20 perspective-1000">
           <motion.div 
             className="absolute inset-0"
             style={{
               backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
               backgroundSize: '60px 60px',
               transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)'
             }}
             animate={{ backgroundPosition: ['0px 0px', '0px 60px'] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* --- Content Container --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">
        
        {/* GRID LAYOUT: Split Text Left, Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center mb-24">
          
          {/* LEFT: The Signal (Text & Actions) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                 <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                 </span>
                 <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase">System Online</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 leading-tight">
                Let's decode <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                  the future.
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                Ready to transform complex data into clarity? Initialize the connection below.
              </p>
            </motion.div>

            {/* Action Buttons Group */}
            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Magnetic Email Pill */}
                <motion.div 
                   className="relative group"
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                >
                   <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500" />
                   <button 
                     onClick={handleCopy}
                     className="relative flex items-center gap-4 px-8 py-4 bg-gray-900 border border-white/10 rounded-full hover:bg-gray-800 transition-all duration-300"
                   >
                      <Mail className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                      <span className="text-lg font-mono text-white">{email}</span>
                      <div className="w-px h-6 bg-white/10 mx-2" />
                      <div className="text-gray-400 group-hover:text-white transition-colors">
                         <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                 <Check size={20} className="text-emerald-400" />
                              </motion.div>
                            ) : (
                              <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                 <Copy size={20} />
                              </motion.div>
                            )}
                         </AnimatePresence>
                      </div>
                   </button>
                </motion.div>

                {/* Quick Socials (Mobile/Desktop inline) */}
                <div className="flex gap-2">
                  <SocialLink href="https://github.com" icon={Github} />
                  <SocialLink href="https://linkedin.com" icon={Linkedin} />
                </div>
            </div>
          </div>

          {/* RIGHT: The Avatar (Profile Card) */}
          <div className="relative order-1 lg:order-2 flex justify-center items-center perspective-1000">
             
             {/* Connection Line (Desktop Visual) */}
             <motion.div 
                className="hidden lg:block absolute top-1/2 -left-20 w-20 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-emerald-500" 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                style={{ transformOrigin: 'left' }}
             />
             {/* <motion.div 
               className="hidden lg:block absolute top-1/2 -left-0 w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: 1.8 }}
             /> */}

             {/* The Card Container */}
             <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -20 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
                className="relative z-20"
             >
                <ProfileCard 
                   avatarUrl={logo.src} 
                   miniAvatarUrl={logo.src}
                   name="Hossam Amr"
                   title="Data Analyst"
                   handle="hossam_dev"
                   status="Available"
                   contactText="Say Hello"
                   onContactClick={handleCopy}
                   behindGlowColor="#10b981"
                   enableTilt={true}
                />
             </motion.div>

             {/* Decorative Floor Glow under the card */}
             <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-24 bg-emerald-500/20 blur-[50px] rounded-full pointer-events-none" />
          </div>
        </div>

        {/* --- Bottom Info Bar --- */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 gap-6 text-xs md:text-sm font-mono text-gray-500">
           
           <div className="flex items-center gap-2">
              <span>SERVER TIME</span>
              <span className="text-white px-2 py-1 bg-white/5 border border-white/5 rounded">{time} UTC+2</span>
           </div>

           <div className="flex items-center gap-6">
              <span>© 2025 HOSSAM AMR</span>
              <div className="w-1 h-1 bg-gray-700 rounded-full" />
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">PRIVACY_PROTOCOL</span>
           </div>

           <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="group flex items-center gap-2 text-white hover:text-emerald-400 transition-colors"
           >
              RETURN TO SURFACE
              <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" size={16} />
           </button>
        </div>

      </div>
    </footer>
  );
}