import {useState} from 'react'

const HighContrastButton = ({onToggle}) => {
    const [isToggle, setIsToggle] = useState(false)

    const toggle = () => {
        setIsToggle(!isToggle)
        onToggle()
    }
  return (
    <div className='fixed bottom-0 left-0 p-4 cursor-pointer'>
      <div className="relative inline-block w-16 h-8 bg-gray-400 rounded-full">
      <button
        className={`absolute left-0 top-0 w-8 h-8 bg-white rounded-full shadow-md transform transition-transform ease-in-out duration-300 ${
          isToggle ? "translate-x-full bg-green-500" : ""
        }`}
        onClick={() => toggle()}
      >
        
         <span className={`absolute right-0 top-0 h-full flex items-center px-2 text-xs font-bold text-gray-600 ${isToggle ? 'text-white pr-3' : ''}
          
        `}>
          {isToggle ? "N" : "HC"}
        </span>
      </button>
    </div>


    
        
      
    </div>
  )
}

export default HighContrastButton
