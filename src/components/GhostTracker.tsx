import React, { useEffect, useRef } from 'react';
import { useTrackers } from '../context/TrackerContext';

const GhostTracker: React.FC = () => {
    const { trackers } = useTrackers();
    const shadowHostRef = useRef<HTMLDivElement>(null);

    // Shadow DOM Injection
    useEffect(() => {
        if (!trackers.shadowDom || !shadowHostRef.current) return;

        const host = shadowHostRef.current;
        let shadow = host.shadowRoot;
        if (!shadow) {
            shadow = host.attachShadow({ mode: 'open' });
        }

        // Clean previous
        shadow.innerHTML = '';

        // Inject content
        const div = document.createElement('div');
        div.innerHTML = `
            <div style="display:none;">
                <img src="https://example.com/shadow-pixel.png" alt="tracker" />
                <script>console.log('Shadow DOM Tracker Active');</script>
            </div>
            <p style="font-size: 10px; color: #666;">Shadow DOM Injector Active</p>
        `;
        shadow.appendChild(div);

        // Inject script manually since innerHTML script tags don't run automatically in some cases
        const script = document.createElement('script');
        script.textContent = "console.log('OA: Shadow DOM Tracker Script Loaded');";
        shadow.appendChild(script);

    }, [trackers.shadowDom]);

    return (
        <div className="fixed bottom-0 right-0 w-0 h-0 overflow-hidden">
            {trackers.ghostPixel && (
                <img
                    src="https://placehold.co/1x1?text=pixel"
                    alt="ghost-pixel"
                    style={{ position: 'absolute', top: -1000, left: -1000, visibility: 'hidden' }}
                    onLoad={() => console.log('OA: Ghost Pixel Loaded')}
                />
            )}

            {/* Host for Shadow DOM */}
            <div ref={shadowHostRef} id="shadow-host" />
        </div>
    );
};

export default GhostTracker;
