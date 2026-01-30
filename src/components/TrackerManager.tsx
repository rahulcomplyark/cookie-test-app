import React, { useEffect } from 'react';
import { useTrackers } from '../context/TrackerContext';

// Helper to inject script
const injectScript = (id: string, src: string | null, content: string | null) => {
    if (document.getElementById(id)) return; // Already injected

    const script = document.createElement('script');
    script.id = id;
    script.async = true;
    if (src) script.src = src;
    if (content) script.innerHTML = content;
    document.head.appendChild(script);
    console.log(`[TrackerManager] Injected: ${id}`);
};

const removeScript = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        el.remove();
        console.log(`[TrackerManager] Removed: ${id}`);
    }
};

const TrackerManager: React.FC = () => {
    const { trackers } = useTrackers();

    // Google Analytics
    useEffect(() => {
        const id = 'mock-ga-script';
        if (trackers.googleAnalytics) {
            injectScript(id, 'https://www.googletagmanager.com/gtag/js?id=UA-MOCK-1', `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-MOCK-1');
                console.log('OA: Google Analytics Mock Loaded');
            `);
        } else {
            removeScript(id);
            // Cleanup generic GA objects if possible, usually tough
        }
    }, [trackers.googleAnalytics]);

    // Facebook Pixel
    useEffect(() => {
        const id = 'mock-fbp-script';
        if (trackers.facebookPixel) {
            injectScript(id, null, `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                console.log('OA: Facebook Pixel Mock Loaded');}
                (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '123456789'); 
                fbq('track', 'PageView');
            `);
        } else {
            removeScript(id);
        }
    }, [trackers.facebookPixel]);

    // Hotjar
    useEffect(() => {
        const id = 'mock-hotjar-script';
        if (trackers.hotjar) {
            // Mock Hotjar script
            injectScript(id, null, `
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:123456,hjsv:6};
                    console.log('OA: Hotjar Mock Loaded');
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
             `);
        } else {
            removeScript(id);
        }
    }, [trackers.hotjar]);

    // Broken Script
    useEffect(() => {
        const id = 'mock-broken-script';
        if (trackers.brokenScript) {
            injectScript(id, null, `
                console.log('OA: Injecting Broken Script...');
                // This script intentionally throws an error
                const undefinedVar = nothing;
                undefinedVar.doSomething();
             `);
        } else {
            removeScript(id);
        }
    }, [trackers.brokenScript]);

    return null; // Headless component
};

export default TrackerManager;
