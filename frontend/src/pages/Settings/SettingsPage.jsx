import React from 'react'
import EditForm from './EditForm'
import Navbar from "../../components/LoggedInNavbar";
import Footer from '../../components/Footer';


function SettingsPage() {
  return (
    <div>
      <Navbar></Navbar>
      <EditForm></EditForm>
      <Footer></Footer>
    </div>
  )
}

export default SettingsPage