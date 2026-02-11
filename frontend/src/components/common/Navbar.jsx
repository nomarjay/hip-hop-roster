import { Link } from 'react-router-dom';
import { Trophy, Home, Shield, List } from 'lucide-react';
import { isAuthenticated } from '../services/authService';
import React from 'react';


const Navbar = () => {
    return (
        <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="flex items-center space-x-3 hover:opacity-80 transition"
                    >
                        <Trophy className="w-8 h-8 text-yellow-500" />
                        <span className="text-2xl font-black text-white">HIP HOP ROSTER</span>
                    </Link>

                    <div className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition"
                        >
                            <Home className="w-5 h-5" />
                            <span className="font-semibold">Home</span>
                        </Link>

                        <Link
                            to="/roster"
                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition"
                        >
                            <List className="w-5 h-5" />
                            <span className="font-semibold">Roster</span>
                        </Link>

                        {isAuthenticated() ? (
                            <Link
                                to="/admin"
                                className="flex items-center space-x-2 text-gray-300 hover:text-white transition"
                            >
                                <Shield className="w-5 h-5" />
                                <span className="font-semibold">Admin</span>
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition"
                            >
                                <Shield className="w-5 h-5" />
                                <span>Admin Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
