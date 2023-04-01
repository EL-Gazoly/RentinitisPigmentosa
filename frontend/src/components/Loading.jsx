import {React, useState, useEffect} from 'react'


const Loading = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)

        return () => {
            clearTimeout()
        }
    }, [])
  return (
    <div className="flex items-center justify-center h-screen">
    {loading ? (
      <div className="flex space-x-4">
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce" />
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce" />
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce" />
      </div>
    ) : (
      <h1 className="text-2xl font-bold text-primary">Loading complete!</h1>
    )}
  </div>
  )
}

export default Loading
