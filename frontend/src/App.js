// import UploadImage from './components/UploadImage';



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HighContrastButton from './components/HighContrastButton';
import { useState, useEffect } from 'react';
import AnimatedRoutes from './components/AnimatedRoutes';

import { BrowserRouter as Router } from 'react-router-dom';


function App() {
    const [isHighContrast, setIsHighContrast] = useState(false);
    const onToggle = () => {
      setIsHighContrast(!isHighContrast);
      console.log(isHighContrast);
    }

    useEffect(() => {
      
    }, [isHighContrast]);
  

  return (
    <div className={`App w-full h-screen m-0 p-0 overflow-x-hidden  
    ${isHighContrast ? 'bg-invertedbg' : 'bg-bg'}
    
    `}>
      <Router>
        <AnimatedRoutes isHighContrast={isHighContrast} />
      </Router>

      <HighContrastButton onToggle={onToggle} />

      <ToastContainer />
      
   
    </div>
  );
}

export default App;
