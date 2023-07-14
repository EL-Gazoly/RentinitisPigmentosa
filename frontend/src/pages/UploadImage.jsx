
import Header from '../components/Header';
import Loading from '../components/Loading';
import 'react-toastify/dist/ReactToastify.css';
import {DoctorContext} from '../hooks/useDoctor';
import ResultCard from '../components/ResultCard';
import React, {useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import useProtectedPost from '../hooks/useProtectedPost';
import { ReactComponent as Corner } from '../assets/corner.svg';
import SegmentationResultsCard from '../components/SegmentationResultsCard';

import Pentagonal from '../components/Pentagonal';

import { motion, AnimatePresence} from 'framer-motion';

const DragAndDrop = ({isHighContrast}) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [Doctor, setDoctor] = useState(false);



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
    for(let i = 0; i < newFiles.length; i++) {
        if(newFiles[i].type.match(/image.*/)) { // check if file is an image
            setFiles([...files, newFiles[i]]);
        }
        else {
            toast.error('Only images are allowed');

        }
    }
    setIsDragging(false);
};
  const { execute, pending, data } = useProtectedPost();
  const { execute: executeSegmentation, pending: pendingSegmentation, data: dataSegmentation } = useProtectedPost();

  const handelupload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    execute('uploadImg', formData);

    setFiles([]);
  };

  const handelSegmentation = (e) => {
     e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    executeSegmentation('segmentation', formData);
    console.log(dataSegmentation)

    setFiles([]);
  };

  const { isDoctor } = useContext(DoctorContext);

useEffect(() => {

  setDoctor(isDoctor);
  
}, []);

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
   
      

    <div>
      {pending && <Loading isHighContrast={isHighContrast} data={data}/>}
      {pendingSegmentation && <Loading isHighContrast={isHighContrast} data={dataSegmentation}/>}
   
      <div
      
      
    style={{ backgroundColor: isDragging ? 'rgba(132, 110, 51, 0.7)' : 'transparent' }}
      onDrop={handleDropAnywhere}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className= "caret-transparent h-full"
    >
      <Header isHighContrast={isHighContrast} />
    <div
      className={`min-h-screen flex flex-row justify-between items-center  gap-10 mb-5 
      ${isHighContrast ? 'filter invert contrast-100' : ''}
      `}>
      
      <div className="left w-[1019px] h-[831px] bg-cover bg-[pentagonal] bg-no-repeat  z-50 flex  
      "> 
      <div className="flex flex-col justify-center
       items-center text-3xl md:text-5xl lg:text-6xl
       xl:text-[105px]  font-black font-nunito text-primary max-w-screen-xl
         px-6 
         mb-48
         ml-20

         ">
      Start <br/> Diagnosing
      </div>

      </div>

      <div className=' flex flex-col justify-center items-center gap-y-12
      mr-40
      mb-14
      '>
        <h1
        className='text-3xl  md:text-5xl lg:text-6xl xl:text-[57px] font-black font-nunito text-primary px-6 text-left'
        >Upload your images <br/> here </h1>
      <div
        className={`border-dashed border-2 border-primary mx-10 rounded-xxl p-4 text-center cursor-pointer flex flex-col
        ${!files.length > 0 && 'mb-48'}   
        `}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file" 
          multiple
          className="hidden py-"
          accept="image/*"
          onChange={handleFileInput}
        />
        <p className=" text-primary mb-2 justify-self-start">Drag and drop files anywhere, or click to select files</p>
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
        {files.length > 0 &&
          <div className={`flex flex-row justify-center text-white items-center font-bold font-nunito mb-40 text-sm 2xl:text-2xl md:text-xl 
          ${Doctor && 'gap-x-5    mt-4'}
          `}>
          <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handelupload}
          className={` bg-primary rounded-xl py-3 px-5 ${!Doctor && 'px-10 py-4' } `}>Start {Doctor ? <span>Classfication</span> : <span> Diagnosing </span> } 
          </motion.button>
          { Doctor && 
          <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          drag
            onClick={handelSegmentation}
          className=" bg-primary rounded-xl py-3 px-5">Start Segmentation 
          </motion.button>
          }

          </div>
          }
      </div>
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

      {data}
      <AnimatePresence>
        {data && <ResultCard isHighContrast={isHighContrast} result={data}/>}
        {dataSegmentation && <SegmentationResultsCard isHighContrast={isHighContrast} result={dataSegmentation}/>}

      </AnimatePresence>
      
      <ToastContainer />
    </div>
      {!isDragging && !pending && !pendingSegmentation ? <Pentagonal /> : null}
     
    </motion.div>
  );
};

export default DragAndDrop;
