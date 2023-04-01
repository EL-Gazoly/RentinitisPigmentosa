import {React , useState, useRef, useEffect} from 'react'
import { useNavigate }   from 'react-router-dom';

import PageLogo from '../components/PageLogo'
import ForgetIcon from '../assets/ForgetIcon.svg'

const ForgotPassword = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""])
  const [isSentOTp, setIsSentOTp] = useState(false)
  const [isOTpVerified, setIsOTpVerified] = useState(false)
  const [isFiveDigit, setIsFiveDigit] = useState(false)
  const otpRef = useRef([])

    const navigate = useNavigate();

  const handleOtpChange = (e, index) => {
   

    const value = e.target.value;

    // Check if the key pressed is not a backspace
    if (e.keyCode !== 8) {
      // Check if the input value is a number
      if (!isNaN(value)) {
        // Update the OTP array
        const otpCopy = [...otp];
        otpCopy[index] = value;
        setOtp(otpCopy);

        // Move focus to the next input field
        if (index < otpRef.current.length - 1) {
          otpRef.current[index + 1].focus();
        }
      } else {
        e.preventDefault(); // Prevent non-numeric characters from being entered
      }
    } else {
      // Move focus to the previous input field
      if (index > 0) {
        otpRef.current[index - 1].focus();
      }
    }
    }


    useEffect(() => {
        const isFiveDigit = otp.every((value) => value !== "")
          if (isFiveDigit) {
            setIsFiveDigit(true)
            setIsOTpVerified(true)
            
        }
    },[otp])
  
  return (
    <div>
        <div className='grid grid-cols-1 h-screen  md:flex md:flex-row  md:gap-y-40'>
            <PageLogo className=" self-start justify-self-start"/>
            <div className='flex gap-80 '>
                <div className="right justify-self-center md:col-span-2  md:justify-self-start md:flex md:self-center   ">
                    <img src={ForgetIcon} alt="forget icon" className=' w-60  h-48 md:w-130 md:h-98' />
                </div>

                <div className="left justify-self-center md:col-span-2 md:row-span-1 md:justify-self-end md:self-center " >
                    <div className="form grid grid-cols-1 gap-y-10">
                    <h3 className={`text-2xl  font-nunito font-extrabold text-lightblack justify-self-center md:text-5xl 
                    ${isSentOTp && !isOTpVerified && "mr-36"}
                    `}> Forgot your password?</h3>
                    {!isSentOTp && !isOTpVerified && (
                    <div className=' grid grid-cols-1 justify-self-center gap-y-1'>
                            <label className=' font-roboto  text-sm text-secondary pl-4 md:text-lg'>Email Address</label>
                            <input type="email"
                            className=' w-72  h-12 p-4  rounded-xl placeholder:text-secondary bg-white justify-self-center md:w-130 md:h-16 
                            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                            ' 
                            placeholder='name@example.com'
                            />
                        
                    </div>
                    )}
                    {isSentOTp && !isOTpVerified && (
                    <div className=' grid grid-cols-1 justify-self-center gap-y-8'>
                            <label className=' font-roboto text-4xl text-secondary pl-4 md:text-lg'>OTP code sent to your Email </label>
                            <div className='grid grid-cols-6 gap-x-8 justify-self-center'>
                            {
                                otp.map((value, index) => {
                                    return(
                                        <input type="text"
                                        key={index}
                                        className={` w-24 h-28 p-10 rounded-xxl bg-white justify-self-center
                                        focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                                        flex justify-center items-center text-lg font-bold text-primary
                                        ${isFiveDigit && "blur-2" }
                                         ` } 
                                        name="otp"
                                        maxLength="1"
                                        value={value}
                                        onChange={(e) => handleOtpChange(e, index)}
                                        ref={element => otpRef.current[index] = element}    
                                        disabled={isFiveDigit}
                                        
                                       
                                        />
                                        
                                    )
                                  })
                            }
                            
                  
                        

                            </div>
                    </div>
                    )}

                    {isSentOTp && isOTpVerified && (
                    <div className=' grid grid-cols-1 justify-self-center gap-y-8'>
                            <div className='grid grid-cols-1'>
                                <label className=' font-roboto  text-sm text-secondary pl-4 md:text-lg'>New Password</label>
                                <input type="password"
                                className=' w-72  h-12 px-7  rounded-xl placeholder:text-secondary bg-white justify-self-center md:w-130 md:h-16
                                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                                '
                                placeholder='***********'
                                />
                            </div>
                            <div className='grid grid-cols-1'>
                                <label className=' font-roboto  text-sm text-secondary pl-4 md:text-lg'>Confirm Password</label>
                                <input type="password"
                                className=' w-72  h-12 px-7  rounded-xl placeholder:text-secondary bg-white justify-self-center md:w-130 md:h-16
                                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                                '
                                placeholder='***********'
                            />
                            </div>
                    </div>
                    )}


                        <div className="form-button justify-self-center">
                            <button className={` w-72 h-12 bg-primary text-white font-nunito font-bold text-xl rounded-xl just md:w-130 md:h-16 
                             ${isSentOTp && !isOTpVerified && "mr-36"}
                            `}
                            onClick={() => {
                                if(!isSentOTp && !isOTpVerified) {
                                    setIsSentOTp(true)
                                }
                                if(isSentOTp && !isOTpVerified) {
                                    setIsOTpVerified(true)
                                }
                                if(isSentOTp && isOTpVerified) {
                                   navigate('/login')
                                }
                            }}
                            >
                                {!isSentOTp && !isOTpVerified && "Send OTP"}
                                {isSentOTp && !isOTpVerified && "Verify OTP"}    
                                {isSentOTp && isOTpVerified && "Reset Password"}
                            
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ForgotPassword
