import React from 'react'
import Header from '../components/Header'
import {Link} from 'react-router-dom'
const About = () => {
  return (
    <div>
        <div className='flex flex-col w-full h-screen bg-lightblue'>
            <div className=' grid grid-cols-1 h-full gap-y-9 mb-10 '>
                <Header LoginOrLogout="Login" />
                <div className="middel text-center  grid gap-y-3 mb-16">
                    <h1 className=' text-9xl text-primary font-sans font-extrabold uppercase' >About us</h1>
                    <p className=' text-3xl text-babyblack font-nunito w-3/4 ml-48 leading-66 '>We are students from the Faculty of Computers and Information, Ain Shams University, <br/>
                        majoring in Bio-informatics Technology. We have created this website to<br/>
                        help patients and doctors confirm the presence of Retinitis Pigmentosa disease and provide<br/>
                        patients with all the information they may need about this disease.</p>
                </div>

                <div className="bottom self-end justify-self-end flex flex-row items-center gap-x-4 mr-24   ">
                    <span>Need more information?</span>
                    <Link to='/contact' className='w-36 h-11 flex justify-center items-center text-primary font-roboto
                     font-semibold text-sm bg-white border-2 border-primary rounded-full p-6 self-center'>Contact us</Link>
                </div>

            </div>
        </div>
      
    </div>
  )
}

export default About
