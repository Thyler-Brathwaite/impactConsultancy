import React, { useEffect, useRef, useState } from 'react'
import impactImage from  '../assets/impactImage.png'
import '../css/Navbar.css'
import {Link} from 'react-router-dom'
import { useClerk, UserButton, useUser} from '@clerk/react';
import { motion } from 'motion/react';


export default function Navbar() {
    const {user}= useUser();
    const {openSignIn, openSignUp} = useClerk();
    const [navStatus, setNavStatus] = useState(false);
    const navFunction = ()=>{
        setNavStatus(prev => !prev);
    }

    const popupRef = useRef(null);
    const toggleRef = useRef(null);

    useEffect(() => {
        if (!navStatus) return;

        const handleOutsideClick = (event) => {
            const clickedInsidePopup =
                popupRef.current && popupRef.current.contains(event.target);
            const clickedToggleButton =
                toggleRef.current && toggleRef.current.contains(event.target);

            if (!clickedInsidePopup && !clickedToggleButton) {
                setNavStatus(false);
            }
        };

       
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
        };
    }, [navStatus]);

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
            
            <div className="nav-drop-btn" ref={toggleRef}>
                <p onClick={()=>{navFunction()}}>{!navStatus ?"☰" : "✕"}</p>
            </div>
            
        </div>
        {navStatus && 
        <motion.div className='nav-pop-up' ref={popupRef} initial={{
                opacity: 0,
                 x: -40,
                
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                
            }}
            transition={{
                duration: 1.2,
                ease: "easeIn"
             }}
            viewport={{
                once: true,
                amount: 0.5
            }}>
            
                <Link className='nav-element-1' to='/' onClick={() => setNavStatus(false)}>Home</Link>
                <Link className='nav-element-1' to='/services' onClick={() => setNavStatus(false)}>Services</Link>
                <Link className='nav-element-1' to='/appointment' onClick={() => setNavStatus(false)}>Appointment</Link>
                <Link className='nav-element-1' to='/about' onClick={() => setNavStatus(false)}>About Us</Link>
                <Link className='nav-element-1' to='/contact' onClick={() => setNavStatus(false)}>Contact</Link>
                {
                !user ? 
                <div className='auth-group'>
                <Link className='nav-element-1'  to='/signup' onClick={() => setNavStatus(false)}>Register</Link>
                <Link className='nav-element-1' to='/signin' onClick={() => setNavStatus(false)}>Login</Link>
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
           
        </motion.div>}
        
        
    </div>
  )
}