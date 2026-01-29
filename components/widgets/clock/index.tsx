// /components/widgets/clock/index.tsx

'use client'; 

import { useState, useEffect } from 'react';
import { ClockWidget } from '@/lib/types';
import { Tomorrow } from 'next/font/google';

// Wir nehmen nur den "options"-Teil aus dem Widget-Typ, der Rest (Position etc.) 
// interessiert die Uhr selbst nicht, das regelt das Grid später.
interface ClockProps {
  options: ClockWidget['options'];
}

export default function ClockComponent({ options }: ClockProps) {
  // 1. Hier State definieren (Date)
  const [time, setTime] = useState(new Date());
  
  // 2. Hier useEffect definieren (setInterval)
  useEffect(() => {

    const clockId = setInterval(() => {

      setTime(new Date());

    }, 1000);

    return () => clearInterval(clockId);
  }, []);

  const shiftedTime = new Date(time.getTime() + options.timezone * 60 * 60 * 1000);

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  const hours = formatNum(shiftedTime.getUTCHours());
  const minutes = formatNum(shiftedTime.getUTCMinutes());
  const seconds = formatNum(shiftedTime.getUTCSeconds());

  // 3. Hier Rendering Logik
  // Berechne die anzuzeigende Zeit basierend auf 'options.timezone'
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-white p-4">
       {/* Hauptzeit */}
       <div className="text-4xl font-bold tracking-wider">
          {hours}:{minutes}
          {options.showSeconds && <span className="text-zinc-500 text-2xl ml-1">:{seconds}</span>}
       </div>
       
       {/* Optional: Datum klein drunter (sieht immer gut aus) */}
       <div className="text-xs text-zinc-500 uppercase tracking-[0.2em] mt-2">
          {options.format} MODE
       </div>
    </div>
  );
}