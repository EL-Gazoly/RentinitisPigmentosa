
import React from 'react'
import HomePagePic from '../assets/homePagePic.png'
import Header from '../components/Header'

import { Link } from 'react-router-dom'
const Landing = ({isHighContrast}) => {



  return (
    <div className='caret-transparent'>
      <div className='landing-page-container flex flex-col'>

        <Header isHighContrast={isHighContrast}
       
        />

        <div className={`landing-page-body flex flex-col   md:flex md:flex-row  
       
        `}
        >
            <div className={`landing-page-body-left order-2 flex flex-col justify-start
             items-start mt-4 md:mt-48 md:order-1 md:ml-20 xl:ml-40 md:gap-7 lg:gap-10
             ${isHighContrast ? 'filter invert contrast-100' : ''} 
             `}>

                <h1 className=' font-sans font-extrabold text-3xl text-primary 
                self-center w-3/4 text-center md:w-80 lg:w-full xl:w-11/12 md:min-h-min 
                 md:text-4xl  lg:text-5xl xl:text-7xl md:text-start md:self-start '>
                  WE TAKE CARE OF YOUR EYES</h1>
                
                <p className=' font-roboto text-lg text-secondary w-11/12 
                self-center text-center md:text-start md:text-2xl 
                md:max-w-lg md:max-h-32 md:self-start '>
                  Our goal is early detection of retinitis pigmentosa 
                  and providing you with all information related to this disease</p>
                <>
                <Link to="/signup" className=' bg-primary text-white font-roboto flex justify-center items-center
                font-bold text-lg rounded-full py-2 px-4 mt-4 w-2/4 h-16 self-center 
                 md:w-40 lg: xl:w-52 xl:h-16 md:text-xl md:self-start uppercase'>Sign up</Link>
                </>
            </div>
            <div className="landing-page-body-right order-1 mt-5 md:mt-0  md:order-2 md:flex md:justify-center md:items-center md:mb-8">
              <img className='w-full h-min md:hidden filter invert contras' src='https://tykit.rometheme.pro/eyecare/wp-content/uploads/sites/81/2022/08/close-up-of-doctor-checking-female-patient-vision-2022-05-31-02-18-46-utc.jpg'alt="pic" />
              <img src={HomePagePic} alt="home page pic" className=' hidden md:max-w-sm lg:max-w-md 
              xl:max-w-2xl 
               md:mt md:mt-36 xl:mt-16   min-h-min rounded-full lg:mr-16
                 xl:mr-48 md:block' />
            </div>
        </div>
        </div>


    </div>    
  )
}

export default Landing
