// import UploadImage from './components/UploadImage';
import Landing from './pages/Landing';
import DragAndDrop from './pages/UploadImage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
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
        </Routes>
      </Router>
      
   
    </div>
  );
}

export default App;
