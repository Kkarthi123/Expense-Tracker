import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../pages/Layout'
import Dashboard from '../pages/Dashboard'
import Transactions from '../pages/Transactions'
import Error from '../pages/Error'
import Auth from '../pages/Auth'
import ProtectedRoute from '../components/Auth/ProtectedRoute'

function AppRoutes() {
  return (
     <Routes>
      <Route path='/' element={<Navigate to="/dashboard"/>} />

      {/* main routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/transactions' element={<Transactions />}/>
        </Route>
      </Route>

      {/* auth routes */}
      <Route element={<ProtectedRoute isAuthRoutes={true}/>}>
        <Route path='/auth'>
          <Route path='login' element={<Auth isLogin={true} />}/>
          <Route path='sign-up' element={<Auth />}/>
        </Route>
      </Route>

      {/* error route */}
      <Route element={<ProtectedRoute />}>
        <Route path='*' element={<Layout />}>
          <Route path='*' element={<Error />}/>
        </Route>
      </Route>
     </Routes>
  )
}

export default AppRoutes