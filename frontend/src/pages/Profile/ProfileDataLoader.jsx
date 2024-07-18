import React, { useState, useEffect } from 'react';

const ProfileDataLoader = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        const response = await fetch('https://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/profile/cv', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Access token expired, attempt to refresh
            const refreshResponse = await fetch('https://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/token/refresh', {
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
          setProfileData(data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return React.cloneElement(children, { profileData });
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


import React from 'react';
import UserInfo from '../../components/UserInfo';
import UserAbout from '../../components/UserAbout';
import Experience from '../../components/Experience';
import Education from '../../components/Education';
import Projects from '../../components/Projects';
import Skills from '../../components/Skills';
import Languages from '../../components/Languages';

const ProfilePage = () => {
  const profileData = {
    userInfo: {
      name: "John Doe",
      title: "Software Developer",
      location: "San Francisco, CA",
    },
    userAbout: {
      bio: "A passionate developer with experience in React and backend development.",
    },
    experience: [
      {
        company: "Tech Company",
        role: "Frontend Developer",
        duration: "Jan 2020 - Present",
      },
      {
        company: "Another Tech Company",
        role: "Backend Developer",
        duration: "Jan 2018 - Dec 2019",
      },
    ],
    education: [
      {
        institution: "University of Somewhere",
        degree: "B.S. in Computer Science",
        duration: "2014 - 2018",
      },
    ],
    projects: [
      {
        name: "Project One",
        description: "A cool project.",
      },
      {
        name: "Project Two",
        description: "Another cool project.",
      },
    ],
    skills: ["JavaScript", "React", "Node.js"],
    languages: ["English", "Spanish"],
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <UserInfo data={profileData.userInfo} />
      <UserAbout data={profileData.userAbout} />
      <Experience data={profileData.experience} />
      <Education data={profileData.education} />
      <Projects data={profileData.projects} />
      <Skills data={profileData.skills} />
      <Languages data={profileData.languages} />
    </div>
  );
};

export default ProfilePage;

*/