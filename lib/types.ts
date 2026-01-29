// lib/types.ts


// allowed categories
export type WidgetType = 'clock' | 'weather' | 'bookmarks' | 'rss';

// basis data of widget
interface BaseWidget {
    id: string;
    type: WidgetType;
    layout: {
        x: number;
        y: number;
        w: number;
        h: number; 
    }
}

export interface WeatherWidget extends BaseWidget {
    type: 'weather';
    options: {
        city: string;
        lat: number;    //coords
        lon: number;    //coords
        color_mode: 'light' | 'dark' | 'default';
    };
}

export interface ClockWidget extends BaseWidget {
    type: 'clock';
    options: {
        timezone: number;
        showSeconds: boolean;
        format: '12h' | '24h';
        color_mode: 'light' | 'dark' | 'default';
    };
}

export interface BookmarkWidget extends BaseWidget {
    type: 'bookmarks';
    options: {
        category?: string; 
        items:Array<{ label: string; url: string }>;
        color_mode: 'light' | 'dark' | 'default';
    };
}

export interface RSSWidget extends BaseWidget {
    type: 'rss';
    options: {
        rss_link: string;
        refresh_interval?: number; // Optional: Wie oft neu laden?
        color_mode: 'light' | 'dark' | 'default';
    };
}

export type Widget = WeatherWidget | ClockWidget | BookmarkWidget | RSSWidget;