"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/app/constants";

const getEarliestStartDate = () => {
  if (!experiences || experiences.length === 0) {
    return new Date("2021-06-01T09:00:00"); // Default fallback
  }

  let earliest = new Date();

  experiences.forEach(exp => {
    // Extract start date string (e.g., "Apr 2025" from "Apr 2025 - Present")
    const startDateStr = exp.period.split(" - ")[0];
    const date = new Date(startDateStr);
    
    if (!isNaN(date.getTime()) && date < earliest) {
      earliest = date;
    }
  });

  return earliest;
};

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CareerTimer({ simple = false }: { simple?: boolean }) {
  const [time, setTime] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const startDate = useMemo(() => getEarliestStartDate(), []);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      const years = Math.floor(days / 365);
      const remainingDays = days % 365;
      const months = Math.floor(remainingDays / 30);
      const finalDays = remainingDays % 30;

      setTime({
        years,
        months,
        days: finalDays,
        hours,
        minutes,
        seconds,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (simple) {
    return (
      <div className="flex items-center gap-2 text-[10px] xs:text-[11px] font-mono text-white/80 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        <span className="tracking-wide">
          <span className="inline">Experience: </span>
          <span className="text-white font-bold">{time.years}y {time.months}m {time.days}d {time.hours}h {time.minutes}m</span>
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="w-fit mx-auto"
    >
      <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 shadow-lg hover:bg-white/10 transition-colors">
        <div className="flex items-center gap-2 md:gap-3 text-[15px] sm:text-xs md:text-base font-mono text-white/80 whitespace-nowrap">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="tracking-wide">
            <span className="hidden sm:inline">Experience: </span>
            <span className="sm:hidden">Exp: </span>
            <span className="text-white font-bold">{time.years}y {time.months}m {time.days}d {time.hours}h {time.minutes}m {time.seconds}s</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

