import React from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
  const AuthComponent = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        const cookies = document.cookie.split(';');
        const myCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
        const token = myCookie.split('=')[1];
      if (!token) {
        navigate('/login');
      }
    }, [navigate]);

    return <Component />;
  };

  return AuthComponent;
};

export default withAuth;
