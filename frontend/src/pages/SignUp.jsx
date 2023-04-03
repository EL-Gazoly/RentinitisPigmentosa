import {Link} from 'react-router-dom'
import usePost from '../hooks/usePost'
import {React, useRef, useState} from 'react'
import PageLogo from '../components/PageLogo'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SignUp = ({isHighContrast}) => {

  const [firstNameOk, setFirstNameOk] = useState(true);
  const [lastNameOk, setLastNameOk] = useState(true);
  const [emailOk, setEmailOk] = useState(true);
  const [passwordOk, setPasswordOk] = useState(true);
  

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
      password: password.current.value  
    };  
    execute('signup', user);
    firstname.current.value = '';
    lastname.current.value = '';
    email.current.value = '';
    password.current.value = '';
  };
  const successMessgae = () => {
      navigate('/upload');
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

   
  return (
    <div>
     {pending && <Loading />}
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
            <div className="form grid grid-cols-1 gap-y-8 md:md:gap-11 xl:ml-12 2xl:ml-32 ">
                <h3 className=' self-start text-3xl font-nunito font-bold caret-transparent ml-7 md:ml-5 md:text-4xl'>Sign up.</h3>
                <div className="form-group self-center flex flex-col gap-y-4 w-11/12 ml-4  caret-primary md:gap-10 xl:w-4/5 2xl:w-3/4">
                    <input type="text" placeholder='firstname' className={`h-12 bg-bg border-b-2 rounded-md pl-4 pt-1 
                     border-gray-400 focus:outline-none placeholder:text-gray-400 
                      ${firstNameOk ? 'focus:border-red-500' : 'focus:border-primary'}
                     `}
                     ref={firstname}
                     onChange={handelFirstNameChangeCheck}
                     />

                    <input type="text" placeholder='lastname' className={`h-12 bg-bg border-b-2 rounded-md pl-4 pt-1 
                     border-gray-400 focus:outline-none placeholder:text-gray-400 focus:border-primary 
                      ${lastNameOk ? 'focus:border-red-500' : 'focus:border-primary'}
                     `}
                        ref={lastname}
                        onChange={handelLastNameChangeCheck}
                     />

                    <input type="email" placeholder='email' className={`h-12 bg-bg border-b-2 rounded-md pl-4 pt-1
                      border-gray-400 focus:outline-none placeholder:text-gray-400 focus:border-primary
                      ${emailOk ? 'focus:border-red-500' : 'focus:border-primary'}
                      `}
                        onChange={handelEmailChangeCheck}
                        ref={email}
                      />
                      
                    <input type="password" placeholder='password' className={`  h-12 bg-bg border-b-2 rounded-md pl-4 pt-1
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
    </div>
  )
}

export default SignUp
