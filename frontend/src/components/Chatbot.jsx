import {React, useState} from 'react'
import {ReactComponent as ChatLogo} from '../assets/chatLogo.svg'
import { Transition } from "@headlessui/react";

const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [message, setMessage] = useState("")
  return (
    <div>
        <div className={isChatOpen ? ' fixed bottom-6 right-6 ease-in duration-500' : 'fixed bottom-16 right-6 ease-out duration-500'} >
      
          <div className=' relative'>
            <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className=' absolute -top-2 -right-2 w-16 h-14 flex justify-center bg-black items-center
             rounded-circle shadow-lg shadow-gray-600'>
                
                <ChatLogo className='w-14 h-12' />
            </button>
           

            {isChatOpen && (
                <div>

       
                <div className=' flex flex-col bg-white w-72 h-96 rounded-2xl shadow-lg rounded-xl shadow-gray-600 overflow-auto'>
                    <div className='flex justify-between items-center bg-white  w-full py-4 pl-4 h-4 border-gray-300  border-b '>
                    <h1 className='text-base font-bold text-primary  '> RP Chatbot</h1>
                    </div>
                    <div className="chat-body flex flex-col ">
                        <div className=" self-start overflow-auto max-w-xxs max-h-72">
                            <div className=' bg-gray-300 p-2 rounded-xl my-2 ml-3 relative'>
                                <p className='text-sm text-gray-800'>
                                    {message ? message : "Hello, how can I help you?"}
                                </p>
                                <div className="absolute w-0 h-0 border-l-8 border-t-8 border-r-8 border-b-0 border-gray-300 bottom-0 left-0"></div>

                            </div>
                                                    
                        </div>
                        <div className=" self-start overflow-auto max-w-xxs max-h-72">
                            <div className=' bg-gray-300 p-2 rounded-xl my-2 ml-3 relative'>
                                <p className='text-sm text-gray-800'>
                                    {message ? message : "Hello, how can I help you?"}
                                </p>
                                <div className="absolute w-0 h-0 border-l-8 border-t-8 border-r-8 border-b-0 border-gray-300 bottom-0 left-0"></div>

                            </div>
                                                    
                        </div>
                        <div className=" self-start overflow-auto max-w-xxs max-h-72"> 
                            <div className=' bg-gray-300 p-2 rounded-xl my-2 ml-3 relative'>
                                <p className='text-sm text-gray-800'>
                                    {message ? message : "Hello, how can I help you?"}
                                </p>
                                <div className="absolute w-0 h-0 border-l-8 border-t-8 border-r-8 border-b-0 border-gray-300 bottom-0 left-0"></div>

                            </div>
                                                    
                        </div>
                        <div className=" self-start overflow-auto max-w-xxs max-h-72">
                            <div className=' bg-gray-300 p-2 rounded-xl my-2 ml-3 relative'>
                                <p className='text-sm text-gray-800'>
                                    {message ? message : "Hello, how can I help you?"}
                                </p>
                                <div className="absolute w-0 h-0 border-l-8 border-t-8 border-r-8 border-b-0 border-gray-300 bottom-0 left-0"></div>

                            </div>
                                                    
                        </div>
                        <div className=" self-start overflow-auto max-w-xxs max-h-72">
                            <div className=' bg-gray-300 p-2 rounded-xl my-2 ml-3 relative'>
                                <p className='text-sm text-gray-800'>
                                    {message ? message : "Hello, how can I help you?"}
                                </p>
                                <div className="absolute w-0 h-0 border-l-8 border-t-8 border-r-8 border-b-0 border-gray-300 bottom-0 left-0"></div>

                            </div>
                                                    
                        </div>
                        <div className=" self-start overflow-auto max-w-xxs max-h-72">
                            <div className=' bg-gray-300 p-2 rounded-xl my-2 ml-3 relative'>
                                <p className='text-sm text-gray-800'>
                                    {message ? message : "Hello, how can I help you?"}
                                </p>
                                <div className="absolute w-0 h-0 border-l-8 border-t-8 border-r-8 border-b-0 border-gray-300 bottom-0 left-0"></div>

                            </div>
                                                    
                        </div>

                        <div className=" self-end overflow-auto max-w-xxs max-h-72 ">
                            <div className=' bg-primary p-2 rounded-xl my-2 mr-3 relative'>
                                <p className='text-sm text-white'>
                                    What is retinitis pigmentosa?
                                </p>
                                <div className="absolute w-0 h-0 border-l-8 border-t-8 border-r-8 border-b-0 border-primary bottom-0 right-0"></div>
                            </div>
                            
                        </div>
                        

                    </div>

                </div>
                </div>
                
                )}
          </div>
        </div>
    </div>
  )
}

export default Chatbot
