"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Briefcase, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { experiences } from "@/app/constants";

// --- Utility for Tailwind ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 3D Card Component ---
const ExperienceCard = ({ item, index }: { item: typeof experiences[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Scroll Parallax for entrance
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  // Mouse 3D Tilt & Parallax Effect
  const x = useMotionValue(0);
  const yMouse = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(yMouse, { stiffness: 500, damping: 100 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (isMobile) return;

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const clientX = event.clientX;
    const clientY = event.clientY;
    
    // Calculate distance from center normalized to [-1, 1]
    const dx = (clientX - cx) / (width / 2);
    const dy = (clientY - cy) / (height / 2);

    x.set(dx * 20); // Stronger tilt
    yMouse.set(dy * 20);
  }

  function handleMouseLeave() {
    x.set(0);
    yMouse.set(0);
  }

  const rotateX = useTransform(mouseY, (value) => value * -1); 
  const rotateY = useTransform(mouseX, (value) => value);
  
  // Parallax for content layers
  const contentX = useTransform(mouseX, (value) => value * 0.5);
  const contentY = useTransform(mouseY, (value) => value * 0.5);

  // Dynamic sheen effect
  const sheenX = useTransform(mouseX, [-20, 20], ["0%", "100%"]);
  const sheenY = useTransform(mouseY, [-20, 20], ["0%", "100%"]);
  
  const sheenGradient = useMotionTemplate`radial-gradient(
    circle at ${sheenX} ${sheenY}, 
    rgba(255,255,255,0.2), 
    transparent 60%
  )`;

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        scale,
        y,
        perspective: 1200,
      }}
      className={cn(
        "relative flex flex-col md:flex-row gap-8 items-center w-full max-w-6xl mx-auto mb-24 md:mb-40 perspective-1200",
        "pl-12 md:pl-0" 
      )}
    >
      {/* Timeline Node (Desktop) */}
      <div className="hidden md:flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className={cn(
            "w-6 h-6 rounded-full border-4 border-black bg-white z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]",
            "group-hover:scale-150 transition-all duration-500"
          )}
        >
             <div className={cn("w-full h-full rounded-full animate-ping opacity-20 bg-white")} />
        </motion.div>
      </div>

      {/* Mobile Timeline Node */}
      <div className="md:hidden absolute left-6 top-8 w-4 h-4 rounded-full border-2 border-white/20 bg-black z-20 -translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.3)]" />

      {/* Date / Location Side */}
      <motion.div 
        className={cn(
          "md:w-1/2 flex flex-col md:px-16 w-full relative z-10",
          index % 2 === 0 ? "md:items-end md:text-right" : "md:items-start md:text-left md:ml-auto md:order-last"
        )}
      >
        <div className="inline-flex items-center gap-2 mb-2">
            <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/70", index % 2 === 0 ? "mr-auto md:ml-auto md:mr-0" : "mr-auto")}>
                {item.period}
            </span>
        </div>
        
        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
          {item.company}
        </h3>
        
        <div className={cn(
          "flex items-center gap-2 text-white/50 text-sm font-mono mb-6",
          index % 2 === 0 ? "md:justify-end" : "md:justify-start"
        )}>
          <MapPin className="w-4 h-4" />
          <span>{item.location}</span>
        </div>
      </motion.div>

      {/* Card Side */}
      <motion.div
        className={cn(
          "w-full md:w-1/2 relative z-0",
          index % 2 === 0 ? "md:order-last" : "md:order-first"
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div 
          className={cn(
            "group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-6 md:p-10 transition-all duration-500",
            "hover:border-white/30 hover:shadow-2xl",
            item.shadow
          )}
        >
          {/* Animated Gradient Border via pseudo-element simulation */}
          <div className={cn("absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-br", item.color)} />
          
          {/* Content Parallax Container */}
          <motion.div 
            style={{ x: contentX, y: contentY }}
            className="relative z-10 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
                 <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                    {item.role}
                </h4>
                <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
            </div>
            
            <ul className="list-disc pl-5 space-y-2 text-white/70 text-sm md:text-lg font-light marker:text-white/50">
              {(Array.isArray(item.description) ? item.description : [item.description]).map((desc, i) => (
                <li key={i} className="leading-relaxed">
                  {desc}
                </li>
              ))}
            </ul>

            <div className="h-px w-full bg-white/10 my-2 group-hover:bg-white/20 transition-colors" />

            <div className="flex flex-wrap gap-2">
              {item.tech.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/50 border border-white/5 text-white/60 group-hover:text-white group-hover:border-white/20 transition-all hover:bg-white/10 hover:scale-105 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Shine Effect */}
          {!isMobile && (
            <motion.div 
                className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: sheenGradient
                }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      id="experience" 
      className="relative md:min-h-screen py-10 md:py-32 px-4 overflow-hidden"
      ref={containerRef}
    >
      {/* Dynamic Background Beam (Desktop) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block overflow-hidden">
        <motion.div 
            style={{ height }}
            className="w-full bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.8)]"
        />
      </div>
      
      {/* Dynamic Background Beam (Mobile) */}
       <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-white/5 md:hidden overflow-hidden">
         <motion.div 
            style={{ height }}
            className="w-full bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.8)]"
        />
       </div>


      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
             <Briefcase className="w-4 h-4 text-white/70" />
             <span className="text-sm font-medium text-white/70 uppercase tracking-widest">Career Path</span>
          </div>
          
          <h2 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Work Experience
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Building digital products with a focus on performance, aesthetics, and user experience.
          </p>
        </motion.div>

        <div className="flex flex-col relative">
          {experiences.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
