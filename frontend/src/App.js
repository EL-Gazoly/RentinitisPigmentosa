// import UploadImage from './components/UploadImage';
import Landing from './pages/Landing';
import DragAndDrop from './pages/UploadImage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App w-full h-screen m-0 p-0 overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<DragAndDrop />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
      
   
    </div>
  );
}

export default App;
