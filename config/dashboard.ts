// /config/dashboard.ts
import { Widget } from "@/lib/types";

export const defaultDashboard: Widget[] = [
    // 1. Die Uhr (Oben links, quadratisch)
    {
        id: "widget_clock_01",
        type: "clock",
        layout: {
            x: 0, 
            y: 0, 
            w: 2, // 2 Einheiten breit
            h: 2  // 2 Einheiten hoch
        },
        options: {
            timezone: 1, // UTC+1 (Deutschland Winterzeit)
            format: "24h",
            color_mode: "light", // Aus deinem BasisWidget Interface
            showSeconds: false   // Aus deinem ClockWidget Interface
        }
    },
    
    // 2. Das Wetter (Neben der Uhr)
    {
        id: "widget_weather_01",
        type: "weather",
        layout: {
            x: 2, // Startet bei Spalte 2 (direkt nach der Uhr)
            y: 0,
            w: 2,
            h: 2
        },
        options: {
            city: "Wiesbaden",
            lat: 50.0782,
            lon: 8.2397,
            color_mode: "dark"
        }
    },

    // 3. Deine Bookmarks (Darunter, über die ganze Breite der ersten 4 Spalten)
    {
        id: "widget_bookmarks_main",
        type: "bookmarks",
        layout: {
            x: 0,
            y: 2, // Startet in Zeile 2 (unter Uhr und Wetter)
            w: 4, // 4 Einheiten breit (so breit wie Uhr + Wetter zusammen)
            h: 4  // Ziemlich hoch für viele Links
        },
        options: {
            color_mode: "dark",
            category: "Daily Drivers",
            items: [
                { label: "GitHub", url: "https://github.com" },
                { label: "YouTube", url: "https://youtube.com" },
                { label: "ChatGPT", url: "https://chatgpt.com" },
                { label: "Localhost", url: "http://localhost:3000" }
            ]
        }
    }
];