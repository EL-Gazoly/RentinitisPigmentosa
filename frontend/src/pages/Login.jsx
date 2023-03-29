import React from 'react'
import {Link} from 'react-router-dom'
import PageLogo from '../components/PageLogo'

import {ReactComponent as LoginIcon} from '../assets/loginIcon.svg'
const Login = () => {
  return (
    <div className=' bg-bg'>
        <div className=' flex flex-col md:flex-row w-full h-screen'>
            <div className="left order-2 mt-8 flex-1 md:mt-36 2xl:mt-72 ">
            <div className="form grid grid-cols-1 gap-y-8 md:md:gap-11 xl:ml-12 2xl:ml-32 ">
                <h3 className=' self-start text-3xl font-nunito font-bold caret-transparent ml-7 md:ml-5 md:text-4xl'>Log in.</h3>
                <div className="form-group self-center flex flex-col gap-y-4 w-11/12 ml-4  caret-primary md:gap-10 xl:w-4/5 2xl:w-3/4">
                    <div className=' flex flex-col '>
                        <label className=' font-roboto  text-sm text-secondary pl-3'>Email Address</label>   
                        <input type="email" placeholder='name@example.com' className='h-12 bg-white border rounded-full px-6 border-gray-400 focus:outline-none placeholder:text-secondary focus:border-primary '  />
                    </div>
                    <div className=' flex flex-col'>
                        <label className=' font-roboto  text-sm text-secondary pl-3'>Password</label>
                        <input type="password" placeholder='at least 8 characters' className='  h-12 bg-white border rounded-full px-6   border-gray-400 focus:outline-none placeholder:text-secondary focus:border-primary '       />
                    </div>
            </div>
                <div className=" caret-transparent form-button self-end flex flex-col gap-y-5 text-center w-11/12  ml-4 xl:ml-0 xl:w-4/5 ">
                    <Link to="/upload" className='  h-11 bg-primary flex justify-center items-center text-white font-nunito text-xl  rounded-thiry xl:ml-16 2xl:ml-6' >Log in</Link>
                    <Link to='/signup' className=' w-36 h-11 flex justify-center items-center text-primary font-roboto font-semibold text-sm bg-white border-4 border-primary rounded-full p-6 self-center xl:ml-12 2xl:ml-10'> Sign up now </Link>
                </div>
            </div>

                
            </div>
            <div className="right order-1 md:order-2 grid  bg-border w-full h-96 grid-cols-1 sm:h-100 md:h-full md:w-7/12">
                <div className="right-top self-end text-center mt-20 md:mt-28 gap-y-5">
                    <span className=' font-nunito text-base font-bold text-babyblack sm:text-lg 2xl:text-3xl'>Nice to see you again</span>
                    <h1 className=' font-sans text-3xl text-primary font-extrabold uppercase sm:text-5xl lg:text-6xl md:w-full 2xl:text-6xl '>welcom back</h1>
                </div>
                <div className="right-bottom self-end justify-self-center">
                    <LoginIcon className=' w-64 min-h-min sm:w-80 md:w-120 md:mb-40 2xl:w-150  2xl:mb-16' />
                </div>
                
            </div>


        </div>


        <div className=' fixed top-3 left-3 md:left-0'>
            <div className=' relative'>
                <PageLogo />
            </div>
        </div>
    </div>
  ) 
}

export default Login
