import {React, useState, useEffect} from 'react'
import { motion } from 'framer-motion'

const Loading = ({isHighContrast, data}) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      data ? 
      setTimeout(() => {
        setLoading(false)
    }, 2500)
      : setLoading(true)
       

        return () => {
            clearTimeout()
        }
    }, [])
  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1, duration: 0.5}}
    exit={{opacity: 0}}
    className={`flex items-center justify-center h-screen
    ${isHighContrast ? 'filter invert contrast-100' : ''}
    `}>
    {loading ? (
      <div className="flex space-x-4">
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce" />
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce" />
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce" />
      </div>
    ) : (
      <h1 className="text-2xl font-bold text-primary">Loading complete!</h1>
    )}
  </motion.div>
  )
}

export default Loading
