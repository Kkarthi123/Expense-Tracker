import React from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const Layout = () => {

  const {isAppLoading} =useAuthContext()


  return (
    <>
    {
      isAppLoading ? (
        <div className='flex place-items-center justify-center h-[inherit] bg-[aliceblue]'>
          <div className='flex place-items-center flex-col'>
            <div className='w-[70px] h-[70px] flex place-items-center'>
               <div className="app-loader"></div>
            </div>
            <div className='mt-3 font-bold text-lg'>Expense Tracker is Loading...</div>
          </div>
        </div>
      ) : (
      <div id='expense-tracker-app-main-container' className='h-screen flex overflow-auto overflow-x-hidden'>
        <div className='expense-tracker-sidebar sticky top-0 z-[1]'>
            <SideBar />
        </div>
        <div className='expense-tracker-main-content flex-1'>
            <Outlet />
        </div>
       </div>
      )
    }
    
    </>
    
  )
}

export default Layout