import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { json } from 'react-router-dom';

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
        toast.success('Welcome Aboard!');
        updateData({ pending: false, data: response.data, error: undefined });
      }, 1000);
      })
      .catch(error => {
        setTimeout(() => {
          try {
            const { detail } = JSON.parse(error.request.response);
            const errorMessages = detail.map((err) => err.msg).join('\n');
            toast.error(errorMessages);
          } catch (e) {
            const err = JSON.parse(error.request.response);
            toast.error(err.detail);
          }
        updateData({ pending: false, data: undefined, error: error.message });
        console.log(error);
      }, 1000)
      });
  };

  return { execute, pending: Data.pending, data: Data.data, error: Data.error };
};

export default usePost;