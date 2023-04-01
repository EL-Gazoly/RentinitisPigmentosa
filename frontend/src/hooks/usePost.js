import {useState, useEffect} from 'react';
import axios from 'axios';

const usePost = (url, data) => {
    const [message, setMessage] = useState(null); // [data, setData
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
         axios.post(url, data)
            .then(res => {
                if (!res.data) {
                    throw Error('Could not post the data for that resource');
                }
                return res.json();
            })
            .then(Response => {

                setMessage(Response);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            }
            )
            
        }, 1000); // 1 second delay
     })
        return {message, isPending, error};
}
export default usePost;