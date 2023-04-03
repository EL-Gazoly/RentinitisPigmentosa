import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
const ResultCard = () => {
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
    <div>
       <div class={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xxl
        ${isCardVisible ? 'visible' : 'hidden'}
       `} ref={cardRef}>
        <div className=' w-160 h-96 grid grid-cols-1 text-center py-10 px-3 font-nunito font-extrabold '>
          <h2 className=' text-2xl self-start '>Your Clustering result is </h2>
          <h1 className=' text-5xl text-red-500  self-center'>Postive</h1>
          <h3 className=' font-normal text-xl text-lightblack  self-end mb-9 '>Check our <Link to="/resources" className=' text-primary'>resources page</Link> to learn more about the disease.</h3>
        </div>
    
      </div>
    </div>
  )
}

export default ResultCard
