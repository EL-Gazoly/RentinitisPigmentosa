import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckAuth from '../middleware/CheckAuth';
import { toast } from 'react-toastify';

const withAuth = (Component) => {
  const AuthComponent = () => {
    const navigate = useNavigate();
    let flag = false;

    const { auth } = CheckAuth();
    React.useEffect(() => {
      if (!auth) {
        if (!flag) {
        toast.error('You are not authorized to access this page');
        flag = true;
        }
        navigate('/login');
      }
    }, [auth, navigate]);


    return <Component />;
  };

  return AuthComponent;
};

export default withAuth;
