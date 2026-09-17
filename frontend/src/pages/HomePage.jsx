import React from 'react'
import '../css/HomePage.css'
import Hero from '../components/Hero'
import Intro from '../components/Intro'

import ProcessSection from '../components/ProcessSection'
import WhyChoose from '../components/WhyChoose'
import CallToAction from '../components/CallToAction'


export default function HomePage() {

 



  return (

    <>
    
    <div className='container'>
      
        <div className='homepage'>
            <div className="homepage-container">
             
                <Hero></Hero>
                <Intro></Intro>
                <ProcessSection></ProcessSection>
                <CallToAction></CallToAction>
                <WhyChoose></WhyChoose>
                
            </div>
            
        </div>
        

        
    </div>
    </>

  )
}


