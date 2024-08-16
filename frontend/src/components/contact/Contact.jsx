import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import zeynepCodefolio from '../../assets/zeynepCodefolio.jpg';
import boraCodefolio from '../../assets/boraCodefolio.jpg';
import boranCodefolio from '../../assets/boranCodefolio.jpeg';
import torkanCodefolio from '../../assets/torkanCodefolio.jpeg';
import mehmetCodefolio from '../../assets/mehmetCodefolio.jpg';
import linkedin from '../../assets/linkedin.png';
const developers = [
  {
    name: 'Bora Fenari Köstem',
    photo: boraCodefolio,
    linkedin: 'https://www.linkedin.com/in/bora-fenari-köstem-7353681a3/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    email: 'fenari.kostem@gmail.com',
  },
  {
    name: 'Torkan Hesari',
    photo: torkanCodefolio,
    linkedin: 'https://www.linkedin.com/in/torkanhesari/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    email: 'torkanhesari78@gmail.com',
  },
  {
    name: 'Boran Kılıçaslan',
    photo: boranCodefolio,
    linkedin: 'https://www.linkedin.com/in/borankilicaslan/',
    email: 'boran.kilicaslan@hotmail.com',
  },
  {
    name: 'Mehmet Akif Yavuz',
    photo: mehmetCodefolio,
    linkedin: 'https://www.linkedin.com/in/mehmet-akif-yavuz-91256a246/',
    email: 'akif.yavuz@ug.bilkent.edu.tr',
  },
  {
    name: 'Zeynep Göksu Üçüncüoğlu',
    photo: zeynepCodefolio,
    linkedin: 'https://www.linkedin.com/in/zeynepucuncuoglu/',
    email: 'zeynepucuncuogluu@gmail.com',
  }
];

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
      <h2 className="text-3xl font-semibold mb-6 codefolio-yellow">Meet Our Developers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((dev, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <img src={dev.photo} alt={`${dev.name} photo`} className="w-32 h-32 rounded-full mb-4" />
            <h2 className="text-2xl font-bold mb-2">{dev.name}</h2>
            <div className="flex space-x-4">
              <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="linkedin" style={{ width: '24px', height: '24px'}} />
              </a>
              <a href={`mailto:${dev.email}`}>
                <FontAwesomeIcon icon={faEnvelope} className="text-2xl codefolio-yellow" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
