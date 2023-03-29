import React from 'react'
import { ReactComponent as WebsiteLogo } from '../assets/Logo.svg'
import {Link} from 'react-router-dom'
const PageLogo = () => {
  return (
    <div>
      <Link to="/" className='container caret-transparent self-start flex justify-start items-center mt-3 '>
                    <WebsiteLogo className=' w-14 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 ' />
                    <span className=' text-primary self-center font-sans font-bold text-sm lg:text-xl'>RetinitisPigmentosa</span>
    </Link>
    </div>
  )
}

export default PageLogo
