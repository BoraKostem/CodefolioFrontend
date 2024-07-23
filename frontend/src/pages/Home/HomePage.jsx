import React from 'react'
import SearchBar from './SearchBar'
import UserNavbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';
function HomePage() {
  return (
    <div>
      <UserNavbar/>
      <SearchBar/>
      <Footer/>
    </div>
  )
}

export default HomePage;