import React, { useState } from 'react';
import sidebarConfig from '../config/sidebarConfig';
import { Link, NavLink } from 'react-router-dom';
import sideBarLogo from '../assets/sidebar-logo.png';
import { useAuthContext } from '../context/AuthContext';
import userProfile from '../assets/user-profile.png';

const SideBar = () => {


  const {profileData, handleLogout} = useAuthContext();
  const [isEmailCopied, setIsEmailCopied] = useState(false)

  const copyEmailToClipBoard = ()=>{
    navigator.clipboard.writeText(profileData.email);
    setIsEmailCopied(true);

    setTimeout(()=>{
      setIsEmailCopied(false)
    }, 2000)
  }


  return (
    <div className="h-full exp-tracker-sidebar relative">
     <div className='py-4'>
        <div className='flex items-center justify-center pb-5'>
          <NavLink to='/' className='flex items-center'>
            <span>
              <img src={sideBarLogo} alt="logo" className="w-7 h-7 mx-auto opacity-85" />
            </span>
            <h1 className="text-white text-lg font-bold p-4">Expense Tracker</h1>
          </NavLink>
        </div>
        <ul>
          {sidebarConfig.map((item, index) => (
            <NavLink key={index} to={item.routeName} className="text-white side-bar-link">
              <li  className="p-4 text-white py-3 mb-3 mx-3 rounded-lg">
                <span>
                    <i className={item.iconClassName + ' side-bar-icon'}></i>
                    <span className="pl-2">{item.title}</span>
                </span>
              </li>
            </NavLink>
          ))}
        </ul>
     </div>
     <div className='absolute bottom-0 w-full sidebar-footer-profile-card bg-gray-800'>
        <div className='flex items-center justify-center py-5'>
          <div className='flex items-center text-slate-100 gap-x-2.5 w-11/12 p-1  bg-[#4e607952]	rounded-full select-none'>
             <div className='w-12 h-12 rounded-full bg-[#1f2937] flex items-center justify-center'>
                <img src={profileData?.profilePicture || userProfile} alt="profile" className="w-10 h-10 rounded-full mx-auto" referrerPolicy="no-referrer"/>
             </div>
             <div className='w-[65%]'>
                <div className="font-bold text-sm max-w-[170px] overflow-hidden text-ellipsis">{profileData?.name || "............"}</div>
                <div className='text-xs max-w-[170px] overflow-hidden text-ellipsis' title={profileData?.email}>{profileData?.email || "....................." }</div>
             </div>
             <div className='relative group px-1 pr-[10px]'>
                <div className='ml-auto cursor-pointer '>
                  <i className="fa fa-ellipsis-vertical"></i>
                </div>
                <div className='bg-white absolute bottom-[20px] text-gray-600 w-max rounded-md p-2 shadow-md border border-gray-200 opacity-0 group-hover:opacity-100 min-w-[130px]'>
                  <ul className='list-none text-sm'>
                    <li className={`my-[2px] hover:text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded ${isEmailCopied && "text-green-600 hover:text-green-600"}`} onClick={!isEmailCopied && copyEmailToClipBoard} ><i className="fa-regular fa-copy mr-1"></i>
                      {
                        !isEmailCopied ? "Copy email" : "Copied"
                      }
                    </li>
                    <li className=' hover:text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded' onClick={handleLogout} ><i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>Logout</li>
                  </ul>
                </div>
             </div>
          </div>
        </div>
     </div>
    </div>
  )
}

export default SideBar