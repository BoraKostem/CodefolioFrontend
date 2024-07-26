import React, {useEffect, useState} from 'react'
import EditForm from './EditForm'
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';


function SettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('accessToken') ? true : false);
  const navigate = useNavigate();

  const checkAuth = () => {
    if(!localStorage.getItem('accessToken')){
      navigate("/login");
    }
  }
  const SessionTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds

let sessionTimeoutId;

const resetSessionTimeout = () => {
  clearTimeout(sessionTimeoutId);
  sessionTimeoutId = setTimeout(() => {
  localStorage.removeItem("access_token");
    setIsAuthenticated(false);;
  }, SessionTimeout);
};

useEffect(() => {
  resetSessionTimeout();

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
      <EditForm></EditForm>
      <Footer></Footer>
    </div>
  )
}

export default SettingsPage