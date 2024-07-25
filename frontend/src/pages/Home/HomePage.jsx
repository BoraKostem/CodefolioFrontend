
import SearchBar from './SearchBar'
import UserNavbar from '../../components/UserNavbar';
import LoggedinNavbar from '../../components/LoggedInNavbar';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react'
function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('accessToken') ? true : false);
 
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
      {isAuthenticated ? <LoggedinNavbar/> : <UserNavbar/>}
      <SearchBar/>
      <Footer/>
    </div>
  )
}

export default HomePage;