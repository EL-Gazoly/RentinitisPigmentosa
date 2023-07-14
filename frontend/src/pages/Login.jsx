import {Link} from 'react-router-dom'
import PageLogo from '../components/PageLogo'
import {React, useEffect, useRef, useState} from 'react'
import usePost from '../hooks/usePost'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import {motion } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../hooks/useAuthContext'

import {ReactComponent as LoginIcon} from '../assets/loginIcon.svg'
const Login = ({isHighContrast }) => {
    const [emailOk, setEmailOk] = useState(false);
    const [passwordOk, setPasswordOk] = useState(true);

    const email = useRef();
    const password = useRef();

    const navigate = useNavigate();

    const { execute, pending, data} = usePost();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: email.current.value,
            password: password.current.value
        };
        execute('login', user);
        email.current.value = '';
        password.current.value = '';    
    };

    const successMessgae = () => {
            navigate('/');
        
    };

    const handelEmailChangeCheck = () => {
        const emailValue = email.current.value;
        if (/\S+@\S+\.\S+/.test(emailValue)) {
          setEmailOk(true);
        }
        else {
          setEmailOk(false);
        }
      };
    
      const handelPasswordChangeCheck = () => {
        const passwordValue = password.current.value;
        if (passwordValue.length < 8 || !/\d/.test(passwordValue) || !/[a-z]/.test(passwordValue) || !/[A-Z]/.test(passwordValue)) {
          setPasswordOk(true);
        }
        else {
          setPasswordOk(false);
        }
      };

      const { user } = useAuth()

    

     
    
  return (
    <motion.div className={` 
    {isHighContrast ? ' bg-invertedbg' : 'bg-bg'}
    `}
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
        {pending && <Loading isHighContrast={isHighContrast}/>}
        {data && successMessgae()}

        <div className=' flex flex-col md:flex-row w-full h-screen'>
            <div className={`left order-2 mt-8 flex-1 md:mt-36 2xl:mt-72
            ${isHighContrast ? 'filter invert contrast-100' : ''}
            `}>
            <div className="form grid grid-cols-1 gap-y-8 xl:ml-12 2xl:ml-32 ">
                <h3 className=' self-start text-3xl font-nunito font-bold caret-transparent ml-7 md:ml-5 md:text-4xl'>Log in.</h3>
                <div className="form-group self-center flex flex-col gap-y-4 w-11/12 ml-4  caret-primary md:gap-10 xl:w-4/5 2xl:w-3/4">
                    <div className=' flex flex-col '>
                        <label className=' font-roboto  text-sm text-secondary pl-3'>Email Address</label>   
                        <motion.input type="email" placeholder='name@example.com' className={`h-12 bg-white border rounded-full px-6
                         border-gray-400 focus:outline-none placeholder:text-secondary focus:border-primary 
                            ${emailOk ? 'focus:border-primary' : 'focus:border-red-500'}
                         `}
                            initial={{width: 0}}
                            animate={{width: '100%'}}
                            transition={{duration: 1.3  }}
                            ref={email} 
                            onChange={handelEmailChangeCheck}
                          />
                    </div>
                    <div className=' flex flex-col'>
                        <label className=' font-roboto  text-sm text-secondary pl-3'>Password</label>
                        <motion.input type="password" placeholder='at least 8 characters' className={` 
                         h-12 bg-white border rounded-full px-6   border-gray-400 focus:outline-none
                          placeholder:text-secondary 
                            ${!passwordOk ? 'focus:border-primary' : 'focus:border-red-500'}
                          ` } 
                          ref={password} 
                          initial={{width: 0}}
                            animate={{width: '100%'}}
                            transition={{duration: 1.45  }}
                          onChange={handelPasswordChangeCheck}
                          />
                    </div>
            </div>
                <div className=" caret-transparent form-button self-end flex flex-col gap-y-5 text-center w-11/12  ml-4 xl:ml-0 xl:w-4/5 ">
                    <div className=' grid grid-cols-1 gap-y-1'>
                      <motion.button className='justify-self-end' whileTap={{scale: 0.95}} whileHover={{scale: 1.06}} > 
                        <Link to="/forgot-password" className=' font-roboto text-sm text-forget  font-medium'>Forgot password?</Link>
                        </motion.button>
                    <motion.button onClick={handleSubmit} whileHover={{scale: 1.02}} whileTap={{scale: 0.95 }} className='  h-11 bg-primary flex justify-center items-center text-white font-nunito text-xl  rounded-thiry xl:ml-16 2xl:ml-6' >Log in</motion.button>
                    </div>
                      <motion.button className='flex justify-center items-center' whileHover={{scale: 1.1}} whileTap={{scale: 0.95}}>
                        <Link to='/signup' className=' w-36 h-11 flex justify-center items-center text-primary font-roboto font-semibold text-sm bg-white border-4 border-primary rounded-full p-6 self-center xl:ml-12 2xl:ml-10'> Sign up now </Link>
                      </motion.button>
                </div>
            </div>

                
            </div>
            <div className={`right order-1 md:order-2 grid w-full h-96 grid-cols-1 sm:h-100 md:h-full md:w-7/12
            ${isHighContrast ? ' bg-invertedborder' : 'bg-border'}
            `}>
                <div className={`right-top self-end text-center mt-20 md:mt-28 gap-y-5
                   ${isHighContrast ? 'filter invert contrast-100' : ''}
                `}>
                    <span className=' font-nunito text-base font-bold text-babyblack sm:text-lg 2xl:text-3xl'>Nice to see you again</span>
                    <h1 className=' font-sans text-3xl text-primary font-extrabold uppercase sm:text-5xl lg:text-6xl md:w-full 2xl:text-6xl '>welcome back</h1>
                </div>
                <div className="right-bottom self-end justify-self-center">
                    <LoginIcon className=' w-64 min-h-min sm:w-80 md:w-120 md:mb-40 2xl:w-150  2xl:mb-16' />
                </div>
                
            </div>


        </div>


        <div className=' fixed top-3 left-3 md:left-0'>
            <div className=' relative'>
               { !pending && <PageLogo isHighContrast={isHighContrast} />}
            </div>
        </div>
        <ToastContainer />
    </motion.div>
  ) 
}

export default Login
