import { useEffect, useState } from "react";

import UploadPortfolio from "../../components/UploadPortfolio";
import UserNavbar from "../../components/Navbars/UserNavbar";
import Navbar from "../../components/Navbars/Navbar";
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("accessToken") ? true : false
  );
  const navigate = useNavigate();

  const SessionTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds

  let sessionTimeoutId;

  const resetSessionTimeout = () => {
    clearTimeout(sessionTimeoutId);
    sessionTimeoutId = setTimeout(() => {
      localStorage.removeItem("access_token");
      setIsAuthenticated(false);
      navigate("/login");
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
      {isAuthenticated ? <UserNavbar /> : <Navbar />}
      <UploadPortfolio />
    </div>
  );
}

export default DashboardPage;
