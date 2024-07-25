import React, { useState, useEffect, useContext, createContext } from 'react';

import UserInfo from './UserInfo';
import UserAbout from './UserAbout';
import Experience from './Experience';
import Education from './Education';
import Projects from './Projects';
import Skills from './Skills';
import Languages from './Languages';


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
        const response = await fetch('http://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/profile/cv', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
  
        
          const data = await response.json();
          console.log('Profile data:', data);
          setProfileData(data.content);
        
  
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [fetchCntrl]);
  
    return (
  
        
          <div>
              { profileData && (
                <div>
                  <fetchContext.Provider value={[fetchCntrl, setFetchCntrl]}>
                <UserInfo />
                <div className="min-h-screen w-full overflow-hidden mx-auto px-10">
                <UserAbout data={profileData.about} />
                <Experience data={profileData.cv_experiences} />
                <Education data={profileData.cv_educations} />
                <Projects data={profileData.cv_projects} />
                <Skills data={profileData.cv_skills} />
                <Languages data={profileData.cv_languages} />
                </div>
                </fetchContext.Provider>
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