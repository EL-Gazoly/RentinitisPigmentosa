import React,{useContext, useState, createContext} from 'react'

export const DoctorContext = createContext()

export default function useIsDoctor() {
    return useContext(DoctorContext)
}

export const useDoctor = ({children}) => {
    const [isDoctor, setIsDoctor] = useState(false)
  return (
    <DoctorContext.Provider value={{isDoctor, setIsDoctor}}>
        {children}
    </DoctorContext.Provider>
  )
}

