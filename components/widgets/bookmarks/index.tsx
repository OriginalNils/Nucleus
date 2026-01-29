// components/widgets/bookmarks/index.tsx
'use client'; 

import { BookmarkWidget } from '@/lib/types';

interface BookmarkProps {
  options: BookmarkWidget['options'];
}

export default function BookmarkComponent({ options }: BookmarkProps) {
  
  const getIconUrl = (urlStr: string) => {
    try {
      const domain = new URL(urlStr).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch (e) {
      return ''; 
    }
  };

  return (
    // HIER GEÄNDERT: bg-neutral-900 statt bg-zinc-900
    <div className="h-full w-full p-4 flex flex-col bg-neutral-900">
      
      {options.category && (
        // HIER GEÄNDERT: text-neutral-500
        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 px-1">
          {options.category}
        </h3>
      )}

      <div className="grid grid-cols-2 gap-2 h-full content-start overflow-y-auto pr-1 scrollbar-hide">
        
        {options.items.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            // HIER GEÄNDERT: Alles auf 'neutral' umgestellt
            className="
              flex items-center gap-3 p-3 rounded-lg 
              bg-neutral-800/40 border border-neutral-800/50 
              text-neutral-200 no-underline
              hover:bg-neutral-800 hover:border-neutral-700 hover:scale-[1.02] hover:text-white
              transition-all duration-200 group
            "
          >
            {/* Icon Container */}
            <div className="w-8 h-8 rounded-md bg-neutral-950/50 border border-white/5 p-1.5 flex items-center justify-center shrink-0">
               <img 
                 src={getIconUrl(item.url)} 
                 alt="icon" 
                 className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
                 onError={(e) => { e.currentTarget.style.display = 'none' }}
               />
            </div>

            <div className="flex flex-col overflow-hidden min-w-0">
                <span className="text-sm font-medium truncate">
                    {item.label}
                </span>
                <span className="text-[10px] text-neutral-500 truncate group-hover:text-neutral-400">
                    {new URL(item.url).hostname.replace('www.', '')}
                </span>
            </div>
          </a>
        ))}

      </div>
    </div>
  );
}