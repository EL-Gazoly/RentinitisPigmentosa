
import { Link } from 'react-router-dom'
import PageLogo from '../components/PageLogo'
import { ReactComponent as BurgerIcon} from '../assets/burgerIcon.svg'
import {React, useEffect, useState, useRef} from 'react'

const Header = ({LoginOrLogout}) => {
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
    <div>
           <div className="landing page-menu flex justify-between mt-5">
            <PageLogo className="md:ml-7" />
            <div className="landing-page-menu-right flex items-center mr-4 md:hidden" onClick={() => setIsCardVisible(!isCardVisible)}>
                <BurgerIcon onClick={()=> setIsCardVisible(!isCardVisible)}/> 
            </div>
            <div className="landing-page-menu-right hidden mr-10 md:flex md:gap-3 lg:gap-10 self-center  items-center text-primary  font-roboto font-bold text-base lg:text-xl">
                <Link to="/" >Home</Link>
                <Link to="/about" >About US</Link>
                <Link to="/contact">Contact</Link>

                <Link to="/login" className=' w-20 h-12  lg:w-28 lg:h-14 rounded-xxl  bg-primary text-white font-roboto font-bold text-xl flex justify-center items-center '>{LoginOrLogout}</Link>
            </div>

          
          
        </div>
        {isCardVisible &&
        (
      <div ref={cardRef}  className='card-container w-20 h-20 border-2 border-border rounded bg-bg flex flex-col text-start gap-y-3 align-middle fixed right-5 top-16 '>
        <Link to="/" className=' text-primary font-roboto font-bold text-xs border-b border-line pb-1'>Home</Link>
        <Link to="/about" className=' text-primary font-roboto font-bold text-xs border-b border-line'>About US</Link>
        <Link to="/contact" className=' text-primary font-roboto font-bold text-xs border-b border-line mb-1'>Contact</Link> 
      </div>
      )}
    </div>
  )
}

export default Header