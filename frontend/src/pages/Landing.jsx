
import { ReactComponent as WebsiteLogo } from '../assets/Logo.svg'
import { ReactComponent as BurgerIcon} from '../assets/burgerIcon.svg'
import HomePagePic from '../assets/homePagePic.png'
import {React, useEffect, useState, useRef} from 'react'
const Landing = () => {
  const [isCardVisible, setIsCardVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const cardRef = useRef(null)

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
      
  }, [cardRef, isMobile])

  function handleResize() {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }
  return (
    <div className='caret-transparent'>
      <div className='landing-page-container flex flex-col'>
        <div className="landing page-menu flex justify-between mt-5">
            <div className="landing-page-menu-left flex">
                    <WebsiteLogo className=" w-16 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 md:ml-7 " />
                    <span className=' text-primary self-center font-sans font-bold text-base lg:text-xl '>RetinitisPigmentosa</span>
            </div>
            <div className="landing-page-menu-right flex items-center mr-4 md:hidden" onClick={() => setIsCardVisible(!isCardVisible)}>
                <BurgerIcon/> 
            </div>
            <div className="landing-page-menu-right hidden mr-10 md:flex md:gap-3 lg:gap-10 self-center  items-center text-primary  font-roboto font-bold text-base lg:text-xl">
                <span >Home</span>
                <span >Services</span>
                <span >About US</span>
                <span>Contact</span>

                <button className=' w-20 h-12 lg:w-28 lg:h-14 rounded-2xl  bg-primary text-white font-roboto font-bold text-xl flex justify-center items-center '>Login</button>
            </div>

          
          
        </div>

        <div className="landing-page-body flex flex-col   md:flex md:flex-row  "
        >
            <div className="landing-page-body-left order-2 flex flex-col justify-start
             items-start mt-4 md:mt-48 md:order-1 md:ml-20 xl:ml-40 md:gap-7 lg:gap-10">

                <h1 className=' font-sans font-extrabold text-3xl text-primary 
                self-center w-3/4 text-center md:w-80 lg:w-full xl:w-11/12 md:min-h-min 
                 md:text-4xl  lg:text-5xl xl:text-7xl md:text-start md:self-start '>
                  WE TAKE CARE OF YOUR EYES</h1>
                
                <p className=' font-roboto text-lg text-secondary w-11/12 
                self-center text-center md:text-start md:text-2xl 
                md:max-w-lg md:max-h-32 md:self-start '>
                  Our goal is early detection of retinitis pigmentosa 
                  and providing you with all information related to this disease</p>
                
                <button className=' bg-primary text-white font-roboto 
                font-bold text-lg rounded-full py-2 px-4 mt-4 w-2/4 h-16 self-center 
                 md:w-40 lg: xl:w-52 xl:h-16 md:text-xl md:self-start uppercase'>Sign up</button>

            </div>
            <div className="landing-page-body-right order-1 mt-5 md:mt-0  md:order-2 md:flex md:justify-center md:items-center md:mb-8">
              <img className='w-full h-min md:hidden' src='https://tykit.rometheme.pro/eyecare/wp-content/uploads/sites/81/2022/08/close-up-of-doctor-checking-female-patient-vision-2022-05-31-02-18-46-utc.jpg'alt="pic" />
              <img src={HomePagePic} alt="home page pic" className=' hidden md:max-w-sm lg:max-w-md 
              xl:max-w-2xl 
               md:mt md:mt-36 xl:mt-16   min-h-min rounded-full lg:mr-16
                 xl:mr-48 md:block' />
            </div>
        </div>
        </div>


        {isCardVisible &&
        (
      <div ref={cardRef}  className='card-container w-20 h-20 border-2 border-border rounded bg-bg flex flex-col text-start justify-between align-middle absolute right-5 top-14 '>
        <span className=' text-primary font-roboto font-bold text-xs border-b border-line'>Home</span>
        <span className=' text-primary font-roboto font-bold text-xs border-b border-line'>Services</span>
        <span className=' text-primary font-roboto font-bold text-xs border-b border-line'>About US</span>
        <span className=' text-primary font-roboto font-bold text-xs border-b border-line'>Contact</span> 
      </div>
      )}
    </div>    
  )
}

export default Landing
