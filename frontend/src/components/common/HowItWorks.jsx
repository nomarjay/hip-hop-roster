import { Search, BarChart, Trophy } from 'lucide-react';
import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            number: '01',
            icon: <Search className="w-12 h-12" />,
            title: 'Browse the Roster',
            description: 'Explore hundreds of ranked hip hop artists from legends to rising stars.',
            color: 'from-yellow-500 to-amber-500',
        },
        {
            number: '02',
            icon: <BarChart className="w-12 h-12" />,
            title: 'View Detailed Stats',
            description:
                'Click any artist to see comprehensive breakdowns of their skills and achievements.',
            color: 'from-purple-500 to-pink-500',
        },
        {
            number: '03',
            icon: <Trophy className="w-12 h-12" />,
            title: 'Compare Rankings',
            description:
                'See how your favorite artists stack up against the greatest in hip hop history.',
            color: 'from-blue-500 to-cyan-500',
        },
    ];

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-950 to-black">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black text-white mb-4">How It Works</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Simple, transparent, and built for hip hop fans.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gray-700 to-gray-800"></div>
                            )}

                            <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all">
                                {/* Step Number */}
                                <div className="absolute -top-6 left-8">
                                    <div
                                        className={`bg-gradient-to-br ${step.color} text-black font-black text-2xl w-12 h-12 rounded-full flex items-center justify-center shadow-lg`}
                                    >
                                        {step.number}
                                    </div>
                                </div>

                                {/* Icon */}
                                <div
                                    className={`bg-gradient-to-br ${step.color} bg-clip-text text-transparent mb-6 mt-4`}
                                >
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
