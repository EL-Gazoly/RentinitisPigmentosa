import React, { useState } from 'react';
import Chatbot from '../components/Chatbot'
import { ReactComponent as Corner } from '../assets/corner.svg';
import { ReactComponent as WebsiteLogo } from '../assets/Logo.svg'
import { ReactComponent as BurgerIcon} from '../assets/burgerIcon.svg'
import { Link } from 'react-router-dom' 

const DragAndDrop = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...newFiles]);
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (file, e) => {
    e.stopPropagation();
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDropAnywhere = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...newFiles]);
    setIsDragging(false);
  };

  return (
    <div>
    <div
    style={{ backgroundColor: isDragging ? 'rgba(132, 110, 51, 0.7)' : 'transparent' }}
      onDrop={handleDropAnywhere}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className= "caret-transparent"
    >
      <div className="landing page-menu flex justify-between">
            <Link to="/" className="landing-page-menu-left flex">
                    <WebsiteLogo className=" w-16 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 md:ml-7 " />
                    <span className=' text-primary self-center font-sans font-bold text-base lg:text-xl '>RetinitisPigmentosa</span>
            </Link>
            <div className="landing-page-menu-right flex items-center mr-4 md:hidden" onClick={() => setIsCardVisible(!isCardVisible)}>
                <BurgerIcon/> 
            </div>
            <div className="landing-page-menu-right hidden mr-10 md:flex md:gap-3 lg:gap-10 self-center  items-center text-primary  font-roboto font-bold text-base lg:text-xl">
                <Link to="/" >Home</Link>
                <span >About US</span>
                <span>Contact</span>

                <button className=' w-20 h-12 lg:w-28 lg:h-14 rounded-xxl  bg-primary text-white font-roboto font-bold text-xl flex justify-center items-center '>Logout</button>
            </div>

          
          
        </div>
    
    <div
      className="min-h-screen flex flex-col justify-center items-center  gap-10 mb-5">

            
      <div className="flex flex-col justify-center items-center text-3xl  md:text-5xl lg:text-6xl xl:text-7xl sm:max-w-md md:max-w-4xl xl:max-w-5xl font-extrabold font-poppins text-primary max-w-screen-xl mx-auto px-6">
          Uplod your image to start the classification process
      </div>

      <div
        className="border-dashed border-2 border-primary mx-10 rounded-lg p-4 text-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInput}
        />
        <p className=" text-primary mb-2">Drag and drop files here, or click to select files</p>
        <div className="flex flex-wrap">
          {files.map((file) => (
            <div
              key={file.name}
              className="bg-gray-300 rounded-lg p-2 m-1 flex items-center"
            >
              <div className="mr-2">{file.name}</div>
              <button
                onClick={(e) => handleRemoveFile(file, e)}
                className="bg-red-500 text-white rounded-lg px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    
        <p className=" text-primary mt-4 mb-40 text-sm md:text-xl">Or drop files anywhere in the page to upload them</p>

    </div>

    </div>
    {isDragging && (
        <div>
          <Corner className=" left-9 top-9 absolute" />
          <Corner className=" right-9 top-9 absolute rotate-90" />
          <Corner className=" left-9 bottom-9 absolute rotate-270" />
          <Corner className=" right-9 bottom-9 absolute rotate-180" />

          <p className="text-white text-3xl md:text-4xl lg:text-6xl font-nunito font-extrabold absolute top-1/2 left-1/3 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2">Drop it anywhere</p>

        </div>
       
      )}
      <Chatbot/>
    </div>
  );
};

export default DragAndDrop;
