// import UploadImage from './components/UploadImage';
import Landing from './pages/Landing';
import DragAndDrop from './pages/UploadImage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import Resources from './pages/Resources';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HighContrastButton from './components/HighContrastButton';
import { useState, useEffect } from 'react';



function App() {
    const [isHighContrast, setIsHighContrast] = useState(false);
    const onToggle = () => {
      setIsHighContrast(!isHighContrast);
      console.log(isHighContrast);
    }

    useEffect(() => {
      
    }, [isHighContrast]);
  
const ProtectedRoute = useAuth(DragAndDrop);
  return (
    <div className={`App w-full h-screen m-0 p-0 overflow-x-hidden  
    ${isHighContrast ? 'bg-invertedbg' : 'bg-bg'}
    
    `}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing isHighContrast={isHighContrast} />} />
          <Route path="/upload" element={<ProtectedRoute  />} />
          <Route path="/signup" element={<SignUp isHighContrast={isHighContrast} />} />
          <Route path="/login" element={<Login  isHighContrast={isHighContrast} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </Router>

      <HighContrastButton onToggle={onToggle} />

      <ToastContainer />
      
   
    </div>
  );
}

export default App;
