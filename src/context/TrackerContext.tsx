import React, { createContext, useContext, useState } from 'react';

export interface TrackerState {
    googleAnalytics: boolean;
    googleTagManager: boolean;
    facebookPixel: boolean;
    hotjar: boolean;
    youtubeEmbed: boolean;
    vimeoEmbed: boolean;
    googleMaps: boolean;
    brokenScript: boolean;
    ghostPixel: boolean;
    shadowDom: boolean;
}

interface TrackerContextType {
    trackers: TrackerState;
    toggleTracker: (key: keyof TrackerState) => void;
    enableAll: () => void;
    disableAll: () => void;
}

const defaultState: TrackerState = {
    googleAnalytics: false,
    googleTagManager: false,
    facebookPixel: false,
    hotjar: false,
    youtubeEmbed: false,
    vimeoEmbed: false,
    googleMaps: false,
    brokenScript: false,
    ghostPixel: false,
    shadowDom: false,
};

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

export const TrackerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [trackers, setTrackers] = useState<TrackerState>(defaultState);

    const toggleTracker = (key: keyof TrackerState) => {
        setTrackers(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const enableAll = () => {
        setTrackers({
            googleAnalytics: true,
            googleTagManager: true,
            facebookPixel: true,
            hotjar: true,
            youtubeEmbed: true,
            vimeoEmbed: true,
            googleMaps: true,
            brokenScript: true,
            ghostPixel: true,
            shadowDom: true,
        });
    };

    const disableAll = () => {
        setTrackers(defaultState);
    };

    return (
        <TrackerContext.Provider value={{ trackers, toggleTracker, enableAll, disableAll }}>
            {children}
        </TrackerContext.Provider>
    );
};

export const useTrackers = () => {
    const context = useContext(TrackerContext);
    if (context === undefined) {
        throw new Error('useTrackers must be used within a TrackerProvider');
    }
    return context;
};
