import React from 'react';

interface ToggleSwitchProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    icon?: React.ReactNode;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange, icon }) => {
    return (
        <div className="flex items-center justify-between p-2 rounded hover:bg-gray-900/50 transition-colors">
            <div className="flex items-center gap-2">
                {icon && <span className="text-gray-400">{icon}</span>}
                <span className="text-xs text-gray-300 font-medium">{label}</span>
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 cursor-pointer ${checked ? 'bg-blue-600' : 'bg-gray-700'
                    }`}
            >
                <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    );
};

export default ToggleSwitch;
