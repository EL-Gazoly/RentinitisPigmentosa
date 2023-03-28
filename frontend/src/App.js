// import UploadImage from './components/UploadImage';
import Landing from './pages/Landing';
import DragAndDrop from './pages/UploadImage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App w-full h-screen m-0 p-0 overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<DragAndDrop />} />
        </Routes>
      </Router>
      
   
    </div>
  );
}

export default App;
