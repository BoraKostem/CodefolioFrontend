
import './App.css';

//pages
import AboutPage from './pages/About/AboutPage';
import LoginPage from "./pages/Login/LoginPage";
import HomePage from './pages/Home/HomePage';
import SignupPage from './pages/SignUp/SignupPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProfilePage from './pages/Profile/ProfilePage';
import SettingsPage from './pages/Settings/SettingsPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from './pages/UserProfile/UserPage';
import ContactPage from './pages/Contact/ContactPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/user/:id" element={<UserPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
