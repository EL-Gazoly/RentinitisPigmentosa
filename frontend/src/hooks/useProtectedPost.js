import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useProtectedPost = () => {
    const [response, setResponse] = useState({
        pending: false,
        data: undefined,
        error: undefined,
    })
    const navigate = useNavigate();

    const execute = async (endpoint, data) => {
        setResponse({
            pending: true,
            data: undefined,
            error: undefined,
        })
        const cookies = document.cookie.split(';');
        const myCookie = cookies.find(cookie => cookie.trim().startsWith('Authorization='));
        const token = myCookie ? myCookie.split('=')[1] : undefined;

        return axios
            .post(`http://localhost:8000/api/${endpoint}`, data ,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                  }

            })
            .then(response => {
                setTimeout(() => {
                    if (endpoint === 'logout') {
                        toast.success('See you soon!')
                        document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        navigate('/login')
                    }
                    else if (endpoint === 'uploadImg') {
                        toast.success('Diagnosis  process completed successfully!')
                    }
                    setResponse({ pending: false, data: response.data, error: undefined })
                }, 3000)
            })
            .catch(error => {
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
                  setResponse({ pending: false, data: undefined, error: error.message });
                  console.log(error);
                }, 2300)
                
            })
            
    }
    return { execute, pending : response.pending, data: response.data, error: response.error}
        
}

export default useProtectedPost
