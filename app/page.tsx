'use client';

import HeroSection from '@/components/sections/hero';
import ControlPanel from '@/components/sections/control-panel';
import SkillsSection from '@/components/sections/skills';
import ProjectsGallery from '@/components/sections/projects';
import ExperienceTimeline from '@/components/sections/experience';
import SignalFooter from '@/components/sections/signal-footer';
import CustomCursor from '@/components/custom-cursor';
import Crosshair from '@/components/Crosshair';


export default function Home() {
  return (
    <main className="relative bg-void-black text-blinding-white overflow-hidden">
      <HeroSection />
      {/* <Crosshair /> */}
      <SkillsSection />
      <ProjectsGallery />
      {/* <ExperienceTimeline /> */}
      <SignalFooter />
    </main>
  );
}
