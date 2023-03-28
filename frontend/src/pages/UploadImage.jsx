import React, { useState } from 'react';
import { ReactComponent as Corner } from '../assets/corner.svg';
import { ReactComponent as WebsiteLogo } from '../assets/Logo.svg'
import { ReactComponent as BurgerIcon} from '../assets/burgerIcon.svg'

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
            <div className="landing-page-menu-left flex">
                    <WebsiteLogo className=" w-16 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 md:ml-7 " />
                    <span className=' text-primary self-center font-sans font-bold text-base lg:text-xl '>RetinitisPigmentosa</span>
            </div>
            <div className="landing-page-menu-right flex items-center mr-4 md:hidden" onClick={() => setIsCardVisible(!isCardVisible)}>
                <BurgerIcon/> 
            </div>
            <div className="landing-page-menu-right hidden mr-10 md:flex md:gap-3 lg:gap-10 self-center  items-center text-primary  font-roboto font-bold text-base lg:text-xl">
                <span >Home</span>
                <span >Services</span>
                <span >About US</span>
                <span>Contact</span>

                <button className=' w-20 h-12 lg:w-28 lg:h-14 rounded-2xl  bg-primary text-white font-roboto font-bold text-xl flex justify-center items-center '>Login</button>
            </div>

          
          
        </div>
    
    <div
      className="min-h-screen flex flex-col justify-center items-center  gap-10 mb-5">

            
   
      <div className="flex flex-col justify-center items-center text-7xl font-extrabold font-poppins text-primary max-w-5xl">
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
    
        <p className=" text-primary mt-4 mb-40">Or drop files anywhere in the page to upload them</p>

    </div>

    </div>
    {isDragging && (
        <div>
          <Corner className=" left-9 top-9 absolute" />
          <Corner className=" right-9 top-9 absolute rotate-90" />
          <Corner className=" left-9 bottom-9 absolute rotate-270" />
          <Corner className=" right-9 bottom-9 absolute rotate-180" />

           <p className="text-white text-7xl font-nunito font-extrabold absolute top-1/2 left-1/3 ">Drop it anywhere</p>
        </div>
       
      )}
    </div>
  );
};

export default DragAndDrop;