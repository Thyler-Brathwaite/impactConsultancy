import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import ServicePage from './pages/ServicePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import Contact from './pages/Contact.jsx'
import SignInPage from './pages/SignInPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import ScrollToTop from "./data/ScrollToTop";
import AppointmentPage from './pages/AppointmentPage.jsx'
import ScrollProgress from './data/ScrollProgress.jsx'
import BookAppointment from './pages/BookAppointment.jsx'
import BookingsPage from './pages/client/BookingsPage.jsx'
import Footer from './components/Footer'
import AdminBookingsPage from './pages/admin/AdminBookingsPage.jsx'





function App() {
  
  return (
    <>
      <Navbar></Navbar>
       <ScrollToTop />
       <ScrollProgress></ScrollProgress>
       
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/services' element={<ServicePage/>}></Route>
        <Route path='/about' element={<AboutPage/>}></Route>
        <Route path='/appointment' element={<AppointmentPage/>}></Route>
        <Route path='/signin' element={<SignInPage/>}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/create' element={<BookAppointment/>}></Route>
        <Route path='/client/appointment' element={<BookingsPage/>}></Route>
        <Route path='/admin/appointment' element={<AdminBookingsPage/>}></Route>



      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
