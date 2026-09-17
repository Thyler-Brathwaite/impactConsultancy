import React from 'react'
import '../css/Contact.css'
import { motion } from "motion/react"
import { Phone, Mail, MapPinned, Smartphone } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Contact() {
    const container = {
        hidden:{},
        visible:{
            transition: {
            staggerChildren: 0.2,
        
            }
        }
    }
    const item = {
        hidden: {
            opacity: 0,
            x: -50
        },

        visible: {
            opacity: 1,
            x: 0
        }
    }

  return (
    <div className='contact'>

        <div className='contact-container'>
            
            <motion.div className='contact-focus-div'variants={container} initial="hidden" whileInView="visible" >
                    <motion.p className="contact-title" variants={item}> <span>Let’s Start a Conversation</span></motion.p>
                    <motion.p className="contact-line" variants={item}>Have a question, need professional guidance, or want to discuss how we can help your business? Get in touch with Impact Consultancy today.</motion.p>
                    <motion.p className='contact-intro-p2' variants={item}> <MapPinned /> Office</motion.p>
                    <motion.ul variants={item}>
                        <motion.li className='contact-intro-p5'>Impact Consultancy Ltd.</motion.li>
                        <motion.li className='contact-intro-p5'>Trinidad & Tobago</motion.li>
                        <motion.li className='contact-intro-p5'>Edinburgh 500 Village Plaza, Chaguanas, Trinidad and Tobago 0000</motion.li>
                    </motion.ul>

                    <motion.p className='contact-intro-p2' variants={item}> <Phone /> Phone</motion.p>
                    
                    <motion.ul variants={item}>
                        <motion.li className='contact-intro-p5'>+1(868)-391-4316</motion.li>
                    </motion.ul>

                    <motion.p className='contact-intro-p2' variants={item}> <Mail /> Email</motion.p>
                    <motion.ul variants={item}>
                        <motion.li className='contact-intro-p5'>impactconsultancy.com</motion.li>
                        <motion.li className='contact-intro-p5'>consultancyimpact01@gmail.com</motion.li>
                    </motion.ul>

                    <motion.p className='contact-intro-p2' variants={item}> <Smartphone /> Social Media</motion.p>
                    <motion.ul variants={item}>
                        <motion.li className='contact-intro-p5'> <a href="https://www.facebook.com/p/1st-Impact-Service-Consultants-100093330960235/"  target="_blank" rel="noopener noreferrer"><FaFacebook/> 1st Impact Service Consultants</a></motion.li>
                        <motion.li className='contact-intro-p5' ><a href="https://www.instagram.com/impactconsultancyltd"  target="_blank" rel="noopener noreferrer"><FaInstagram/>impactconsultancyltd</a></motion.li>
                    </motion.ul>
                    
                    
                    
                </motion.div>

        </div>
      
    </div>
  )
}
