import React from 'react'
import { createContext, useContext, useState } from 'react'

export const authContext = createContext();
export const DoctorContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
}

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(false);

    return (
      <authContext.Provider value={{user, setUser }}>
        {children}
      </authContext.Provider>
    );
}

export default AuthProvider
