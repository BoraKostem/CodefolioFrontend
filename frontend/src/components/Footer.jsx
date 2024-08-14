import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const footerLinksClasses = 
        "text-gray-100 font-bold text-sm px-2 py-1 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition duration-300";

    return (
        <footer className="bg-[#45474B] text-[#F5F7F8] py-4 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex">
                        <Link to="/privacy" className={footerLinksClasses}>
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className={footerLinksClasses}>
                            Terms of Service
                        </Link>
                    </div>
                    <div className="text-sm">
                        © {new Date().getFullYear()} Codefolio. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
