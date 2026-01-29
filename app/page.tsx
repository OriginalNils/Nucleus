// /app/page.tsx

import { defaultDashboard } from '@/config/dashboard';
import ClockComponent from '@/components/widgets/clock';
import WeatherComponent from '@/components/widgets/weather';
import BookmarkComponent from '@/components/widgets/bookmarks';

// Hier werden später die anderen Widgets importiert
// import WeatherComponent from ...

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black p-6 text-zinc-100">
      
      {/* DAS GRID (Die Leinwand) */}
      {/* grid-cols-12: Wir unterteilen den Screen in 12 vertikale Streifen */}
      {/* auto-rows-[...]: Jede Zeile ist standardmäßig 120px hoch (anpassbar) */}
      <div className="grid grid-cols-12 auto-rows-[120px] gap-4 max-w-[1600px] mx-auto">
        
        {defaultDashboard.map((widget) => {
          return (
            <div
              key={widget.id}
              // HIER PASSIERT DIE MAGIE (Positionierung)
              style={{
                // x ist 0-basiert, Grid startet bei 1 -> deshalb +1
                gridColumnStart: widget.layout.x + 1,
                gridColumnEnd: `span ${widget.layout.w}`,
                gridRowStart: widget.layout.y + 1,
                gridRowEnd: `span ${widget.layout.h}`,
              }}
              className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden shadow-sm hover:border-zinc-700 transition-colors"
            >
              
              {/* Hier entscheiden wir, was gemalt wird */}
              
              {widget.type === 'clock' && (
                // 'as any' nutzen wir hier kurzfristig, um TypeScript zu beruhigen,
                // da das Grid noch nicht genau weiß, welches Widget welche Options hat.
                <ClockComponent options={widget.options as any} />
              )}

              {widget.type === 'weather' && (
                <div className="flex items-center justify-center h-full text-zinc-500 text-sm font-mono">
                  <WeatherComponent options={widget.options as any} />
                </div>
              )}

              {widget.type === 'bookmarks' && (
                <div className="flex items-center justify-center h-full text-zinc-500 text-sm font-mono">
                  {widget.type === 'bookmarks' && (
                    <BookmarkComponent options={widget.options as any} />
                    )}
                </div>
              )}

            </div>
          );
        })}

      </div>
    </main>
  );
}