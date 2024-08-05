import { useEffect, useState } from "react";
import UserProfile from '../../components/UserProfile'
import UserNavbar from "../../components/Navbars/UserNavbar";
import Navbar from "../../components/Navbars/Navbar";

const UserPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("accessToken") ? true : false
      );
    
      const SessionTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds
    
      let sessionTimeoutId;
    
      const resetSessionTimeout = () => {
        clearTimeout(sessionTimeoutId);
        sessionTimeoutId = setTimeout(() => {
          localStorage.removeItem("access_token");
          setIsAuthenticated(false);
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
      <UserProfile />
    </div>
  )
}

export default UserPage
