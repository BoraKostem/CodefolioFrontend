import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserInfo from "../../components/UserInfo";
import UserAbout from "../../components/UserAbout";
import Experience from "../../components/Experience";
import Education from "../../components/Education";
import Projects from "../../components/Projects";
import Skills from "../../components/Skills";
import Languages from "../../components/Languages";
import ProfileNavbar from "../../components/Navbars/ProfileNavbar";
import ProfileDataLoader from "../../components/ProfileDataLoader";
import LoginPage from ".././Login/LoginPage";
import { useAsyncError } from "react-router-dom";

export const context = React.createContext();

const ProfilePage = () => {
  const [edit, setEdit] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("accessToken") ? true : false
  );
  const navigate = useNavigate();

  const checkAuth = () => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  };

  const SessionTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds

  let sessionTimeoutId;

  const resetSessionTimeout = () => {
    clearTimeout(sessionTimeoutId);
    sessionTimeoutId = setTimeout(() => {
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      navigate("/login");
    }, SessionTimeout);
  };

  useEffect(() => {
    resetSessionTimeout();
    checkAuth();

    const handleUserActivity = () => {
      resetSessionTimeout();
    };

    // Register event listeners for user activity (e.g., mousemove, keydown, etc.)
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      clearTimeout(sessionTimeoutId);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, []);
  return (
    <div>
      <context.Provider value={[edit, setEdit]}>
        <ProfileNavbar></ProfileNavbar>
        <ProfileDataLoader></ProfileDataLoader>
      </context.Provider>
    </div>
  );
};

export default ProfilePage;
