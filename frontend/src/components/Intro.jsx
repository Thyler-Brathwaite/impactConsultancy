import React from 'react'
import '../css/Intro.css'
import { motion } from "motion/react"

export default function Intro() {
  const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

  const item = {
  hidden: {
    opacity: 0,
    x: -50
  },

  visible: {
    opacity: 1,
    x: 0
  }
};
  return (

    <div className='intro'>
        <div className='intro-container'>
            <motion.div className='info-section'
             variants={container}
             initial="hidden"
             whileInView="visible"
             viewport={{
             once: true,
             amount: 0.5
              }}>
             
                <motion.p className='info-p1' variants={item}> <span>YOUR BUSINESS DESERVES THE RIGHT SUPPORT </span> </motion.p>
                <br />
                
                <motion.p  className='info-p2' variants={item}>Running a business comes with challenges — from registration and compliance to administration, staffing, and strategic planning.</motion.p >
                <br />
                <motion.p  className='info-p3' variants={item}>We make the process <span>easier</span>.</motion.p >
                <br />
                <motion.p  className='info-p4' variants={item}>At 1st Impact Service Consultants, we work alongside businesses to provide reliable professional support, simplify complex processes, and help you focus on what matters most: <span>growing your business</span>.</motion.p >
                <br />
                <motion.p  className='info-p5' variants={item}>Whether you're starting a new company or looking to strengthen an existing one, we're here to make an impact.</motion.p >
            </motion.div>
        </div>
      
    </div>
  )
}
