import React from 'react'
import '../css/CallToAction.css'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'

export default function CallToAction() {
    const navigate = useNavigate();
  return (
    <div className='call-to-action'>
        
        <div className="call-container">

            <motion.div className="details"
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

            <p className="title">READY TO MAKE AN IMPACT?</p>
            <p className="desc-1">Whether you're starting a new business, expanding your operations, or simply need professional assistance, we're ready to help.</p>
            <p className="desc-2">Let's turn your business goals into action.</p>

            </motion.div>

            <motion.div className="button-section"
            initial={
                {
                    opacity:0.0,
                    x : -10,
                    scale:0.95
                }
           
            }
             whileInView={
                {
                    opacity:1,
                    x : 0,
                    scale:1
                }
            }
            transition={{
                duration: 1,
                ease: "easeIn"
             }}
            viewport={{
                once: true,
                amount: 0.5
            }}>
                <div className="button">
                    <p onClick={()=>{navigate('/contact')}}className="button-title">Contact Us Today</p>
                </div>
            </motion.div>

        </div>

    </div>
  )
}
