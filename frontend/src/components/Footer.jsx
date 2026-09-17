import React from 'react'
import Logo from '../assets/impactImage.png'
import {Link} from 'react-router-dom'
import '../css/Footer.css'

export default function Footer() {
  return (
    <div className='footer'>
        <footer className='footer-container'>
            <div className='first-section'>
                <img src={Logo} alt="Impact Logo" />
                <div className='first-copyright'>
                    <p>&copy; {new Date().getFullYear()} Impact Consultancy</p>
                </div>
            
                
            </div>

            <div className='second-section'>
                <p>Quick Links</p>
                <div className='first-ul'>
                    <ul>
                        <li>
                            <Link className='ul-element' to='/'>Home</Link>
                        </li>
                        <li>
                            <Link className='ul-element' to='/services'>Services</Link>
                        </li>
                        <li>
                            <Link className='ul-element' to='/about'>About Us</Link>
                        </li>
                        
                    </ul>

                </div>
            </div>

            <div className='third-section'>
                <p>Appointments</p>
                <div className='first-ul'>
                    <ul>
                        <li >
                            <Link className='ul-element' to='/appointment'>Book Appointment</Link>
                        </li>
                        <li>
                            <Link className='ul-element'to='/contact'>Contact Us</Link>
                        </li>
                        
                    </ul>

                </div>
            </div>
        </footer>
    </div>
  )
}
