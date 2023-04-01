import React, { useState } from 'react';
import Header from '../components/Header';
import usePost from '../hooks/usePost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ReactComponent as Corner } from '../assets/corner.svg';

const DragAndDrop = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

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
  const { execute, pending, data } = usePost();

  const handelupload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    axios.post('http://localhost:8000/api/uploadImg', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
        toast.success(response.data.message);
      })
      .catch(error => {
        const err = JSON.parse(error.request.response);
        toast.error(err.detail);
      });

    setFiles([]);
  };


  return (
    <div>
    <div
    style={{ backgroundColor: isDragging ? 'rgba(132, 110, 51, 0.7)' : 'transparent' }}
      onDrop={handleDropAnywhere}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className= "caret-transparent h-full"
    >
      <Header LoginOrLogout="Logout" />
    <div
      className="min-h-screen flex flex-col justify-center items-center  gap-10 mb-5">

            
      <div className="flex flex-col justify-center items-center text-3xl  md:text-5xl lg:text-6xl xl:text-7xl sm:max-w-md md:max-w-4xl xl:max-w-5xl font-extrabold font-poppins text-primary max-w-screen-xl mx-auto px-6">
          Uplod your image to start the classification process
      </div>

      <div
        className={`border-dashed border-2 border-primary mx-10 rounded-lg p-4 text-center cursor-pointer
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
        {files.length > 0 &&
        <button 
        onClick={handelupload}
        className=" text-white bg-primary font-bold font-nunito rounded-xl w-52 h-16 mt-4 mb-40 text-sm 2xl:text-2xl md:text-xl">Upload</button>
        }
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
      <ToastContainer />
    </div>
  );
};

export default DragAndDrop;
