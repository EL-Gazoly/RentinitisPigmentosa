import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './useAuthContext'
const useUnAuthRoutes = () => {
    const { user } = useAuth(); 
    
  return <Navigate to={user ? '/' : '/login'} />;
}

export default useUnAuthRoutes
