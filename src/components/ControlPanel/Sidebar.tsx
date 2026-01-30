import React, { useState, useEffect } from 'react';
import { ShieldAlert, Cookie, Database, Trash2, RefreshCw, Activity } from 'lucide-react';
import { CookieFactory } from '../../utils/cookieFactory';
import { StorageFactory } from '../../utils/storageFactory';
import { useTrackers } from '../../context/TrackerContext';
import ToggleSwitch from './ToggleSwitch';
import ScriptInjector from './ScriptInjector';

const Sidebar: React.FC = () => {
    const { trackers, toggleTracker } = useTrackers();
    const [cookies, setCookies] = useState<Record<string, string>>({});

    const refreshStatus = () => {
        setCookies(CookieFactory.getAll());
    };

    useEffect(() => {
        refreshStatus();
        // Poll for changes every 2 seconds to catch changes from other tabs/scripts
        const interval = setInterval(refreshStatus, 2000);
        return () => clearInterval(interval);
    }, []);

    const generateMarketingCookies = () => {
        CookieFactory.set({ name: '_ga', value: 'GA1.2.3456789.000', days: 365, path: '/' });
        CookieFactory.set({ name: '_fbp', value: 'fb.1.123456789.000', days: 90, path: '/' });
        CookieFactory.set({ name: 'hubspotutk', value: 'simulated_hubspot_token', days: 180 });
        refreshStatus();
    };

    const generateStorageData = () => {
        StorageFactory.localStorage.set('cart_items', { id: 123, price: 99.99 });
        StorageFactory.localStorage.set('user_preferences', { theme: 'dark', tracking_allowed: true });
        StorageFactory.sessionStorage.set('session_id', 'sess_' + Math.random().toString(36).substr(2, 9));
        StorageFactory.indexedDB.add('TrackerDB', 'events', { id: 'evt_' + Date.now(), type: 'pageview' });
        refreshStatus();
    };

    const nukeAll = () => {
        CookieFactory.deleteAll();
        StorageFactory.localStorage.clear();
        StorageFactory.sessionStorage.clear();
        StorageFactory.indexedDB.clear('TrackerDB');
        refreshStatus();
    };

    return (
        <aside className="w-80 bg-gray-950 border-r border-gray-800 flex flex-col shadow-2xl z-50 h-full flex-shrink-0">
            <div className="p-6 border-b border-gray-800 bg-gray-950">
                <div className="flex items-center gap-3 text-red-500 mb-1">
                    <ShieldAlert size={24} />
                    <h1 className="font-bold tracking-wider text-sm uppercase">Compliance Sandbox</h1>
                </div>
                <p className="text-xs text-gray-500 font-mono">v1.0.0 | HOSTILE ENV</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">

                {/* Cookie Simulation */}
                <div className="space-y-3">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Cookie size={14} /> Cookie Factory
                    </h2>
                    <div className="grid grid-cols-1 gap-2">
                        <button
                            onClick={generateMarketingCookies}
                            className="flex items-center justify-between px-3 py-2 bg-gray-900 border border-gray-800 rounded text-xs text-gray-300 hover:bg-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                        >
                            <span>Generate Marketing Cookies</span>
                            <span className="text-xs bg-blue-900/30 text-blue-400 px-1.5 py-0.5 rounded">3</span>
                        </button>
                    </div>
                </div>

                {/* Storage Simulation */}
                <div className="space-y-3">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Database size={14} /> Storage Sim
                    </h2>
                    <div className="grid grid-cols-1 gap-2">
                        <button
                            onClick={generateStorageData}
                            className="flex items-center justify-between px-3 py-2 bg-gray-900 border border-gray-800 rounded text-xs text-gray-300 hover:bg-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                        >
                            <span>Populate Storage</span>
                            <span className="text-xs bg-purple-900/30 text-purple-400 px-1.5 py-0.5 rounded">DB</span>
                        </button>
                    </div>
                </div>

                {/* Tracker Controls */}
                <div className="space-y-3">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Activity size={14} /> Tracker Injectors
                    </h2>
                    <div className="space-y-1">
                        <ToggleSwitch
                            label="Google Analytics"
                            checked={trackers.googleAnalytics}
                            onChange={() => toggleTracker('googleAnalytics')}
                        />
                        <ToggleSwitch
                            label="Facebook Pixel"
                            checked={trackers.facebookPixel}
                            onChange={() => toggleTracker('facebookPixel')}
                        />
                        <ToggleSwitch
                            label="Hotjar Recording"
                            checked={trackers.hotjar}
                            onChange={() => toggleTracker('hotjar')}
                        />
                        <div className="h-px bg-gray-800 my-2" />
                        <ToggleSwitch
                            label="Ghost Pixel (1x1)"
                            checked={trackers.ghostPixel}
                            onChange={() => toggleTracker('ghostPixel')}
                        />
                        <ToggleSwitch
                            label="Shadow DOM Inject"
                            checked={trackers.shadowDom}
                            onChange={() => toggleTracker('shadowDom')}
                        />
                        <div className="h-px bg-gray-800 my-2" />
                        <ToggleSwitch
                            label="YouTube Embed"
                            checked={trackers.youtubeEmbed}
                            onChange={() => toggleTracker('youtubeEmbed')}
                        />
                        <ToggleSwitch
                            label="Vimeo Embed"
                            checked={trackers.vimeoEmbed}
                            onChange={() => toggleTracker('vimeoEmbed')}
                        />
                        <ToggleSwitch
                            label="Google Maps"
                            checked={trackers.googleMaps}
                            onChange={() => toggleTracker('googleMaps')}
                        />
                        <div className="h-px bg-gray-800 my-2" />
                        <ToggleSwitch
                            label="Broken Script"
                            checked={trackers.brokenScript}
                            onChange={() => toggleTracker('brokenScript')}
                        />
                    </div>
                </div>

                {/* Custom Script */}
                <ScriptInjector />

                {/* Active Status Monitor */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active State</h2>
                        <button onClick={refreshStatus} className="text-gray-600 hover:text-white cursor-pointer"><RefreshCw size={12} /></button>
                    </div>
                    <div className="p-3 bg-gray-900/50 rounded border border-gray-800 text-xs font-mono text-gray-400 min-h-[100px] overflow-hidden">
                        {Object.keys(cookies).length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-20 text-gray-700">
                                <span className="italic">Clean Environment</span>
                            </div>
                        ) : (
                            <ul className="space-y-1">
                                {Object.entries(cookies).map(([key, val]) => (
                                    <li key={key} className="flex justify-between truncate group relative">
                                        <span className="text-blue-400 font-bold truncate max-w-[120px]" title={key}>{key}</span>
                                        <span className="truncate max-w-[80px] opacity-70 text-right" title={val}>{val}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-800 bg-gray-950">
                <button
                    onClick={nukeAll}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                    <Trash2 size={16} /> Nuke Everything
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
