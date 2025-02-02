import React, { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import sideBarLogo from '../assets/sidebar-logo.png';
import mainAnime from '../assets/auth-page-anime.svg'

const Auth = ({isLogin}) => {

  return (
    <>
        <div className='flex h-dvh'>
          <div className='w-[400px] relative pt-5 bg-gradient-to-bl from-[#1b3357] to-[#13233f] '>
            <div className='p-8 text-white relative z-10'>
              <span className='mb-4 inline-block'>
                   <img src={sideBarLogo} alt="logo" className="w-10 h-10" />
              </span>
              <h1 className='text-4xl font-bold mb-4'>Welcome to 
                <span className='text-[#3bcb88]'> Expense Tracker</span>
              </h1>
              <p className='text-md mb-4'>
                Track your expenses effortlessly. Manage your finances with ease and stay on top of your budget.
              </p>
              <p className='text-md mb-4'>
                Sign in or sign up to get started and take control of your financial future.
              </p>
            </div>
            <img className='absolute bottom-[20px] bg-cover bg-center opacity max-w-[100%] opacity-50' src={mainAnime} />
          </div>
           
          <div className='flex justify-center place-items-center flex-1'>
             {isLogin ? <SignIn /> : <SignUp />}
          </div>
        </div>
    </>
  )
}

export default Auth