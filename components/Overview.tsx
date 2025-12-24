"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import BlurText from './BlurText';
import DomeGallery from './TechDome';
import { techImages } from '@/app/constants';

const handleAnimationComplete = () => {
    console.log('Animation completed!');
};

export default function Overview() {
    const domeRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // Only animate floating dome on desktop
        let ctx: gsap.Context | undefined;
        
        if (!isMobile && domeRef.current) {
             ctx = gsap.context(() => {
                gsap.to(domeRef.current, {
                    y: -20,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }, domeRef);
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            ctx?.revert();
        };
    }, [isMobile]);

    return (
        <section id="overview" className="flex flex-col items-center justify-center p-5 md:min-h-screen relative overflow-hidden mt-0 md:mt-30">
            <div className="w-full max-w-6xl flex flex-col items-center z-10">
                <BlurText
                    text="Technologies"
                    delay={150}
                    animateBy="letters"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-4xl md:text-6xl font-bold"
                    threshold={0.5}
                />

                {isMobile ? (
                    <div className="grid grid-cols-3 gap-6 mt-12 w-full px-4">
                        {techImages.map((tech, index) => (
                            <div key={index} className="flex flex-col items-center justify-center gap-3">
                                <div className="w-16 h-16 relative bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                                    <img src={tech.src} alt={tech.alt} className="w-full h-full object-contain" />
                                </div>
                                <span className="text-xs text-white/60 font-medium text-center">{tech.alt}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div ref={domeRef} className="w-full h-[600px] md:h-[800px] relative">
                        <DomeGallery
                            images={techImages}
                            fit={0.6}
                            minRadius={300}
                            maxRadius={600}
                            grayscale={false}
                            openedImageWidth="200px"
                            openedImageHeight="200px"
                            imageBorderRadius="12px"
                        />
                    </div>
                )}
            </div>
        </section>
    )
}
