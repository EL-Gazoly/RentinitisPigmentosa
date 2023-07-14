import React from 'react'
import Landing from '../pages/Landing';
import DragAndDrop from '../pages/UploadImage';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ForgotPassword from '../pages/ForgotPassword';
import Resources from '../pages/Resources';

import { useAuth } from '../hooks/useAuthContext';
import useUnAuthRoutes from '../hooks/useUnAuthRoutes';


import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = ({isHighContrast}) => {

    const location = useLocation();
    const { user } = useAuth();
  return (
    <div>
        <AnimatePresence>
          
          
                <Routes>
                  {user ?
                    <Route path="/" element={<DragAndDrop isHighContrast={isHighContrast}   />} />
                :    
                    <Route path="/" element={<Landing isHighContrast={isHighContrast} />} />
                
                }
                 <Route path="/signup" element={<SignUp isHighContrast={isHighContrast} />} />
                <Route path="/login" element={<Login  isHighContrast={isHighContrast} />} />
                <Route path="/about" element={<About isHighContrast={isHighContrast}  />} />
                <Route path="/contact" element={<Contact isHighContrast={isHighContrast}  />} />
                <Route path="/forgot-password" element={<ForgotPassword isHighContrast={isHighContrast} />} />
                <Route path="/resources" element={<Resources isHighContrast={isHighContrast}   />} />
                </Routes>
        
      </AnimatePresence>
      
    </div>
  )
}

export default AnimatedRoutes
