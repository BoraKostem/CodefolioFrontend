import React from 'react';
import Navbar from '../../components/Navbars/Navbar';
import Footer from '../../components/Footer';
import AboutPageElement from './AboutPageElement';

const AboutPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <AboutPageElement />
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
