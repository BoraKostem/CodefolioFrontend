import React from 'react';

// Placeholder image URLs (replace with your actual image URLs)
const computerImage = 'https://via.placeholder.com/600x400?text=Tech+Image';

const AboutPageElement = () => {
  return (
    <div className="min-h-screen codefoliobg-gray">
      <div className="container mx-auto px-4 pt-12 md:px-8">
        <h1 className="cv-title text-center mb-6">About Codefolio</h1>
        <p className="text-xl leading-relaxed mb-12 text-center codefolio-white">
          Welcome to Codefolio, the ultimate platform for developers to showcase their skills and experience.
          Whether you're a seasoned software engineer or just starting out, Codefolio helps you create a professional profile that stands out to potential employers.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8 md:px-8 lg:py-12 mt-8 bg-gradient-to-r from-codefolio-gray via-codefolio-yellow to-codefolio-green rounded-3xl shadow-2xl">
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="w-full md:w-1/2 xl:w-1/3 p-6 codefoliobg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            {//<img src={computerImage} alt="What We Do" className="w-full h-48 object-cover rounded-t-2xl" />
            }
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 codefolio-yellow">What We Do</h2>
              <p className="text-lg leading-relaxed codefolio-gray">
                Codefolio allows users to easily add their CV and GitHub pages. Our platform automatically generates a profile page that highlights your skills,
                projects, and experience, making it easy for companies to find and hire the right developer for their needs.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6 codefoliobg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            {//<img src={computerImage} alt="Our Mission" className="w-full h-48 object-cover rounded-t-2xl" />
            }
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 codefolio-yellow">Our Mission</h2>
              <p className="text-lg leading-relaxed codefolio-gray">
                At Codefolio, our mission is to bridge the gap between talented developers and companies in need of their skills.
                We aim to make the hiring process seamless, efficient, and transparent, helping both developers and employers achieve their goals.
              </p>
            </div>
          </div>
        </div>

         {/* What We Offer Header */}
         <div className="text-center mb-12 ">
          <h2 className="text-3xl font-semibold mb-6 codefolio-yellow">What We Offer</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { title: 'Automated Profile Generation', description: 'Input your CV and GitHub link, and we\'ll do the rest.' },
            { title: 'Skills Highlighting', description: 'Showcase your expertise in specific technologies like React, Node.js, and more.' },
            { title: 'Project Experience', description: 'Display your previous work, such as social media applications or other projects.' },
            { title: 'Customizable Profile', description: 'Tailor your profile to highlight your unique strengths and experiences.' },
            { title: 'Easy to Use', description: 'Our user-friendly interface makes it simple to create and update your profile.' },
          ].map((item, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 xl:w-1/3 p-6 mb-6 group codefoliobg-yellow rounded-2xl shadow-lg hover:codefoliobg-white transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              <h2 className="text-2xl font-semibold mb-2 text-black group-hover:text-codefolio-yellow">{item.title}</h2>
              <p className="text-lg leading-relaxed text-black group-hover:text-codefolio-white">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center mb-12 relative z-10">
          <div className="w-full p-6 text-center">
            <h2 className="text-3xl font-semibold mb-2 codefolio-yellow">Get Started</h2>
            <p className="text-lg leading-relaxed codefolio-white">
              Ready to showcase your skills and land your dream job? <a href="/signup" className="text-codefolio-yellow hover:underline">Sign up</a> today and create your Codefolio profile in minutes!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageElement;