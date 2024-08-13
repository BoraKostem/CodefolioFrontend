import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../utils/config";
import UserInfo from "./UserInfo";
import UserAbout from "./UserAbout";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import Skills from "./Skills";
import Languages from "./Languages";
import Certificate from "./Certificate";
import UserExperience from "./UserProfile/UserExperience";
import UserProjects from "./UserProfile/UserProjects";
import UserSkills from "./UserProfile/UserSkills";
import UserEducation from "./UserProfile/UserEducation";
import UserCertifications from "./UserProfile/UserCertifications";
import UserLanguages from "./UserProfile/UserLanguages";
import Footer from "./Footer";
import Chat from "./Chat";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile/public?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProfileData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileData();
  }, [id]);

  const isProfileEmpty = (data) => {
    if (!data) return true;
    return (
      !data.about &&
      (!Array.isArray(data.cv_experiences) ||
        data.cv_experiences.length === 0) &&
      (!Array.isArray(data.cv_educations) || data.cv_educations.length === 0) &&
      (!Array.isArray(data.cv_projects) || data.cv_projects.length === 0) &&
      (!Array.isArray(data.cv_certifications) ||
        data.cv_certifications.length === 0) &&
      (!Array.isArray(data.cv_skills) || data.cv_skills.length === 0) &&
      (!Array.isArray(data.cv_languages) || data.cv_languages.length === 0)
    );
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    
        <div className="pt-10">
          <UserInfo
            name={profileData.name || ""}
            email={profileData.email || ""}
            phone={profileData.phone || ""}
            github={profileData.github_url || ""}
            linkedin={profileData.linkedin_url || ""}
            location={profileData.location || ""}
          />
          <div className="min-h-screen w-full overflow-hidden mx-auto px-10 pb-20">
            {profileData.about !== " " && (
              <UserAbout data={profileData.about || ""} />
            )}
            {profileData.cv_education.length > 0 && (
              <UserEducation data={profileData.cv_education} />
            )}
            {profileData.cv_experiences.length > 0 && (
              <UserExperience data={profileData.cv_experiences} />
            )}
            {profileData.cv_projects.length > 0 && (
              <UserProjects data={profileData.cv_projects} />
            )}
            {profileData.cv_certifications.length > 0 && (
              <UserCertifications data={profileData.cv_certifications} />
            )}
            {profileData.cv_skills.length > 0 && (
              <UserSkills data={profileData.cv_skills} />
            )}
            {profileData.cv_languages.length > 0 && (
              <UserLanguages data={profileData.cv_languages} />
            )}
          </div>
          {/* Add the Chat component here */}
          <div>
            {
            !isOpen && (
                <div>
                <Chat userId={profileData.id} onClose={toggleChat} />
                </div>
            )}
            <div
      className="fixed bottom-20 right-10 codefoliobg-green p-3 rounded-full shadow-lg cursor-pointer"
      onClick={toggleChat}
    >
      <FontAwesomeIcon icon={faComment} className="text-white text-xl" />
    </div>
          </div>
          <Footer/>
        </div>
   
    </div>
  );
};

export default UserProfile;
