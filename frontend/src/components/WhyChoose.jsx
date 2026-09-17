import React from 'react'
import '../css/WhyChoose.css'
import { motion } from "motion/react"

export default function WhyChoose() {

    const container = {
        hidden: {},
        visible: {
                    transition: {
                    staggerChildren: 0.2
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
            x: 0,
            transition:{duration: 1.2,ease: "easeIn"}
        }
    };

    
  return (
    <div className='why-choose'>

        <motion.div className="why-choose-container">

            <div className="why-choose-title">

                <p className="why-choose-title-p">WHY <motion.span initial={{opacity:0}} whileInView={{opacity:1}}  >1ST IMPACT</motion.span>?</p>
                
            </div>

            <motion.div className="why-choose-grid"
            variants={container}
            initial="hidden"
            whileInView="visible"
            transition={{duration: 4,ease: "easeIn"}}
            viewport={{
             once: true,
             amount: 0.2
              }}>

                <motion.div className="grid-card card4" variants={item}>

                    <div className="card-title">
                        <p className="card-title-p">Professional Guidance</p>
                    </div>

                    <div className="card-desc">
                        <p className="card-desc-p">We provide knowledgeable support to help you navigate important business processes with confidence</p>
                    </div>

                </motion.div>

                <motion.div className="grid-card card1" variants={item}>

                    <div className="card-title">
                        <p className="card-title-p">Personalized Solutions</p>
                    </div>

                    <div className="card-desc">
                        <p className="card-desc-p">Every business is different. We take the time to understand your needs and provide solutions suited to your goals.</p>
                    </div>

                </motion.div>

                <motion.div className="grid-card card2" variants={item}>

                    <div className="card-title">
                        <p className="card-title-p">Reliable Support</p>
                    </div>

                    <div className="card-desc">
                        <p className="card-desc-p">From your first registration to your ongoing business needs, we're here to support you throughout your journey.</p>
                    </div>

                </motion.div>

                <motion.div className="grid-card card3" variants={item}>

                    <div className="card-title">
                        <p className="card-title-p">Focused on Your Growth</p>
                    </div>

                    <div className="card-desc">
                        <p className="card-desc-p">Our goal isn't simply to complete paperwork. We help create stronger foundations for your business to grow and succeed.</p>
                    </div>

                </motion.div>

            </motion.div>

        </motion.div>
      
    </div>
  )
}
