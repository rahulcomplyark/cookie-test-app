import React, { useState } from 'react';
import { Code, Play, Check } from 'lucide-react';

const ScriptInjector: React.FC = () => {
    const [scriptContent, setScriptContent] = useState('');
    const [location, setLocation] = useState<'head' | 'body'>('head');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInject = () => {
        if (!scriptContent.trim()) return;

        try {
            const script = document.createElement('script');
            script.text = scriptContent;

            if (location === 'head') {
                document.head.appendChild(script);
            } else {
                document.body.appendChild(script);
            }

            setStatus('success');
            setTimeout(() => setStatus('idle'), 2000);
            console.log(`[ScriptInjector] Injected script to ${location}`);
        } catch (e) {
            console.error(e);
            setStatus('error');
        }
    };

    return (
        <div className="space-y-3">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Code size={14} /> Custom Injection
            </h2>
            <div className="space-y-2">
                <div className="flex gap-2 text-xs">
                    <button
                        onClick={() => setLocation('head')}
                        className={`flex-1 py-1 rounded border ${location === 'head' ? 'bg-blue-900/30 border-blue-500/50 text-blue-400' : 'bg-gray-900 border-gray-800 text-gray-500 hover:text-gray-300'}`}
                    >
                        &lt;HEAD&gt;
                    </button>
                    <button
                        onClick={() => setLocation('body')}
                        className={`flex-1 py-1 rounded border ${location === 'body' ? 'bg-blue-900/30 border-blue-500/50 text-blue-400' : 'bg-gray-900 border-gray-800 text-gray-500 hover:text-gray-300'}`}
                    >
                        &lt;BODY&gt;
                    </button>
                </div>
                <textarea
                    value={scriptContent}
                    onChange={(e) => setScriptContent(e.target.value)}
                    placeholder="console.log('injected');"
                    className="w-full h-24 bg-gray-900 border border-gray-800 rounded p-2 text-xs font-mono text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-700 resize-none"
                    spellCheck={false}
                />
                <button
                    onClick={handleInject}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded text-xs font-semibold transition-colors
                        ${status === 'success' ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                    `}
                >
                    {status === 'success' ? <Check size={14} /> : <Play size={14} />}
                    {status === 'success' ? 'Injected!' : 'Run Script'}
                </button>
            </div>
        </div>
    );
};

export default ScriptInjector;
