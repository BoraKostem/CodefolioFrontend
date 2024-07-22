import React, { useState, useEffect } from "react";

import UserInfo from "../../components/UserInfo";
import UserAbout from "../../components/UserAbout";
import Experience from "../../components/Experience";
import Education from "../../components/Education";
import Projects from "../../components/Projects";
import Skills from "../../components/Skills";
import Languages from "../../components/Languages";
import Navbar from "../../components/LoggedInNavbar";
import ProfileDataLoader from "../../components/ProfileDataLoader";

const ProfilePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <ProfileDataLoader></ProfileDataLoader>
    </div>
  );
};

export default ProfilePage;
