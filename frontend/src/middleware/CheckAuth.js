import { useEffect, useState } from "react";



const CheckAuth = () => {
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        const cookies = document.cookie.split(';');
        const myCookie = cookies.find(cookie => cookie.trim().startsWith('Authorization='));
        const token = myCookie ? myCookie.split('=')[1] : undefined;
        if (token) {
            setAuth(true)
        }
    }, [])
    return auth    
}

export default CheckAuth
