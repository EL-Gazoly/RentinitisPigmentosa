import {useState, useEffect} from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [data, setDta] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
         axios.get(url)
            .then(res => {
                if (!res.data) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
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
            
        }, 1000);
     }) // 1 second delay
        return {data, isPending, error};
}

export default useFetch;