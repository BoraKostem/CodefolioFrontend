import React from 'react';
import '../../CSS/About.css'; 

const About = () => {
    return (
        <div className="about-container">
            <h1>About Codefolio</h1>
            <p>
                Welcome to Codefolio, the ultimate platform for developers to showcase their skills and experience. 
                Whether you're a seasoned software engineer or just starting out, Codefolio helps you create a professional profile that stands out to potential employers.
            </p>
            <br />
            <h2>What We Do</h2>
            <p>
                Codefolio allows users to easily add their CV and GitHub pages. Our platform automatically generates a profile page that highlights your skills, 
                projects, and experience, making it easy for companies to find and hire the right developer for their needs.
            </p>
            <br />
            <h2>Features</h2>
            <ul>
                <li>Automated Profile Generation: Input your CV and GitHub link, and we'll do the rest.</li>
                <li>Skills Highlighting: Showcase your expertise in specific technologies like React, Node.js, and more.</li>
                <li>Project Experience: Display your previous work, such as social media applications or other projects.</li>
                <li>Customizable Profile: Tailor your profile to highlight your unique strengths and experiences.</li>
                <li>Easy to Use: Our user-friendly interface makes it simple to create and update your profile.</li>
            </ul>
            <br />
            <h2>Our Mission</h2>
            <p>
                At Codefolio, our mission is to bridge the gap between talented developers and companies in need of their skills. 
                We aim to make the hiring process seamless, efficient, and transparent, helping both developers and employers achieve their goals.
            </p>
            <br />
            <h2>Get Started</h2>
            <p>
                Ready to showcase your skills and land your dream job? Sign up today and create your Codefolio profile in minutes!
            </p>
        </div>
    );
};

export default About;
