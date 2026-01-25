import { Target, BarChart3, Award, Zap, Shield, TrendingUp } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Target className="w-12 h-12" />,
            title: 'Objective Rankings',
            description:
                'Artists rated across 8 comprehensive categories including lyricism, flow, and impact.',
            color: 'text-yellow-500',
        },
        {
            icon: <BarChart3 className="w-12 h-12" />,
            title: 'Detailed Stats',
            description:
                'In-depth analysis with letter grades from A+ to F- for each performance metric.',
            color: 'text-purple-500',
        },
        {
            icon: <Award className="w-12 h-12" />,
            title: 'Achievement Badges',
            description:
                'Special badges recognizing unique talents and signature styles of each artist.',
            color: 'text-pink-500',
        },
        {
            icon: <Zap className="w-12 h-12" />,
            title: 'Tier System',
            description:
                'S-Tier to F-Tier rankings that show where artists stand in the hip hop hierarchy.',
            color: 'text-blue-500',
        },
        {
            icon: <Shield className="w-12 h-12" />,
            title: 'Data Integrity',
            description:
                'All ratings backed by research and comprehensive analysis of artist careers.',
            color: 'text-green-500',
        },
        {
            icon: <TrendingUp className="w-12 h-12" />,
            title: 'Live Updates',
            description:
                'Rankings updated regularly as artists release new music and grow their legacy.',
            color: 'text-orange-500',
        },
    ];

    return (
        <section className="py-20 px-4 bg-gray-950">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black text-white mb-4">Why Hip Hop Roster?</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        The most comprehensive and objective ranking system for hip hop artists ever
                        created.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all hover:transform hover:scale-105 group"
                        >
                            <div
                                className={`${feature.color} mb-6 group-hover:scale-110 transition-transform`}
                            >
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
