/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, MotionValue } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { projects } from "@/app/constants";
import Link from 'next/link';
// import GlassSurface from './GlassEffect';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll value for fluid animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001
  });

  // Segments: 
  // Desktop: 0 (Intro) + 1..N (Projects) + N+1 (Grid) -> Total: N + 2
  // Mobile: 0 (Intro) + 1..N (Projects) -> Total: N + 1
  const totalSegments = projects.length + (isMobile ? 1 : 2);
  // Increase height per segment to allow "stickiness"
  const height = `${totalSegments * 150}vh`;

  const scrollToSegment = (index: number, isGrid = false) => {
    if (!containerRef.current) return;
    
    // Projects: Index 0 -> Segment 0.8 (Shifted)
    // Grid: Index N -> Segment N+0.8 (Shifted)
    
    let targetSegment;
    
    if (isGrid) {
        targetSegment = projects.length + 0.8;
    } else {
        targetSegment = index + 0.8;
    }
    
    const segmentHeight = window.innerHeight * 1.5; // Match the 150vh scale
    const offset = targetSegment * segmentHeight;
    const containerTop = containerRef.current.offsetTop;
    
    window.scrollTo({
      top: containerTop + offset,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={containerRef} id="projects" className="relative" style={{ height }}>


      <style jsx global>{`
        html {
          scroll-snap-type: y proximity;
        }
      `}</style>
      
      {/* Snap Points */}
      {Array.from({ length: totalSegments }).map((_, i) => (
        <div key={i} className="absolute w-full h-[150vh] snap-start pointer-events-none" style={{ top: `${i * 150}vh` }} />
      ))}
      
      <div className="sticky top-0 h-screen overflow-hidden">
        {projects.map((project, index) => {
          // Determine the active range for this project
          // Shift by 1 segment to account for Intro
          const step = 1 / totalSegments;
          const start = (index + 0.25) * step; // Start earlier to overlap and reduce gap
          const end = start + step;
          const isLast = index === projects.length - 1;
          
          return (
            <ProjectItem 
              key={project.id} 
              project={project} 
              index={index} 
              totalSegments={totalSegments}
              globalProgress={smoothProgress}
              range={[start, end]}
              isLast={isLast}
              isMobile={isMobile}
            />
          );
        })}

        {/* Final Grid View - Only on Desktop */}
        {!isMobile && (
          <SummaryGrid 
            projects={projects} 
            globalProgress={smoothProgress} 
            range={[(projects.length + 0.8) / totalSegments, 1]} 
          />
        )}
        
        {/* Navigation Buttons */}
        <div className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-end pointer-events-none">
          <div className="pointer-events-auto flex flex-col gap-4 items-end">
            {projects.map((project, i) => (
                <NavButton 
                    key={i} 
                    index={i} 
                    globalProgress={smoothProgress} 
                    totalSegments={totalSegments} 
                    onClick={() => scrollToSegment(i)}
                />
            ))}
            {/* Grid Button - Only on Desktop */}
            {!isMobile && (
                <NavButton 
                    index={projects.length} 
                    globalProgress={smoothProgress} 
                    totalSegments={totalSegments} 
                    isGrid 
                    onClick={() => scrollToSegment(projects.length, true)}
                />
            )}
          </div>
        </div>
        
        {/* Section Title Overlay - Intro Segment */}
        <SectionHeader progress={smoothProgress} range={[0, 1 / totalSegments]} />
      </div>
    </section>
  );
}

// --- Types ---
type Project = typeof projects[0];

// --- Components ---

function NavButton({ 
  index, 
  globalProgress, 
  totalSegments, 
  isGrid = false,
  onClick
}: { 
  index: number, 
  globalProgress: MotionValue<number>, 
  totalSegments: number, 
  isGrid?: boolean,
  onClick: () => void
}) {
    const segmentIndex = isGrid ? index + 1 : index + 0.8;
    const step = 1 / totalSegments;
    const start = segmentIndex * step;
    const end = start + step;

    const isActive = useTransform(globalProgress, (v) => v >= start && v < end ? 1 : 0.4);
    const scale = useTransform(globalProgress, (v) => v >= start && v < end ? 1.5 : 1);
    
    return (
        <motion.button 
            onClick={onClick}
            style={{ opacity: isActive, scale }}
            className="group flex items-center justify-end p-2 focus:outline-none transition-all duration-300"
        >
            <div className={`rounded-full bg-white transition-all duration-300 ${isGrid ? 'w-3 h-3' : 'w-2 h-2'} group-hover:scale-125 shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
        </motion.button>
    )
}

function SectionHeader({ progress, range }: { progress: MotionValue<number>, range: [number, number] }) {
    const opacity = useTransform(progress, [range[0], range[1] - 0.05], [1, 0]);
    const scale = useTransform(progress, [range[0], range[1]], [1, 0.8]);
    const y = useTransform(progress, [range[0], range[1]], [0, -100]);

    return (
        <motion.div 
            style={{ opacity, scale, y }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
        >
             <div className="text-center px-4">
                <h2 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter">
                    SELECTED<br/>WORKS
                </h2>
                <p className="text-xl text-white/50 font-light">
                    A collection of digital experiences
                </p>
             </div>
        </motion.div>
    )
}


function SummaryGrid({ 
  projects, 
  globalProgress, 
  range 
}: { 
  projects: Project[], 
  globalProgress: MotionValue<number>, 
  range: [number, number] 
}) {
  const opacity = useTransform(globalProgress, [range[0] - 0.05, range[0]], [0, 1]);
  const scale = useTransform(globalProgress, [range[0] - 0.05, range[0]], [0.95, 1]);
  const y = useTransform(globalProgress, [range[0] - 0.05, range[0]], [50, 0]);
  
  // Only render/animate when we are near the end
  const zIndex = useTransform(globalProgress, (v) => v >= range[0] - 0.05 ? 40 : 0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll when user leaves the grid section (scrolls up) or on mount
    if (containerRef.current) {
        containerRef.current.scrollTop = 0;
    }

    const unsubscribe = globalProgress.on("change", (latest) => {
      // If we are before the visible range (scrolling up away from grid), reset scroll
      // Use a buffer so we don't reset while it's still visible
      if (latest < range[0] - 0.1 && containerRef.current) { 
         containerRef.current.scrollTop = 0;
      }
    });
    return unsubscribe;
  }, [globalProgress, range]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity, scale, y, zIndex }}
      className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none] backdrop-blur-xl"
    >
      <div className="w-full max-w-7xl mx-auto p-8 pt-24 min-h-full mt-10">
        <h3 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter text-center">
          ALL PROJECTS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pb-20">
          {projects.map((project, i) => (
            <GridItem key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function GridItem({ project, index }: { project: Project, index: number }) {
  return (
    <Link 
      href={project.repo || '#'} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer border border-white/10"
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
        
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-sm font-mono text-white/60">0{project.id}</span>
            <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 -translate-y-1" />
          </div>
          
          <div>
            <h4 className="text-3xl font-bold text-white mb-2">{project.title}</h4>
            <p className="text-sm text-neutral-400 line-clamp-2">{project.description}</p>
            <div className="flex gap-2 mt-4">
               {project.tech.slice(0, 3).map((t, i) => (
                 <span key={i} className="text-[10px] px-2 py-1 rounded-full border border-white/20 text-white/80">
                   {t}
                 </span>
               ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function ProjectItem({ 
  project, 
  index, 
  totalSegments,
  globalProgress, 
  isLast = false,
  isMobile = false
}: { 
  project: Project, 
  index: number, 
  totalSegments: number,
  globalProgress: MotionValue<number>, 
  range: [number, number],
  isLast?: boolean,
  isMobile?: boolean
}) {
  // Continuous scrubbing logic
  // Map global progress to total segments (0 to N+3)
  const scrollIndex = useTransform(globalProgress, [0, 1], [0, totalSegments]);
  
  // Calculate active state based on index + 1 (Intro + 1 shift)
  // Intro = 0, Project 0 starts assembling at 0, Peaks at 1
  // Shifted by 0.2 to reduce initial delay
  const activeVal = useTransform(scrollIndex, (v) => v - (index + 0.8)); 

  // Use isLast to avoid unused variable warning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ignored = isLast; 

  // Manage pointer events: only allow clicks when the project is the active one
  const pointerEvents = useTransform(activeVal, (v) => (v >= -0.2 && v <= 0.8) ? 'auto' : 'none');

  // --- Animations ---
  
  // 1. Clip Path Reveal (Iris effect)
  // Incoming: -0.6 -> 0 (Fade in)
  const clipSize = useTransform(activeVal, [-0.6, 0, 0.6], ["0%", "150%", "150%"]);
  const clipPath = useMotionTemplate`circle(${clipSize} at 50% 50%)`;
  
  // 2. Image Scale & Rotation & Resistance
  // 0 -> 0.6: Sticky Phase (slight movement to show resistance)
  // 0.6 -> 1: Exit Phase
  const scale = useTransform(activeVal, [-0.6, 0, 0.6, 1], [0.8, 1, 0.95, 1.1]);
  const rotate = useTransform(activeVal, [-0.6, 0, 0.6, 1], [-10, 0, -2, 0]);
  
  // Opacity: 
  // -0.6 -> 0: Fade In
  // 0 -> 0.6: Fully Visible (Sticky)
  // 0.6 -> 1: Fade Out (Transition to next)
  // If last project, extend visibility to overlap with Grid entry
  const opacity = useTransform(
    activeVal,
    [-0.6, 0, isLast ? 0.8 : 0.6, isLast ? 1.2 : 1],
    [0, 1, 1, 0]
  );
  
  // 3. Text Kinetic Motion
  const titleX = useTransform(activeVal, [-0.6, 0, 0.6, 1], [-50, 0, 0, -50]);
  
  const titleOpacity = useTransform(activeVal, [-0.6, 0, 0.6, 1], [0, 1, 1, 0]);
  
  const descY = useTransform(activeVal, [-0.6, 0, 0.6, 1], [50, 0, 0, 50]);
  const descOpacity = useTransform(activeVal, [-0.6, 0, 0.6, 1], [0, 1, 1, 0]);

  // 4. Background Parallax
  const xOffset = useTransform(activeVal, [-0.6, 1], ["-10%", "10%"]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        style={{ opacity, pointerEvents }}
      >
        {/* --- Content Container --- */}
        <div className="relative w-full h-full max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-12 md:pr-16 items-center content-center">
          
          {/* Text Content (Left/Top) */}
          <div className="md:col-span-5 flex flex-col justify-center order-2 md:order-1 relative z-20 mix-blend-difference text-white px-4 md:px-0 mt-4 md:mt-0">
            <motion.div style={{ x: isMobile ? 0 : titleX, opacity: titleOpacity }}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-mono tracking-widest uppercase text-neutral-400">
                  0{project.id} — {project.category}
                </span>
                <div className="h-[1px] w-12 bg-neutral-600" />
              </div>
              
              <h2 className="text-[10vw] md:text-[6vw] font-black leading-[0.9] tracking-tighter mb-4 md:mb-6">
                {project.title}
              </h2>
              
              <motion.p 
                style={{ y: isMobile ? 0 : descY, opacity: descOpacity }}
                className="text-base md:text-xl font-light text-neutral-300 max-w-md leading-relaxed mb-6 md:mb-8"
              >
                {project.description}
              </motion.p>
              
              <motion.div 
                style={{ y: isMobile ? 0 : descY, opacity: descOpacity }}
                className="flex flex-wrap gap-2 mb-8 md:mb-10"
              >
                {project.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 text-xs border border-white/20 rounded-full font-mono text-white/80">
                    {t}
                  </span>
                ))}
              </motion.div>
              
              <motion.div 
                style={{ y: isMobile ? 0 : descY, opacity: descOpacity }}
                className="flex gap-4 md:gap-6"
              >
                {project.live && project.live !== "#" && (
                  <MagneticButton href={project.live} target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center gap-2 text-sm md:text-base">LIVE DEMO <ArrowUpRight size={18} /></span>
                  </MagneticButton>
                )}
                
                {project.repo && project.repo !== "#" && (
                  <MagneticButton href={project.repo} outline target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center gap-2 text-sm md:text-base">GITHUB <Github size={18} /></span>
                  </MagneticButton>
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* Image Content (Right/Bottom) */}
          <div className="md:col-span-7 w-full md:h-full order-1 md:order-2 relative z-10 flex flex-col justify-center">
            <div className="relative md:absolute md:inset-0 flex items-center justify-center">
               <motion.div 
                 style={{ 
                   clipPath: isMobile ? "none" : clipPath,
                   scale: isMobile ? 1 : scale,
                   rotate: isMobile ? 0 : rotate,
                 }}
                 className="relative w-full md:w-[95%] aspect-video overflow-hidden rounded-2xl shadow-2xl"
               >
                 <motion.img 
                   src={project.image} 
                   alt={project.title}
                   style={{ scale: isMobile ? 1 : 1.2, x: isMobile ? 0 : xOffset }}
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-black/20" />
               </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
