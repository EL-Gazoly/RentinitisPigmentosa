
import { ReactComponent as WebsiteLogo } from '../assets/Logo.svg'
import { ReactComponent as BurgerIcon} from '../assets/burgerIcon.svg'
import {React, useEffect, useState, useRef} from 'react'
const Landing = () => {
  const [isCardVisible, setIsCardVisible] = useState(false)
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
    
  }, [cardRef])
  return (
    <div >
      <div className='landing-page-container flex flex-col justify-between caret-transparent '>
        <div className="landing page-menu flex justify-between mt-5">
            <div className="landing-page-menu-left flex">
                    <WebsiteLogo className=" w-16 h-12" />
                    <span className=' text-primary self-center font-sans font-bold text-base '>RetinitisPigmentosa</span>
            </div>
            <div className="landing-page-menu-right flex mr-4 md:invisible" onClick={() => setIsCardVisible(!isCardVisible)}>
                <BurgerIcon className=' self-center'  /> 
            </div>
        </div>

        <div className="landing-page-body flex flex-col justify-between md:flex md:flex-row">
            <div className="landing-page-body-left order-2 flex flex-col align-middle mt-4  md:order-1">
                <h1 className=' font-sans font-extrabold text-3xl text-primary self-center w-64 text-center'>WE TAKE CARE OF YOUR EYES</h1>
                <p className=' font-roboto text-lg text-secondary w-80 self-center text-center'>Our goal is early detection of retinitis pigmentosa and providing you with all information related to this disease</p>
                <button className=' bg-primary text-white font-roboto font-bold text-lg rounded-full py-2 px-4 mt-4 w-44 h-16 self-center'>Get Started</button>

            </div>
            <div className="landing-page-body-right order-1 mt-5 md:order-2">
              <img className='w-full h-min md:invisible' src='https://tykit.rometheme.pro/eyecare/wp-content/uploads/sites/81/2022/08/close-up-of-doctor-checking-female-patient-vision-2022-05-31-02-18-46-utc.jpg'alt="pic" />
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
