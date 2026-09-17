import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Appointment.css'
import { useUser } from '@clerk/react'
import { useState } from 'react'
import { motion } from "motion/react"

export default function AppointmentPage() {
  const {user} = useUser();
  const role = user?.publicMetadata?.role;
  return (
    <div className='appointment-page'>

       {
              !user ? 
              <motion.div className='appointment-denial-page'
              initial={{
                opacity: 0,
                 y: -10,
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
                amount: 0.5
            }}>
                  <p className='denial-title'>NOT A CLIENT YET?</p>
                  <p className='denial-desc'>You must be signed in to book an appointment with Impact Consultancy. Please sign in or create an account to continue.</p>
                  <div className='denial-btn-group'>
                    <Link className='denial-element'  to='/signup'>Register</Link>
                    <Link className='denial-element' to='/signin'>Login</Link>
                  </div>
              </motion.div> 
              
              :

            <div className="appointment-page-container">

                <p className="denial-desc">
                Manage your appointments with Impact Consultancy. Book a new consultation
                or view your upcoming and previous appointments.
                </p>

            <div className="appointment-group">
                <Link className="appointment-element" to="/create">
                  Create Appointment
                </Link>

                <Link
                  className="appointment-element"
                  to={role === "admin" ? "/admin/appointment" : "/client/appointment"}
                >
                View Appointments
                </Link>
            </div>

            </div>
            }
        
        
        
        
    </div>
  )
}
