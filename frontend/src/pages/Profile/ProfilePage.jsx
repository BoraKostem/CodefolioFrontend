
import React, { useState, useEffect } from 'react';
import ProfileDataLoader from './ProfileDataLoader';
import UserInfo from '../../components/UserInfo';
import UserAbout from '../../components/UserAbout';
import Experience from '../../components/Experience';
import Education from '../../components/Education';
import Projects from '../../components/Projects';
import Skills from '../../components/Skills';
import Languages from '../../components/Languages';

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
useEffect(() => {
  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        setIsLoading(false);
        return;
      }

      // Fetch profile data using the access token
      const response = await fetch('http://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/profile/cv', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Access token expired, attempt to refresh
          const refreshResponse = await fetch('http://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/token/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken })
          });

          if (!refreshResponse.ok) {
            console.error('Failed to refresh access token');
            setIsLoading(false);
            return;
          }

          const refreshedData = await refreshResponse.json();
          localStorage.setItem('accessToken', refreshedData.access);
          setProfileData(refreshedData);
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } else {
        const data = await response.json();
        console.log('Profile data:', data);
        setProfileData(data.content);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setIsLoading(false);
    }
  };

  fetchData();
}, []);

  return (

      
        <div className="min-h-screen w-full overflow-hidden">
            { profileData && (
              <div>
              <UserInfo />
              <UserAbout data={profileData.about} />
              <Experience data={profileData.cv_experiences} />
              <Education data={profileData.cv_educations} />
              <Projects data={profileData.cv_projects} />
              <Skills data={profileData.cv_skills} />
              <Languages data={profileData.cv_languages} />
            </div>
            ) 
          }
       </div>
 
   
  );
};

export default ProfilePage;