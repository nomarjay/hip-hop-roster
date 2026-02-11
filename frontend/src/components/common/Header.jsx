import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Star, TrendingUp, Users } from 'lucide-react';
import React from 'react';


const Header = () => {
    return (
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                Logo/Icon
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-50 rounded-full"></div>
                        <Trophy className="relative w-24 h-24 text-yellow-500" />
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
                    HIP HOP
                    <span className="block bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                        ROSTER
                    </span>
                </h1>

                {/* Tagline */}
                <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
                    The definitive ranking system for hip hop artists.
                    <span className="block mt-2 text-gray-500">
                        Tier-based ratings • Comprehensive stats • Objective analysis
                    </span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                    <Link
                        to="/roster"
                        className="group px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-all flex items-center gap-3 text-lg shadow-lg shadow-yellow-500/50"
                    >
                        View The Roster
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/login"
                        className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all flex items-center gap-3 text-lg border border-gray-700"
                    >
                        Admin Login
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                        <Users className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                        <div className="text-3xl font-black text-white mb-2">500+</div>
                        <div className="text-gray-400">Artists Ranked</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                        <Star className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                        <div className="text-3xl font-black text-white mb-2">8</div>
                        <div className="text-gray-400">Rating Categories</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                        <TrendingUp className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                        <div className="text-3xl font-black text-white mb-2">6</div>
                        <div className="text-gray-400">Tier Rankings</div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-gray-600 rounded-full mt-2"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
