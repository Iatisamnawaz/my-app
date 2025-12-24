"use client";

import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
    children: React.ReactNode;
    href?: string;
    outline?: boolean;
    className?: string;
    onClick?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export default function MagneticButton({ 
    children, 
    href = "#", 
    outline = false,
    className = "",
    onClick,
    ...props
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current) return;
        
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        
        x.set(middleX);
        y.set(middleY);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    const content = (
        <motion.div
            style={{ x: xSpring, y: ySpring }}
            className={`
                relative px-6 py-3 rounded-full font-medium text-sm transition-colors duration-300
                flex items-center justify-center gap-2
                ${outline 
                    ? 'border border-white/20 text-white hover:bg-white/10' 
                    : 'bg-white text-black hover:bg-neutral-200'
                }
                ${className}
            `}
        >
            {children}
        </motion.div>
    );

    if (onClick || !href) {
        return (
             <div 
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={reset}
                onClick={onClick}
                className="cursor-pointer inline-block"
                {...props}
            >
                {content}
            </div>
        )
    }

    return (
        <Link 
            href={href} 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={ref as any}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className="cursor-pointer inline-block"
            {...props}
        >
            {content}
        </Link>
    );
}
