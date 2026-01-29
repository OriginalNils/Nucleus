// /components/widgets/weather/index.tsx

'use client'; 

import { useState, useEffect } from 'react';
import { WeatherWidget } from '@/lib/types';

function getWeatherInfo(code: number) {
  if (code === 0) return { label: 'Klar', icon: '☀️' };
  if (code >= 1 && code <= 3) return { label: 'Wolkig', icon: '☁️' };
  if (code >= 45 && code <= 48) return { label: 'Nebel', icon: '🌫️' };
  if (code >= 51 && code <= 67) return { label: 'Regen', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { label: 'Schnee', icon: '❄️' };
  if (code >= 95) return { label: 'Gewitter', icon: '⚡' };
  return { label: 'Unbekannt', icon: '❓' };
}

interface WeatherProps {
  options: WeatherWidget['options'];
}

export default function WeatherComponent({ options }: WeatherProps) {
    // Tipp: Wir sagen TypeScript hier, dass data "any" ist, damit es nicht meckert.
    // In echten Projekten würden wir hier einen Typ definieren.
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${options.lat}&longitude=${options.lon}&current=temperature_2m,weather_code`);
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error("Server got an API error:", error);
            }
        }
        fetchData();
    }, []); // Leeres Array = Nur einmal beim Start

    if (!data) {
        return <div className="h-full flex items-center justify-center text-zinc-500 animate-pulse">Lade...</div>;
    }

    const temperature = data.current.temperature_2m;
    const code = data.current.weather_code;
    const info = getWeatherInfo(code);

    return (
        <div className="h-full flex flex-col items-center justify-center bg-zinc-900 text-white p-4">
            {/* FIX 2: Wir greifen auf .icon und .label zu */}
            <div className="text-4xl mb-2">{info.icon}</div>
            <div className="text-2xl font-bold">{temperature}°C</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{options.city}</div>
            <div className="text-[10px] text-zinc-600 mt-1">{info.label}</div>
        </div>
    );
}