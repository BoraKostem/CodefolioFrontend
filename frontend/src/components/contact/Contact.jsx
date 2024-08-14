import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div className="min-h-screen codefoliobg-gray flex flex-col items-center justify-center">
      <div className="w-full h-64 mx-4">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.377287197519!2d32.74864671564888!3d39.8726683794295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f98db0c6e2d%3A0x94b446e1c7eebcff!2sBilkent%20University!5e0!3m2!1sen!2str!4v1692623834906!5m2!1sen!2str"
          title="Bilkent University Location Map"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <h1 className="text-4xl font-bold mb-8 codefolio-yellow mt-10">Contact Us</h1>
      <div className="flex space-x-8 mb-12">
        <a href="mailto:your.email@example.com" className="text-4xl codefolio-yellow">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a href="tel:+1234567890" className="text-4xl codefolio-yellow">
          <FontAwesomeIcon icon={faPhone} />
        </a>
      </div>
      
    </div>
  );
};

export default Contact;
