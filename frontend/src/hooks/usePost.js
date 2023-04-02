import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const usePost = () => {
  const [Data, updateData] = useState({
    pending: false,
    data: undefined,
    error: undefined,
  });

  const execute = async (endpoint, Data ) => {
    updateData({
      pending: true,
      data: undefined,
      error: undefined,
    });
    return axios
      .post(`http://localhost:8000/api/${endpoint}`, { ...Data })

      .then(response => {
        setTimeout(() => {

        if(endpoint === 'signup'){
        toast.success('Welcome Aboard!', {
          autoClose: 1000,
        });

        document.cookie = `Authorization=${response.data}; path=/; max-age=7400`;

        } 

        else if(endpoint === 'login'){
        console.log(response.data.access_token);
        toast.success('Welcome Back!');
        
        document.cookie = `Authorization=${response.data.access_token}; path=/; max-age=7400`;
        }

        else if(endpoint === 'logout'){
        toast.success('See you soon!');
        }

        else if(endpoint === 'contact_us'){
        toast.success('Thank you for contacting us!', {
          autoClose: 3000,
        });
        }

        toast.success(response.data.message, {
          autoClose: 1000,
          }); 
        updateData({ pending: false, data: response.data, error: undefined });
      }, 2300);
      })



      .catch(error => {
        document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setTimeout(() => {
          try {
            const { detail } = JSON.parse(error.request.response);
            const errorMessages = detail.map((err) => err.msg);
            errorMessages.forEach((err) => toast.error(err));
            toast.error(errorMessages,{
              autoClose: 5000,
            });
            
          } catch (e) {
            const err = JSON.parse(error.request.response);
            toast.error(err.detail);
          }
        updateData({ pending: false, data: undefined, error: error.message });
        console.log(error);
      }, 2300)
      });
  };

  return { execute, pending: Data.pending, data: Data.data, error: Data.error };
};

export default usePost;