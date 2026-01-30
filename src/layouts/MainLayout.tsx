import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ControlPanel/Sidebar';
import Navigation from '../components/Navigation';

const MainLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden font-sans">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden relative bg-gray-50 text-gray-900">
                <Navigation />
                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
