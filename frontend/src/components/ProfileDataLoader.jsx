import React, { useState, useEffect, useContext, createContext } from 'react';

import UserInfo from './UserInfo';
import UserAbout from './UserAbout';
import Experience from './Experience';
import Education from './Education';
import Projects from './Projects';
import Skills from './Skills';
import Languages from './Languages';
import Certificate from './Certificate';


export const fetchContext = React.createContext();

const ProfileDataLoader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [fetchCntrl, setFetchCntrl] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        // Fetch profile data using the access token
        const response = await fetch('http://ec2-18-159-106-239.eu-central-1.compute.amazonaws.com:8000/api/whoami', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
  
        
          const data = await response.json();
          console.log('Profile data:', data);
          setProfileData(data);
        
  
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [fetchCntrl]);

  const isProfileEmpty = (data) => {
    if (!data) return true;
    return (
      !data.about &&
      (!Array.isArray(data.cv_experiences) || data.cv_experiences.length === 0) &&
      (!Array.isArray(data.cv_educations) || data.cv_educations.length === 0) &&
      (!Array.isArray(data.cv_projects) || data.cv_projects.length === 0) &&
      (!Array.isArray(data.cv_certifications) || data.cv_certifications.length === 0) &&
      (!Array.isArray(data.cv_skills) || data.cv_skills.length === 0) &&
      (!Array.isArray(data.cv_languages) || data.cv_languages.length === 0)
    );
  };
  
    return (
  
        
          <div>
              { !isProfileEmpty(profileData) ? (
                <div>
                  <fetchContext.Provider value={[fetchCntrl, setFetchCntrl]}>
                <UserInfo
                name = {profileData.name}
                email = {profileData.email}
                phone = {profileData.phone} 
                github = {profileData.github_url}
                linkedin = {profileData.linkedin_url} 
                location = {profileData.location}
                />
                <div className="min-h-screen w-full overflow-hidden mx-auto px-10">
                <UserAbout data={profileData.name} />
                <Experience data={profileData.cv_experiences} />
                <Education data={profileData.cv_education} />
                <Projects data={profileData.cv_projects} />
                <Certificate data={profileData.cv_certifications} />
                <Skills data={profileData.cv_skills} />
                <Languages data={profileData.cv_languages} />
                </div>
                </fetchContext.Provider>
              </div>
              ) : ( 
                <div className='min-h-screen w-full overflow-hidden mx-auto px-50 flex justify-center items-center'>
                  <h1 className="flex justify-center items-center codefolio-yellow font-bold text-xl">You haven't created your portfolio yet. Go to settings and upload your CV.</h1>
                </div>
              )
            }
         </div>
  
         
   
     
    );
  };

export default ProfileDataLoader;


/*

import React from 'react';
import ProfileDataLoader from './ProfileDataLoader';
import UserInfo from '../../components/UserInfo';
import UserAbout from '../../components/UserAbout';
import Experience from '../../components/Experience';
import Education from '../../components/Education';
import Projects from '../../components/Projects';
import Skills from '../../components/Skills';
import Languages from '../../components/Languages';

const ProfilePage = () => {

  
  return (
    <ProfileDataLoader>
      {({ profileData }) => (
        <div className="min-h-screen codefoliobg-gray">
          <UserInfo data={profileData.userInfo} />
          <UserAbout data={profileData.userAbout} />
          <Experience data={profileData.experience} />
          <Education data={profileData.education} />
          <Projects data={profileData.projects} />
          <Skills data={profileData.skills} />
          <Languages data={profileData.languages} />
        </div>
      )}
    </ProfileDataLoader>
  );
};

export default ProfilePage;



*/