import React, { useState, createContext } from 'react';



export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [isDoctor, setIsDoctor] = useState(false);

  return (
    <DoctorContext.Provider value={{ isDoctor, setIsDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};
