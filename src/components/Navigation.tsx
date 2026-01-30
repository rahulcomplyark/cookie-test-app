import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight">
                        SaaSify
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/contact"
                            className={`text-sm font-medium transition-colors ${location.pathname === '/contact' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
                <div>
                    <Link
                        to="/login"
                        className="text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
