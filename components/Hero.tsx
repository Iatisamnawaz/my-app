"use client";

import SplitText from "./SplitText"
import ProfileCard from './ProfileCard'
import CareerTimer from './CareerTimer'
import { heroData } from "@/app/constants";

import { motion } from "framer-motion";

const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};

export default function Hero() {
    return (
        <section id="hero" className="min-h-[100svh] flex flex-col items-center justify-center p-5 pt-20 pb-8 md:py-0 relative overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col md:grid md:grid-cols-2 h-full justify-evenly md:justify-center gap-6 md:gap-12 items-center">
                <div className="flex flex-col items-start justify-center order-2 md:order-1 relative z-20 text-left w-full">
                    <SplitText
                        text={heroData.heading}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold text-left leading-tight"
                        delay={100}
                        duration={0.6}
                        ease="power3.out"
                        splitType="words, chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="left"
                        onLetterAnimationComplete={handleAnimationComplete}
                    />
                    <p className="mt-6 text-neutral-400 text-[clamp(1rem,4vw,1.25rem)] md:text-xl max-w-lg leading-relaxed">
                        {heroData.subheading}
                    </p>
                    
                    {/* Desktop: Career Timer Below Text */}
                    <div className="hidden md:block mt-8">
                        <CareerTimer />
                    </div>
                </div>
                
                <div className="flex justify-center items-center order-1 md:order-2 w-full">
                    <div className="w-[65vw] max-w-[280px] md:w-full md:max-w-md">
                        <ProfileCard
                            name={heroData.name}
                        title={heroData.title}
                        handle={heroData.handle}
                        status={heroData.status}
                        contactText={heroData.contactText}
                        avatarUrl={heroData.avatarUrl}
                        showUserInfo={true}
                        enableTilt={true}
                        enableMobileTilt={false}
                        onContactClick={() => {
                            const element = document.getElementById('myinfosection');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    />
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Hidden on Mobile */}
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="hidden md:flex absolute bottom-2 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10 pointer-events-none"
            >
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Scroll</span>
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-8 md:h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
                />
            </motion.div>
        </section>
    )
}
