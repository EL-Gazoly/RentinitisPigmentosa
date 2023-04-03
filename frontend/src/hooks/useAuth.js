import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const withAuth = (Component) => {
  const AuthComponent = () => {
    const navigate = useNavigate();
    let flag = false;

    React.useEffect(() => {
      const cookies = document.cookie.split(';');
      const myCookie = cookies.find(cookie => cookie.trim().startsWith('Authorization='));

      const token = myCookie ? myCookie.split('=')[1] : undefined;
      if (!token) {
        navigate('/login')
        if (!flag) {
        toast.error('You must be logged in to vew this page')
        flag = true;
    }

      }
    }, [navigate]);

    return <Component />;
  };

  return AuthComponent;
};

export default withAuth;
