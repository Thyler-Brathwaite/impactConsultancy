import React from 'react'
import '../css/ServicePage.css'
import Footer from '../components/Footer'
import { motion } from 'motion/react'

export default function ServicePage() {
  return (
    <div className='service-page'>
      <div className='service-page-container'>
        <div className="service-intro">

            <motion.div className="service-title-div"
             >
                <p className='service-title'>HOW WE CAN HELP</p>
            </motion.div>

            <motion.div 
            >
                <p className="service-desc">We offer a range of professional business services tailored to the needs of entrepreneurs and organizations.</p>
            </motion.div>

        </div>

        <div className="service-info-grid">
         <motion.div className="info-card"
         initial={{
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
            <div className="info-title-div">
                <p className="service-info-title">Business Registration & Incorporation</p>
            </div>
            <div className="info-service-div">
                <p className="info-service">Get your business properly established with professional assistance throughout the registration and incorporation process.</p>
            </div>
        </motion.div>
        
        <motion.div className="info-card"
        initial={{
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
            <div className="info-title-div">
                <p className="service-info-title">OPR Registration & Prequalification</p>
            </div>
            <div className="info-service-div">
                <p className="info-service">Get support with OPR registration, profile creation, documentation, publication, and prequalification requirements.</p>
            </div>
        </motion.div>

        <motion.div className="info-card"
        initial={{
                opacity: 0,
                 x: -40,
                
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                
            }}
            transition={{
                duration: 1.2,
                ease: "easeOut"
             }}
            viewport={{
                once: true,
                amount: 0.5
            }}>
            <div className="info-title-div">
                <p className="service-info-title">Tender Application Support</p>
            </div>
            <div className="info-service-div">
                <p className="info-service">Navigate the tender application process with assistance preparing and submitting the necessary documentation.</p>
            </div>
        </motion.div>

        <motion.div className="info-card"
        initial={{
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
            <div className="info-title-div">
                <p className="service-info-title">Payroll Management</p>
            </div>
            <div className="info-service-div">
                <p className="info-service">Keep your payroll processes organized and efficient while ensuring your employees are properly managed.</p>
            </div>
        </motion.div>

        <motion.div className="info-card"
        initial={{
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
            <div className="info-title-div">
                <p className="service-info-title">Compliance & Government Services</p>
            </div>
            <div className="info-service-div">
                <p className="info-service">Receive assistance with NIB, BIR and other business-related regulatory requirements.</p>
            </div>
        </motion.div>

        <motion.div className="info-card"
        initial={{
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
            <div className="info-title-div">
                <p className="service-info-title">Company Profiles & Policies</p>
            </div>
            <div className="info-service-div">
                <p className="info-service">Present your business professionally with customized company profiles and essential business policies.</p>
            </div>
        </motion.div>

        <motion.div className="info-card"
        initial={{
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
            <div className="info-title-div">
                <p className="service-info-title">Training, Development & Recruitment</p>
            </div>
            <div className="info-service-div">
                <p className="info-service">Build a stronger organization through professional training, development, and recruitment support.</p>
            </div>
        </motion.div>


        <motion.div className="info-card"
        initial={{
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
            <div className="info-title-div">
                <p className="service-info-title">Post-Incorporation Services</p>
            </div>
            <div className="info-service-div">
                <p className="info-service">Stay on top of your company's ongoing filing and administrative requirements after incorporation.</p>
            </div>
        </motion.div>
        </div>
       
        
      </div>
    </div>
  )
}
