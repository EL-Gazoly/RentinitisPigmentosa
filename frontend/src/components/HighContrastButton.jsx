import {useState} from 'react'

const HighContrastButton = ({onToggle}) => {
    const [isToggle, setIsToggle] = useState(false)

    const toggle = () => {
        setIsToggle(!isToggle)
        onToggle()
    }
  return (
    <div className='fixed bottom-0 left-0 p-4 cursor-pointer'>
       <div
      className={`relative inline-block ${
        'bg-gray-400'
      } rounded-full w-12 h-6 transition-colors duration-300`}
      onClick={toggle}
    >
      <span
        className={`absolute ${
            isToggle ? 'translate-x-6' : 'translate-x-0'
        } left-0 top-0 bg-white w-6 h-6 rounded-full shadow-md transition-transform duration-300`}
      />
    </div>
        
      
    </div>
  )
}

export default HighContrastButton
