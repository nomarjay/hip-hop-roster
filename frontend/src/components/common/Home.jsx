import Header from './Header';
import Features from './Features';
import HowItWorks from './HowItWorks';
import React from 'react';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-950">
            <Header />
            <Features />
            <HowItWorks />
        </div>
    );
};

export default HomePage;
