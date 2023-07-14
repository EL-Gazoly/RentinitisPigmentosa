import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CardLayout from './CardLayout';
import { motion } from 'framer-motion';
const ResultCard = ({isHighContrast, result}) => {
    const cardRef = useRef(null)
    const [isCardVisible, setIsCardVisible] = useState(true)
   
        useEffect(() => {
            const handelClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) // if the click is outside the card cardRef.current.contains(event.target) means if the click is inside the card and also if the card is visible
               {
                setIsCardVisible(false)
              }
            }
            document.addEventListener('mousedown', handelClickOutside)
            return () => {
              document.removeEventListener('mousedown', handelClickOutside)
            }
              
          }, [cardRef])


  return (
    <motion.div className='flex flex-col justify-between items-center'>
          <CardLayout Text="Classfication">
            <div className=' text-center h-[385px] flex flex-col justify-between'>
            {result === 'RP' ? <h1 className=' text-6xl text-red-500 self-center mt-24 '>Postive</h1> : <h1 className=' text-6xl text-green-500 self-center mt-24 '>Negative</h1>}
            <h3 className=' font-normal text-xl text-lightblack  self-end mb-9 mt-64 '>Check our <Link to="/resources" className=' text-primary'>resources page</Link> to learn more about the disease.</h3>
            </div>
          </CardLayout> 
    
      
    </motion.div>
  )
}

export default ResultCard
