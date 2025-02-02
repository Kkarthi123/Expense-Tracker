import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({isAuthRoutes=false}) => {

  const {isLoggedIn} = useAuthContext();

  if(isAuthRoutes){
    return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />
  }else{
    return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login"/>
  }

}

export default ProtectedRoute