import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';

const Toast = ({message, isSuccess, duration, setToast}) => {

    const location = useLocation()

    useEffect(() => {
        const timer = setTimeout(() => {
          setToast(null);
        }, duration);
    
        return () => clearTimeout(timer);
      }, [duration]);


    return ReactDOM.createPortal(
        <div className={`${isSuccess ? "bg-[#e9ffed] text-[#339a46] border-[#6aa1745c]" : "bg-[#fff5f4] text-[#d33a3b] border-[#cb3b4057]"} rounded-[4px] min-w-[330px] py-[8px] px-[12px] border shadow toast-component select-none`}>
          <div onClick={()=>setToast(null)} className='absolute too-[5px] right-[10px] cursor-pointer'><i className="fa-solid fa-xmark"></i></div>
          <div className='flex gap-2 place-items-center'>
            <div className='text-[25px]'>
             <i className={`fa-solid ${isSuccess ? "fa-circle-check" : "fa-circle-xmark"}`}></i>
            </div>
            <div className='font-medium'>
               <div className='text-[16px]'>{isSuccess ? "Success!" : "Error!"}</div>
              <div className='text-sm'>{message}</div>
            </div>
          </div>
        </div>,
        document.getElementById('toast-root')
    );
};

export default Toast;