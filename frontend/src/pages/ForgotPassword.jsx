import React from 'react'
import PageLogo from '../components/PageLogo'
import ForgetIcon from '../assets/ForgetIcon.svg'

const ForgotPassword = () => {
  return (
    <div>
        <div className='grid grid-cols-1 h-screen  md:flex md:flex-row  md:gap-y-40'>
            <PageLogo className=" self-start justify-self-start"/>
            <div className='flex gap-80 '>
                <div className="right justify-self-center md:col-span-2  md:justify-self-start md:flex md:self-center   ">
                    <img src={ForgetIcon} alt="forget icon" className=' w-60  h-48 md:w-130 md:h-98' />
                </div>

                <div className="left justify-self-center md:col-span-2 md:row-span-1 md:justify-self-end md:self-center " >
                    <div className="form grid grid-cols-1 gap-y-8">
                    <h3 className=' text-2xl  font-nunito font-extrabold text-lightblack justify-self-center md:text-5xl'> Forgot your password?</h3>

                    <div className=' grid grid-cols-1 justify-self-center gap-y-1'>
                            <label className=' font-roboto  text-sm text-secondary pl-4 md:text-lg'>Email Address</label>
                            <input type="email"
                            className=' w-72  h-12 p-4  rounded-xl placeholder:text-secondary bg-white justify-self-center md:w-130 md:h-16 
                            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                            ' 
                            placeholder='name@example.com'
                            />
                        
                    </div>

                        <div className="form-button justify-self-center">
                            <button className=' w-72 h-12 bg-primary text-white font-nunito font-bold text-xl rounded-xl just md:w-130 md:h-16'>Send OTP</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ForgotPassword
