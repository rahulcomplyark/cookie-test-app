import React from 'react';
import EmbedsSection from '../components/EmbedsSection';

const Home: React.FC = () => {
    return (
        <div className="p-10 max-w-4xl mx-auto">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Welcome to <span className="text-blue-600">SaaSify</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    The world's leading platform for generic business solutions.
                    Run your enterprise with 100% more synergy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg mb-4 flex items-center justify-center text-blue-600 font-bold">
                            {i}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Feature {i}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            This is a generic feature description that sounds impressive but means nothing.
                        </p>
                    </div>
                ))}
            </div>

            <EmbedsSection />

            <div className="mt-16 p-8 bg-blue-50 rounded-2xl text-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Start your trial today</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full font-semibold shadow-lg transition-transform hover:scale-105 cursor-pointer">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Home;
