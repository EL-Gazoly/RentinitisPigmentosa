import React from 'react'
import { useEffect, useRef, useState } from 'react';
import Sample from '../assets/sample.png';
import { Link } from 'react-router-dom';

const SegmentationResultsCard = ({isHighContrast}) => {
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
         <div>
       <div class={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white rounded-xxl
         shadow-slate-300 shadow-2xl
        ${isCardVisible ? 'visible' : 'hidden'}
        ${isHighContrast ? 'filter invert contrast-100' : ''}
       `} ref={cardRef}>
        <div className=' w-500 h-250 flex flex-col text-center py-10 px-3 font-nunito font-extrabold '>
        <h1 className='text-3xl md:text-4xl lg:text-6xl text-primary mb-24'>Segmentation Results</h1>
        <div className='w-full flex flex-row justify-between items-center px-40 gap-x-12 mb-4  '>
            <img src={Sample} className=' w-96' alt="sample" />
            <img src={Sample} className=' w-96' alt="sample" />
        </div>
        <div className='w-full flex flex-row justify-between items-center px-72 gap-x-12 text-center font-bold font-nunito text-lg'>
            <span className=' pl-5'>Input Image</span>
            <span className=' pl-5'>Output Image</span>
        </div>
        <h1 className='text-3xl md:text-2xl lg:text-xl mt-24 font-normal text-primary underline'>Back to Home</h1>

        
        </div>
    
      </div>
    </div>

      
    </div>
  )
}

export default SegmentationResultsCard
