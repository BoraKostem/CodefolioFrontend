import React from 'react'
import About from './About'
import Navbar from "../../components/LoggedInNavbar";
import Footer from '../../components/Footer';


function AboutPage() {
  return (
    <div>
      <Navbar></Navbar>
      <About></About>
      <Footer></Footer>
    </div>
  )
}

export default AboutPage