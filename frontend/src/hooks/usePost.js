import { useState } from 'react';
import axios from 'axios';

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
        updateData({ pending: false, data: response.data, error: undefined });
      })
      .catch(error => {
        updateData({ pending: false, data: undefined, error: error.message });
        console.log(error);
      });
  };

  return { execute, pending: Data.pending, data: Data.data, error: Data.error };
};

export default usePost;