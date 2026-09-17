import React from 'react'
import impactImage from  '../assets/impactImage.png'
import '../css/Navbar.css'
import {Link} from 'react-router-dom'
import { useClerk, UserButton, useUser} from '@clerk/react';
import { useState } from 'react';


export default function Navbar() {
    const {user}= useUser();
    const {openSignIn, openSignUp} = useClerk();
    const [navStatus, setNavStatus] = useState(false);
    const navFunction = ()=>{
        setNavStatus(prev => !prev);
    }
  return (
    <div className='navbar'>
        <div className='nav-container'>
            <img src={impactImage} alt="company-logo" className='nav-logo'/>
            <div className='nav-group'>
                <Link className='nav-element' to='/'>Home</Link>
                <Link className='nav-element' to='/services'>Services</Link>
                <Link className='nav-element' to='/appointment'>Appointment</Link>
                <Link className='nav-element' to='/about'>About Us</Link>
                <Link className='nav-element' to='/contact'>Contact</Link>
            </div>
            
            <div className="nav-auth">
                {
                !user ? 
                <div className='auth-group'>
                
                <Link className='auth-element'  to='/signup'>Register</Link>
                <Link className='auth-element' to='/signin'>Login</Link>
                </div>: < UserButton className="auth-user"
                    appearance={{
                    elements: {
                    avatarBox: {
                    width: "40px",
                    height: "40px",
                },
    },
  }}/>
            }
            </div>
            
            
        </div>

        <div className='nav-container-1'>
            <div className="nav-img">
                <img src={impactImage} alt="company-logo" className='nav-logo-1'/>
            </div>
            
            <div className="nav-drop-btn">
                <p onClick={()=>{navFunction()}}>{!navStatus ?"☰" : "✕"}</p>
            </div>
            
        </div>
        {navStatus && 
        <div className='nav-pop-up' >
            
                <Link className='nav-element-1' to='/'>Home</Link>
                <Link className='nav-element-1' to='/services'>Services</Link>
                <Link className='nav-element-1' to='/appointment'>Appointment</Link>
                <Link className='nav-element-1' to='/about'>About Us</Link>
                <Link className='nav-element-1' to='/contact'>Contact</Link>
                {
                !user ? 
                <div className='auth-group'>
                <Link className='nav-element-1'  to='/signup'>Register</Link>
                <Link className='nav-element-1' to='/signin'>Login</Link>
                </div>: < UserButton className="mobile-auth-user"
                appearance={{
                elements: {
                avatarBox: {
                width: "50px",
                height: "50px",
                },
    },
  }}/>
                }
           
        </div>}
        
        
    </div>
  )
}
