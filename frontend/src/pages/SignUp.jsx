import {Link} from 'react-router-dom'
import usePost from '../hooks/usePost'
import {React, useRef, useState, useContext, useEffect} from 'react'
import PageLogo from '../components/PageLogo'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {DoctorContext} from '../hooks/useDoctor'

import { useAuth } from '../hooks/useAuthContext'

import { motion } from 'framer-motion'

const Patient = [
  {
    id: false,
    name: 'Patient',
  },
  {
    id: true,
    name: 'Doctor',
  }
]

const SignUp = ({isHighContrast}) => {



  
  const [firstNameOk, setFirstNameOk] = useState(true);
  const [lastNameOk, setLastNameOk] = useState(true);
  const [emailOk, setEmailOk] = useState(true);
  const [passwordOk, setPasswordOk] = useState(true);
  const [activeTab, setActiveTab] = useState(Patient[0].id);

  const { isDoctor, setIsDoctor } = useContext(DoctorContext);
  
  const firstname = useRef();
  const lastname = useRef();
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const { execute, pending, data} = usePost();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      first_name: firstname.current.value,
      last_name: lastname.current.value,
      email: email.current.value,
      password: password.current.value,
      doctor:  isDoctor.toString()
    };  
    execute('signup', user);
    firstname.current.value = '';
    lastname.current.value = '';
    email.current.value = '';
    password.current.value = '';
  };
  const successMessgae = () => {
      navigate('/');
  };

  const handelFirstNameChangeCheck = () => {
    const name = firstname.current.value;
    if (name.length < 3) {
      setFirstNameOk(true);
    }
    else {
      setFirstNameOk(false);
    }
  };

  const handelLastNameChangeCheck = () => {
    const name = lastname.current.value;
    if (name.length < 3) {
      setLastNameOk(true);
    }
    else {
      setLastNameOk(false);
    }
  };

  const handelEmailChangeCheck = () => {
    const emailValue = email.current.value;
    if (!/\S+@\S+\.\S+/.test(emailValue)) {
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

  const handelSelectedTab = (id) => {
    setActiveTab(id);
    setIsDoctor(id);
  }
 

  const { user } = useAuth()

  if(user) {
    navigate('/')
  }

  useEffect(() => {
    firstname.current.value = '';
    lastname.current.value = '';
    email.current.value = '';
    password.current.value = '';
  }, [])
   
  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
     {pending && <Loading  isHighContrast={isHighContrast}/>}
     {data && successMessgae()}
    <div className={`flex flex-col md:flex-row w-full h-screen
    ${isHighContrast ? 'filter invert contrast-100' : ''}
    `}>
      
        
       
        <div className={`left w-full h-96 bg-SignUp bg-cover grid grid-cols-1 sm:h-100 md:h-full md:w-7/12  
        
        `}>
        <PageLogo className="md:ml-7" isHighContras={isHighContrast}/>
        <div className="middel caret-transparent">
            <div className={`container flex flex-col justify-center items-center self-center mb-20 gap-y-3 md:mb-48 md:gap-y-6
        
            `}>
                <h1 className=' text-2xl font-sans font-extrabold text-darkPrimary text-center sm:text-4xl w-96 md:text-5xl md:w-11/12 2xl:text-7xl lg:text-5xl lg:w-3/4 2xl:w-2/3   '>WELCOME TO OUR COMMUNITY</h1>
                <span className=' text-sm font-roboto font-semibold text-babyblack sm:text-xl md:text-2xl 2xl:text-3xl '>Let’s get started </span>
            </div>
        </div>
        
        </div>
        <div className={`right mt-8 flex-1 md:mt-36 2xl:mt-48
         
        `}>
            <div className="form grid grid-cols-1 gap-y-7 md:md:gap-6.5 xl:ml-12 2xl:ml-32 ">
                <h3 className=' self-start text-3xl font-nunito font-bold caret-transparent ml-7 md:ml-5 md:text-4xl'>Sign up.</h3>
                <div className=' flex flex-row gap-x-4 font-nunito font-medium ml-7 md:ml-5 text-2xl'>
                    {Patient.map((item) => {
                        return (
                            <button key={item.id} className={` 
                            relative rounded-full py-1 outline-sky-400 transition focus-visible:outline-2x
                             ${isDoctor === item.id ? 
                             ' text-primary transition-all duration-200' 
                             : ' text-disabled'} `} onClick={ () => handelSelectedTab(item.id)}
                             style={{
                              WebkitTapHighlightColor: "transparent",
                            }}
                             >
                               {activeTab === item.id && (
                                <motion.span 
                                layoutId='underline'
                                className='absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full'
                                transition={{type: 'spring', bounce: 0.2}}

                                />
                              )}

                                <span className=' px-1.5 '>{item.name}</span>
                            </button>
                        )
                    })}
                      
                </div>
                <div className="form-group self-center flex flex-col gap-y-4 w-11/12 ml-4  caret-primary md:gap-10 xl:w-4/5 2xl:w-3/4">
                    <motion.input   initial={{width: 0}}
                            animate={{width: '100%'}}
                            transition={{duration: 0.9  }} type="text" placeholder='firstname' className={`h-12 bg-bg border-b-2 rounded-md pl-4 pt-1 
                     border-gray-400 focus:outline-none placeholder:text-gray-400 
                      ${firstNameOk ? 'focus:border-red-500' : 'focus:border-primary'}
                     `}
                     ref={firstname}
                     onChange={handelFirstNameChangeCheck}
                     />

                    <motion.input   initial={{width: 0}}
                            animate={{width: '100%'}}
                            transition={{duration: 1.0  }} type="text" placeholder='lastname' className={`h-12 bg-bg border-b-2 rounded-md pl-4 pt-1 
                     border-gray-400 focus:outline-none placeholder:text-gray-400 focus:border-primary 
                      ${lastNameOk ? 'focus:border-red-500' : 'focus:border-primary'}
                     `}
                        ref={lastname}
                        onChange={handelLastNameChangeCheck}
                     />

                    <motion.input   initial={{width: 0}}
                            animate={{width: '100%'}}
                            transition={{duration: 1.1  }} type="email" placeholder='email' className={`h-12 bg-bg border-b-2 rounded-md pl-4 pt-1
                      border-gray-400 focus:outline-none placeholder:text-gray-400 focus:border-primary
                      ${emailOk ? 'focus:border-red-500' : 'focus:border-primary'}
                      `}
                        onChange={handelEmailChangeCheck}
                        ref={email}
                      />
                      
                    <motion.input   initial={{width: 0}}
                            animate={{width: '100%'}}
                            transition={{duration: 1.2 }} type="password" placeholder='password' className={`  h-12 bg-bg border-b-2 rounded-md pl-4 pt-1
                      border-gray-400 focus:outline-none placeholder:text-gray-400 focus:border-primary 
                      ${passwordOk ? 'focus:border-red-500' : 'focus:border-primary'}
                      ` }
                        onChange={handelPasswordChangeCheck}
                        ref={password}
                      />
            </div>
                <div className=" caret-transparent form-button self-end flex flex-col gap-y-5 text-center w-11/12  ml-4 xl:ml-0 xl:w-4/5 ">
                    <button  onClick={handleSubmit} className='  h-11 bg-primary flex justify-center items-center text-white font-nunito text-xl  rounded-thiry xl:ml-16 2xl:ml-6'
                    >Sign up</button>
                    <span className=' text-primary text-sm  font-roboto font-medium' >Already have an account? <Link to="/login" className=' text-primary text-base font-roboto font-medium underline'>Login</Link></span>
                </div>
            </div>
        </div>

    </div>
    <ToastContainer />
    </motion.div>
  )
}

export default SignUp
