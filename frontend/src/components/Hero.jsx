import React from 'react'
import '../css/Hero.css'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import {useUser} from "@clerk/react"

export default function Hero() {

  const navigate = useNavigate();
  const {user} = useUser();

  
  return (
    <div className='hero'>
        <motion.div className="hero-container"
        initial={{
        opacity: 0,
        y: 40,
        scale: 0.95
        }}
        whileInView={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
  transition={{
    duration: 1.2,
    ease: "easeIn"
  }}
  viewport={{
    once: true,
    amount: 0.3
  }}>
            <div className='hero-info'>
                <p className='hero-p1'>BUSINESS SUPPORT THAT MOVES YOU FORWARD</p>
                <p className='hero-p2'>Your business. Our expertise. Your next level of growth.</p>
            </div>

            {
                !user ?
                <div className="hero-button-section">
              <div className="hero-button hero-btn-primary" onClick={ ()=>navigate('/appointment')}>
                <p className="booking">Make an Appointment</p>
              </div>
              
              <div className="hero-button hero-btn-secondary">
                <p onClick={ ()=>navigate('/signup')} className="register">Register</p>
              </div>
            </div>
            :
            <div className="hero-button-section">
              <div className="hero-button hero-btn-primary" onClick={ ()=>navigate('/appointment')}>
                <p className="booking" >Make an Appointment</p>
              </div>
            </div>
              }
            
            
        </motion.div>
    </div>
  )
}
