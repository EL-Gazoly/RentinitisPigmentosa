import {React, useState, useRef} from 'react'
import PageLogo from '../components/PageLogo'
import ContactICon from '../assets/contactIcon.png'
import usePost from '../hooks/usePost'
import Loading from '../components/Loading'



const Contact = ({isHighContrast }) => {

const nameRef = useRef();
const emailRef = useRef();
const messageRef = useRef();

const [nameOk, setNameOk] = useState(false);
const [emailOk, setEmailOk] = useState(false);
const [messageOk, setMessageOk] = useState(false);


const { execute, pending} = usePost(); 
const handleSentMessage = () => {
    const message = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        message: messageRef.current.value
    }
    execute('contact_us', message);
    nameRef.current.value = '';
    emailRef.current.value = '';
    messageRef.current.value = '';
}

const handelNameChangeCheck = () => {
  const name = nameRef.current.value;
  if (name.length >= 3) {
    setNameOk(true);
  }
  else {
    setNameOk(false);
  }
};
const handelEmailChangeCheck = () => {
  const emailValue = emailRef.current.value;
  if (/\S+@\S+\.\S+/.test(emailValue)) {
    setEmailOk(true);
  }
  else {
    setEmailOk(false);
  }
};
const handelMessageChangeCheck = () => {
  const messageValue = messageRef.current.value;
  if (messageValue.length >= 10) {
    setMessageOk(true);
  }
  else {
    setMessageOk(false);
  }
};


  return (
    <div className={`
    ${isHighContrast ? ' bg-black' : 'bg-white'}
    w-full h-full
    `}>
      {pending && <Loading />}


    
    <div className='flex flex-row w-full h-full '>
         <div className={`left w-1/2  grid
          
         `}>
            <PageLogo className="md:ml-7" isHighContrast={isHighContrast} />
            <div className="middel caret-transparent justify-self-center grid gap-y-1 mb-10 ">
                <h1 className={`text-8xl font-sans text-primary font-extrabold uppercase ml-10
                ${isHighContrast ? 'filter invert contrast-100' : ''}
                `}>contact us</h1>
                <img src={ContactICon} alt="contact icon"  className=' max-w-2xl min-h-min ml-20'/>

            </div>
         </div>
         <div className={`right w-1/2 grid
          ${isHighContrast ? ' bg-invertedlightblue' : 'bg-lightblue'}
         `}>
            <div className={` justify-self-center w-full ml-64 self-center grid grid-cols-1  gap-y-6
            ${isHighContrast ? 'filter invert contrast-100' : ''}
            `}>
            <div className='flex flex-col gap-y-1 '>
                    <label htmlFor="name" className=' text-secondary'>Name</label>
                    <input type="text" 
                    placeholder='Please enter your name' 
                    className={` w-3/4 h-12 rounded-lg p-5 placeholder:text-secondary focus:outline-none focus:border
                    ${!nameOk ? 'focus:border-red-500' : 'focus:border-primary'}
                    `}
                    ref={nameRef}
                    onChange={handelNameChangeCheck}
                    />
                </div>
                <div className='flex flex-col gap-y-1 '>
                    <label htmlFor="email" className=' text-secondary'>Email Address</label>
                    <input type="email" 
                    placeholder='name@example.com' 
                    className={` w-3/4 h-12 rounded-lg p-5 placeholder:text-secondary focus:outline-none focus:border
                    ${!emailOk ? 'focus:border-red-500' : 'focus:border-primary'}
                    `}
                    ref={emailRef}
                    onChange={handelEmailChangeCheck}
                    />
                </div>
                <div className='flex flex-col gap-y-1 '>
                    <label className=' text-secondary' >Enter Your question</label>
                    <textarea className={` w-3/4 focus:outline-none rounded-lg p-5 focus:border focus:border-primary
                    placeholder:text-secondary
                    ${!messageOk ? 'focus:border-red-500' : 'focus:border-primary'}
                    `} name="" id="" cols="30" rows="10" placeholder='We are really interested to hear what you have to say..'
                    ref={messageRef}
                    onChange={handelMessageChangeCheck}
                    ></textarea>
                </div>
                <button className=' w-48 h-16 mr-48 justify-self-center bg-white border-2 border-primary text-primary text-xl p-1 rounded-full'
                onClick={handleSentMessage}
                >send</button>

            </div>
         </div>
        
    </div>
    </div>
  )
}

export default Contact
