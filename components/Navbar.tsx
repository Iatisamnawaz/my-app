"use client";

import React, { useState, useEffect } from "react";
import GooeyNav from './GooeyNav';
import GlassSurface from './GlassEffect';
import CareerTimer from './CareerTimer';
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { label: "Home", href: "#" },
  { label: "Overview", href: "#overview" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "About Me", href: "#myinfosection" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Close menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        
        // Smooth scroll logic
        if (href.startsWith('#')) {
            const id = href.substring(1);
            const element = document.getElementById(id);
            if (element) {
                // Small delay to allow menu to close first
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', href);
                }, 300);
            } else if (href === '#' || href === '') {
                 setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.history.pushState(null, '', href);
                }, 300);
            }
        }
    };

    return (
        <>
            <nav className="fixed top-4 md:top-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
                {/* Desktop Menu */}
                <div className="hidden md:block pointer-events-auto">
                    <GlassSurface
                        width="auto"
                        height="auto"
                        borderRadius={40}
                        borderWidth={0.5}
                        brightness={70}
                        opacity={0.6}
                        blur={8}
                        className="p-2"
                    >
                        <div style={{ position: 'relative' }}>
                            <GooeyNav
                                items={items}
                                particleCount={0}
                                particleDistances={[90, 10]}
                                particleR={100}
                                initialActiveIndex={0}
                                animationTime={600}
                                timeVariance={300}
                                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                            />
                        </div>
                    </GlassSurface>
                </div>

                {/* Mobile: Unified Glass Pill (Stats + Menu) */}
                <div className="md:hidden fixed top-[2vh] left-0 right-0 z-50 flex justify-center px-[4vw] pointer-events-none">
                    <div className="pointer-events-auto max-w-[90vw]">
                        <GlassSurface
                            width="auto"
                            height="auto"
                            borderRadius={50}
                            borderWidth={0.5}
                            brightness={70}
                            opacity={0.6}
                            blur={12}
                            className="py-[1vh] pl-[4vw] pr-[2vw]"
                        >
                            <div className="flex items-center gap-4">
                                <CareerTimer simple />
                                <div className="h-4 w-[1px] bg-white/20" />
                                <button 
                                    onClick={toggleMenu}
                                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white focus:outline-none"
                                    aria-label="Toggle Menu"
                                >
                                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                                </button>
                            </div>
                        </GlassSurface>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md pt-24 px-6 md:hidden flex flex-col items-center"
                    >
                         <GlassSurface
                            width="100%"
                            height="auto"
                            borderRadius={24}
                            borderWidth={0.5}
                            brightness={40}
                            opacity={0.8}
                            blur={12}
                            className="p-6 w-full max-w-sm"
                        >
                            <ul className="flex flex-col gap-6 items-center w-full">
                                {items.map((item, index) => (
                                    <li key={index} className="w-full text-center">
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleMobileLinkClick(e, item.href)}
                                            className="block w-full text-xl font-medium text-white/90 hover:text-white py-2 transition-colors duration-200"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </GlassSurface>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
