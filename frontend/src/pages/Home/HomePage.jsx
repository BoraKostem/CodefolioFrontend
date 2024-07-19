import React from 'react'
import SearchBar from './SearchBar'
import UserNavbar from '../../components/UserNavbar';
function HomePage() {
  return (
    <div>
      <UserNavbar/>
      <SearchBar/>
    </div>
  )
}

export default HomePage;