import React from 'react'
import Footer from '../components/Footer'
import '../css/About.css'
import aboutshirt from '../assets/impactLady.png'
import aboutlady from '../assets/about-Lady.webp'
import aboutvid from '../assets/impact-vid.mp4'

import { motion } from "motion/react"

export default function AboutPage() {
  return (
    <div className='about-page'>

        <div className='about-page-container'>

            <div className='about-page-hero'>
                
            </div>


            <div className='about-focus-div'>
                    <p className="focus-title">OUR VISON </p>
                    <p className="focus-line">CREATING A <motion.span initial={{opacity:0}} whileInView={{opacity:1}}  transition={{duration: 3,ease: "easeIn"}}>STRONGER</motion.span> BUSINESS COMMUNITY</p>
                    <p className="focus-detail-1">We envision a business environment where entrepreneurs and organizations have access to the <motion.span initial={{opacity:0}} whileInView={{opacity:1}}  transition={{duration: 3,ease: "easeIn"}}>guidance, resources, and support</motion.span> they need to succeed.</p>
                    <p className="focus-detail-2">By helping businesses establish strong foundations and operate more effectively, we aim to contribute to the development of sustainable, competitive, and impactful businesses throughout Trinidad and Tobago.</p>
                </div>

            <div className="about-intro-div">

                <div className="about-intro-det">
                    <motion.div initial={{opacity:0}} whileInView={{opacity:1}}  transition={{duration: 1.2,ease: "easeIn"}} viewport={{once: true,amount: 0.3}}>
                        <motion.p className="about-intro-title" >ABOUT IMPACT CONSULTANCY</motion.p>
                        <motion.p className='about-intro-p2' >MAKING BUSINESS <span>SIMPLER</span>. CREATING <span>GREATER IMPACT</span>.</motion.p>
                    </motion.div>
                    <motion.div initial={{opacity:0}} whileInView={{opacity:1}}  transition={{duration: 1.2,ease: "easeIn"}} viewport={{once: true,amount: 0.3}}>
                        <motion.p className='about-intro-p3' >At 1st Impact Service Consultants Ltd, we <span>believe</span> that every business deserves the <span>opportunity <br /> to succeed</span> with the right guidance and support.</motion.p>
                        <motion.p className='about-intro-p4' >We are a Trinidad and Tobago–based business consultancy <br /> <span>dedicated to helping entrepreneurs, startups, small businesses, and established organizations</span> <br /> navigate the challenges of starting, managing, and growing a business.</motion.p>
                    </motion.div>
                    
                </div>
                
                <motion.div className="about-intro-img"
                initial={{
                    x:-10,
                    opacity:0
                }}
                whileInView={{
                    x:0,
                    opacity:1
                }}
                transition={{
                    duration:0.8,
                    ease:"easeIn"
                }}
                viewport={{once: true,amount: 0.3}}>
                    <img src={aboutshirt} alt="" />
                </motion.div>
                
            </div>

            <div className="about-intro-div">

                <motion.div className="about-intro-img"
                initial={{
                    x:10,
                    opacity:0
                }}
                whileInView={{
                    x:0,
                    opacity:1
                }}
                transition={{
                    duration:0.8,
                    ease:"easeIn"
                }}
                viewport={{once: true,amount: 0.3}}>
                    <img src={aboutlady} alt="" />
                </motion.div>

                <div className="about-intro-det">
                    <motion.div initial={{ opacity:0, y:-10}} whileInView={{opacity:1, y:0}} transition={{duration: 1.2,ease: "easeIn"}} viewport={{once: true,amount: 0.3}}>
                    <p className="about-intro-title">EMPOWERING BUSINESSES TO BUILD, GROW & THRIVE</p>
                    <p className='about-intro-p3'> <span>Our mission</span> is to provide accessible, professional, and results-driven business support that helps <span>our clients turn their ideas into sustainable enterprises</span></p>
                    <p className='about-intro-p2'> <span>We strive to:</span></p>
                    </motion.div>
                    <motion.ul initial={{ opacity:0, x:-10}} whileInView={{opacity:1, x:0}} transition={{duration: 1.2,ease: "easeIn"}} viewport={{once: true,amount: 0.3}}>
                        <li className='about-intro-p5'>Simplify the process of starting and managing a business</li>
                        <li className='about-intro-p5'>Provide reliable guidance on business and regulatory requirements</li>
                        <li className='about-intro-p5'>Help entrepreneurs make informed business decisions</li>
                        <li className='about-intro-p5'>Support organizations in improving their operations</li>
                        <li className='about-intro-p5'>Equip clients with the tools and knowledge needed for growth</li>
                        <li className='about-intro-p5'>Build long-term relationships based on trust and professionalism</li>
                    </motion.ul>
                </div>

            </div>

                

                <div className="video-container">
                    <motion.p className="about-intro-title" initial={{ opacity:0, x:-10}} whileInView={{opacity:1, x:0}} transition={{duration: 1.2,ease: "easeIn"}} viewport={{once: true,amount: 0.3}}>A WORD FROM THE FOUNDER</motion.p >
                    <video src={aboutvid} type="video/mp4" controls></video>
                </div>
                
                

           
        
        
    </div>
</div>
  )
}
