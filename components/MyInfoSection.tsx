"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { GraduationCap, Award, ExternalLink } from "lucide-react";
import { educationData, socialLinks } from "@/app/constants";

// --- Components ---

const MagneticWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GradeDisplay = ({ grade, label }: { grade: string; label: string }) => {
  const isLongText = grade.length > 4;
  
  return (
    <div className="flex flex-col items-end justify-center">
      <motion.span 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className={`${isLongText ? "text-lg md:text-xl text-right max-w-[150px]" : "text-3xl md:text-4xl"} font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60`}
      >
        {grade}
      </motion.span>
      <span className="text-xs md:text-sm text-white/40 font-mono tracking-wider">{label}</span>
    </div>
  );
};

const EducationItem = ({ item, index }: { item: typeof educationData[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative pl-8 md:pl-0 border-l border-white/10 md:border-l-0 md:flex md:items-start md:gap-6 group"
    >
        {/* Mobile timeline dot */}
        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-white/20 md:hidden" />

      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between md:justify-start md:gap-4">
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors duration-300">
            {item.degree}
            </h3>
            <span className="md:hidden text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded-full">{item.year}</span>
        </div>
        
        <p className="text-white/60 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          {item.school}
        </p>
        
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/40 mt-1">
             <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5">{item.year}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {item.highlights.map((highlight, i) => (
            <span 
              key={i}
              className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-default"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 md:mt-0 md:pl-6 md:border-l md:border-white/10 min-w-[100px] flex justify-end">
        <GradeDisplay grade={item.grade} label={item.gradeLabel} />
      </div>
    </motion.div>
  );
};

export default function MyInfoSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="myinfosection"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* 1. Intro Block */}
        <motion.div 
          style={{ opacity, y }}
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <motion.h2 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            More than just <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
              code & pixels.
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
          >
            A closer look at my academic journey and where to find me online. 
            Always learning, always building.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* 2. Education & Grades (Left Column) */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
            >
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Education</h3>
            </motion.div>

            <div className="space-y-10">
              {educationData.map((item, index) => (
                <EducationItem key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Right Column: Socials & CV */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-12">
            
            {/* 3. Social Presence */}
            <div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-8"
                >
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                        <Award className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Connect</h3>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((link) => (
                    <MagneticWrapper key={link.name} className="w-full">
                        <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
                        >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <link.icon className={`w-8 h-8 mb-3 text-white/70 transition-colors duration-300 ${link.color}`} />
                        <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                            {link.name}
                        </span>
                        <ExternalLink className="absolute top-3 right-3 w-3 h-3 text-white/20 group-hover:text-white/50 transition-colors" />
                        </a>
                    </MagneticWrapper>
                    ))}
                </div>
            </div>

            {/* 4. CV Action */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-60 blur transition duration-500" />
                    <a 
                        href="https://docs.google.com/document/d/1GEnHCCKHdzaSYMdlmg-_bQZ2uJWsuU8bITzBe-oUzNA/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center justify-between px-8 py-6 bg-black rounded-xl leading-none flex items-center border border-white/10 group-hover:border-white/20 transition-all"
                    >
                        <div className="flex flex-col items-start">
                            <span className="text-white font-bold text-lg mb-1 group-hover:text-blue-200 transition-colors">View Resume</span>
                            <span className="text-white/40 text-xs">Google Docs • Latest Version</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                            <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                    </a>
                </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
