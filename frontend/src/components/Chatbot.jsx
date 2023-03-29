import {React, useState, useEffect, useRef} from 'react'
import {ReactComponent as ChatLogo} from '../assets/chatLogo.svg'
import {ReactComponent as SendIcon} from '../assets/sendIcon.svg'

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  const handleQuestionClick = (question) => {
    switch (question) {
      case 1:
        addMessage("What is retinitis pigmentosa?");
        addBotMessage(
          "Retinitis pigmentosa (RP) is a genetic eye disorder that affects the retina, causing degeneration of photoreceptor cells and resulting in vision loss."
        );
        
        break;
      case 2:
        addMessage("What are the symptoms of retinitis pigmentosa?");
        addBotMessage(
          "The symptoms of RP include night blindness, decreased peripheral vision, loss of central vision, and decreased color vision."
        );
        
        break;
      case 3:
        addMessage("Is retinitis pigmentosa progressive?");
        addBotMessage(
          "Yes, retinitis pigmentosa is a progressive disease, which means that the symptoms worsen over time."
        );
        
        break;
      default:
        addBotMessage("Sorry, I didn't understand that question.");
        break;
    }
  };

  const addMessage = (message, isUser = true) => {
    const newMessage = {
      message,
      isUser: isUser,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const addBotMessage = (message) => {
    addMessage(message, false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    addMessage(inputRef.current.value);
    inputRef.current.value = "";
  };

  useEffect(() => {
    setMessages([
      {
        message: "Hi, I'm RP Chatbot. I can answer your questions about retinitis pigmentosa.",
        isUser: false,
      },
    ]);
  }, []);

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

       
<div className='grid grid-rows-[auto,1fr,auto] bg-white w-72
 h-96 sm:w-96  sm:h-100  shadow-lg rounded-xl
  shadow-gray-600'>
  
  <div className='flex justify-between items-center bg-white w-full py-5 pl-4 h-4 border-gray-300 border-b rounded-t-xl justify-self-start'>
    <h1 className='text-base font-bold text-primary'>RP Chatbot</h1>
  </div>
  <div className='chat-body flex flex-col min-h-min'>
    <div className='overflow-y-auto'>
    {messages.map((message, index) => {
        if(!message.isUser){
            return (
                <div className='self-start overflow-auto max-w-xxs max-h-72'
                key={index}
                >
                <div className='bg-gray-300 p-2 rounded-xl my-2 ml-3 relative'>
                  <p className='text-sm text-gray-800'>
                    {message.message}
                  </p>
                  <div className='absolute w-0 h-0 border-l-8 border-t-8 border-r-8 border-b-0 border-gray-300 bottom-0 left-0'></div>
                </div>
              </div>
            )
        }
        else{
            return (
              <div className=' flex flex-col justify-end mr-3'>
                <div className='self-end overflow-auto max-w-xxs max-h-72 flex flex-col justify-end'
                key={index}
                >
                <div className='bg-primary p-2 rounded-xl mt-1 relative'>
                  <p className='text-sm text-white'>{message.message}</p>
                  <div className='absolute w-0 h-0 border-l-8 border-t-8 border-r-8 border-b-0 border-primary bottom-0 right-0'></div>
                </div>
              </div>
              </div>
            )
        }
    })}
    




    </div>
  </div>
  <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 w-11/12 h-min gap-1 mb-1 justify-items-center ml-2">
  <button
    className="text-sm text-gray-600  underline bg-border rounded-full p-1"
    onClick={() => handleQuestionClick(1)}
  >
    What is retinitis pigmentosa?
  </button>
  <button
    className="text-sm text-gray-600 underline bg-border rounded-full p-1"
    onClick={() => handleQuestionClick(2)}
  >
    What are the symptoms of retinitis pigmentosa?
  </button>
  <button
    className="text-sm text-gray-600
     underline bg-border rounded-full p-2"
    onClick={() => handleQuestionClick(3)}
  >
    Is retinitis pigmentosa progressive?
  </button>
  
</div>


  <div className='justify-self-end w-full flex flex-col; h-fit  items-center'>
      
    <input
      type='text'
      className='w-11/12 mb-1 h-10 px-4 mx-2 border-gray-300 border-2 rounded-full focus:outline-none focus:border-primary'
      placeholder='Type a message'
      ref={inputRef}
      onChange={(e) => setIsTyping(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSendMessage(e);
        }
      }}
    />
    {inputRef.current?.value && <SendIcon 
    onClick={(e) => handleSendMessage(e)}
    className='w-7 h-7 mr-2 self-center pb-1  cursor-pointer' />}
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
