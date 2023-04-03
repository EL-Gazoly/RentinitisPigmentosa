import {React , useState, useRef, useEffect} from 'react'
import { useNavigate }   from 'react-router-dom';

import PageLogo from '../components/PageLogo'
import ForgetIcon from '../assets/ForgetIcon.svg'

import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ForgotPassword = ({isHighContrast}) => {
  const [otp, setOtp] = useState(["", "", "", "", ""])
  const [isSentOTp, setIsSentOTp] = useState(false)
  const [isOTpVerified, setIsOTpVerified] = useState(false)
  const [isFiveDigit, setIsFiveDigit] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  const [emailOk, setEmailOk] = useState(false);
  const [passwordOk, setPasswordOk] = useState(true);
  const [confirmPasswordOk, setConfirmPasswordOk] = useState(true);


  const email = useRef();
  const otpRef = useRef([])
  const newPassword = useRef();
  const confirmPassword = useRef();


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
            handleVerifyOtp()
            
        }
    },[otp])
;
    const handelSendOtp =   () => {
        const user = {
            email: email.current.value
        }
       
        axios.post('http://localhost:8000/api/forget_password', user )
        .then(res => {  
            console.log(res)
            toast.success("OTP sent to your email")
            setIsSentOTp(true)
        })
        .catch(err => {
          try {
            const { detail } = JSON.parse(err.request.response);
            const errorMessages = detail.map((err) => err.msg);
            errorMessages.forEach((err) => toast.error(err));
            toast.error(errorMessages,{
              autoClose: 5000,
            });
            
          } catch (e) {
            const err = JSON.parse(err.request.response);
            toast.error(err.detail);
          }
        })
      
      
    }
    const handleVerifyOtp = () => {
      setIsFiveDigit(true)

        const validate = {
            email: userEmail,
            code: otp.join("")
        }
        console.log(validate.email)
        console.log(validate.code)
        axios.post('http://localhost:8000/api/verify_otp', validate )
        .then(res => {
            console.log(res)
            toast.success("OTP verified")
            setIsOTpVerified(true)
        })
        .catch(err => {
          setTimeout(() => {
          setIsFiveDigit(false)
          toast.error("Invalid OTP")

          }, 1800)
        })
        
    }

    const handleResetPassword = () => {
      if (newPassword.current.value === confirmPassword.current.value) {
      const reset = {
        email: userEmail,
        password: newPassword.current.value,
      }
      axios.post('http://localhost:8000/api/reset_password', reset )
      .then(res => {
          console.log(res)
          toast.success("Password reset successfully")
          setTimeout(() => {
          navigate('/login')
          }, 2000)
      })
      .catch(err => {
        try {
          const { detail } = JSON.parse(err.request.response);
          const errorMessages = detail.map((err) => err.msg);
          errorMessages.forEach((err) => toast.error(err));
          toast.error(errorMessages,{
            autoClose: 5000,
          });
          
        } catch (e) {
          const err = JSON.parse(err.request.response);
          toast.error(err.detail);
        }

      })
    }
    else {
      toast.error("Password not matched")
    }
    }

    const handelEmailChangeCheck = (e) => {
      setUserEmail(e.target.value)
      const emailValue = email.current.value;
      if (/\S+@\S+\.\S+/.test(emailValue)) {
        setEmailOk(true);
      }
      else {
        setEmailOk(false);
      }
    };
  
    const handelNewPasswordChangeCheck = () => {
      const passwordValue = newPassword.current.value;
    
      if (passwordValue.length < 8 || !/\d/.test(passwordValue) || !/[a-z]/.test(passwordValue) || !/[A-Z]/.test(passwordValue) )  {
        setPasswordOk(true);
      }
      else {
        setPasswordOk(false);
      }
    };
    const handelConfirmPasswordChangeCheck = () => {
      const passwordValue = confirmPassword.current.value;
      if (passwordValue.length < 8 || !/\d/.test(passwordValue) || !/[a-z]/.test(passwordValue) || !/[A-Z]/.test(passwordValue) || newPassword.current.value !== confirmPassword.current.value) {
        setConfirmPasswordOk(true);
      }
      else {
        setConfirmPasswordOk(false);
      }
    };
  
  
  return (
    <div>
        <div className='grid grid-cols-1 h-screen  md:flex md:flex-row  md:gap-y-40'>
            <PageLogo isHighContrast={isHighContrast} className=" self-start justify-self-start" />
            <div className='flex gap-80 '>
                <div className="right justify-self-center md:col-span-2  md:justify-self-start md:flex md:self-center   ">
                    <img src={ForgetIcon} alt="forget icon" className=' w-60  h-48 md:w-130 md:h-98' />
                </div>

                <div className={`left justify-self-center md:col-span-2 md:row-span-1 md:justify-self-end md:self-center
                  ${isHighContrast ? 'filter invert contrast-100' : ''}
                `} >
                    <div className="form grid grid-cols-1 gap-y-10">
                    <h3 className={`text-2xl  font-nunito font-extrabold text-lightblack justify-self-center md:text-5xl 
                    ${isSentOTp && !isOTpVerified && "mr-36"}
                    `}> Forgot your password?</h3>

                    {!isSentOTp && !isOTpVerified && (
                    <div className=' grid grid-cols-1 justify-self-center gap-y-1'>
                            <label className=' font-roboto  text-sm text-secondary pl-4 md:text-lg'>Email Address</label>
                            <input type="email"
                            className={` w-72  h-12 p-4  rounded-xl placeholder:text-secondary bg-white justify-self-center md:w-130 md:h-16 
                            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                            ${!emailOk ? "focus:ring-red-500" : "focus:ring-primary"}
                            ` }
                            placeholder='name@example.com'
                            ref={email}
                            onChange={(e) => handelEmailChangeCheck(e)}
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
                                className={` w-72  h-12 px-7  rounded-xl placeholder:text-secondary bg-white justify-self-center md:w-130 md:h-16
                                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                                ${passwordOk ? "focus:ring-red-500" : "focus:ring-primary"}
                                `}
                                placeholder='***********'
                                ref={newPassword}
                                onChange={handelNewPasswordChangeCheck}
                                />
                            </div>
                            <div className='grid grid-cols-1'>
                                <label className=' font-roboto  text-sm text-secondary pl-4 md:text-lg'>Confirm Password</label>
                                <input type="password"
                                className={` w-72  h-12 px-7  rounded-xl placeholder:text-secondary bg-white justify-self-center md:w-130 md:h-16
                                focus:outline-none focus:ring-2  focus:border-transparent
                                ${confirmPasswordOk ? "focus:ring-red-500" : "focus:ring-primary"}  `}
                                placeholder='***********'
                                ref={confirmPassword}
                                onChange={handelConfirmPasswordChangeCheck}
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
                                  handelSendOtp()
                                }
                                if(isSentOTp && !isOTpVerified) {
                                    handleVerifyOtp()
                                }
                                if(isSentOTp && isOTpVerified) {
                                   handleResetPassword()
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
        <ToastContainer />
    </div>
  )
}

export default ForgotPassword
