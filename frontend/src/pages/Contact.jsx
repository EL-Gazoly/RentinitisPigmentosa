import React from 'react'
import Chatbot from '../components/Chatbot'
import PageLogo from '../components/PageLogo'
import ContactICon from '../assets/contactIcon.png'


const Contact = () => {
  return (
    <div className=' w-full h-full flex flex-row '>
         <div className="left w-1/2 bg-white grid">
            <PageLogo className="md:ml-7" />
            <div className="middel caret-transparent justify-self-center grid gap-y-1 mb-10 ">
                <h1 className=' text-8xl font-sans text-primary font-extrabold uppercase ml-10'>contact us</h1>
                <img src={ContactICon} alt="contact icon"  className=' max-w-2xl min-h-min'/>

            </div>
         </div>
         <div className="right w-1/2 bg-lightblue grid">
            <div className=' justify-self-center w-full ml-64 self-center grid grid-cols-1  gap-y-6'>
                <div className='flex flex-col gap-y-1 '>
                    <label htmlFor="email" className=' text-secondary'>Email Address</label>
                    <input type="email" 
                    placeholder='name@example.com' 
                    className=' w-3/4 h-12 rounded-lg p-3 placeholder:text-secondary focus:outline-none focus:border focus:border-primary' />
                </div>
                <div className='flex flex-col gap-y-1 '>
                    <label className=' text-secondary' >Enter Your question</label>
                    <textarea className=' w-3/4 focus:outline-none rounded-lg p-4 focus:border focus:border-primary
                    placeholder:text-secondary
                    ' name="" id="" cols="30" rows="10" placeholder='We are really interested to hear what you have to say..'></textarea>
                </div>
                <button className=' w-48 h-16 mr-48 justify-self-center bg-white border-2 border-primary text-primary text-xl p-1 rounded-full'>send</button>

            </div>
         </div>
         <Chatbot/>
    </div>
  )
}

export default Contact
