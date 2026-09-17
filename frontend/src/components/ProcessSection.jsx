import React from 'react'
import '../css/Process.css'
import { motion } from "motion/react"



export default function ProcessSection() {

    

    const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

  const item = {
  hidden: {
    
    y: 80
  },

  visible: {
   
    y: 0
  }
};

  return (
    <div className='ProcessSection'>
        
        <div className='process-section-container'>
            <div className='process-title'>
                <p className='process-title-p'>FROM IDEA TO IMPACT</p>
            </div>
            

            <motion.div className='steps-grid'
            variants={container}
            initial="hidden"
            whileInView="visible"
            transition={{
            duration: 1.2,
            ease: "easeIn"
                }}>
                <motion.div className='step' variants={item}>

                    <div className='step-title'>
                        <p className='step-title-p1'>01</p>
                        <div className='line'></div>
                        <p className='step-title-p2' >CONSULT</p>
                    </div>
                    <div className='step-detail'>
                        <p className='step-detail-p'>Tell us about your business and what you need help with.</p>
                    </div>
                    
                </motion.div>

                <motion.div className='step' variants={item}>

                    <div className='step-title'>
                        <p className='step-title-p1'>02</p>
                        <div className='line'></div>
                        <p className='step-title-p2'>PLAN</p>
                    </div>
                    <div className='step-detail'>
                        <p className='step-detail-p'>We identify the requirements and develop a practical approach.</p>
                    </div>
                    
                </motion.div>

                <motion.div className='step' variants={item}>

                    <div className='step-title'>
                        <p className='step-title-p1' >03</p>
                        <div className='line'></div>
                        <p className='step-title-p2'>EXECUTE</p>
                    </div>
                    <div className='step-detail'>
                        <p className='step-detail-p'>Our team assists with the necessary processes, documentation, and services.</p>
                    </div>
                    
                </motion.div>

                <motion.div className='step' variants={item}>

                    <div className='step-title'>
                        <p className='step-title-p1'>04</p>
                        <div className='line'></div>
                        <p className='step-title-p2'>GROW</p>
                    </div>
                    <div className='step-detail'>
                        <p className='step-detail-p'>With the right foundation in place, you can focus on building your business.</p>
                    </div>
                    
                </motion.div>

                
            </motion.div>
            
        </div>

    </div>
  )
}
