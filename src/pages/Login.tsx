import React, { useState } from 'react';
import { CookieFactory } from '../utils/cookieFactory';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Set Auth Cookie
        CookieFactory.set({
            name: 'auth_token',
            value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.simulated_token',
            days: 1,
            secure: true,
            sameSite: 'Lax'
        });

        // Set User Info Cookie (Bad practice simulation)
        CookieFactory.set({
            name: 'user_email',
            value: email,
            days: 1
        });

        alert('Logged in! Auth cookies set.');
        navigate('/');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 rounded-lg transition-colors"
                    >
                        Sign In
                    </button>
                    <div className="text-center text-xs text-gray-400">
                        This defaults to a successful login simulation.
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
