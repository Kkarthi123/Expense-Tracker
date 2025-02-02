import React from 'react'

const Modal = ({children}) => {
  return (
    <div className='absolute inset-0 z-10 bg-[rgba(0,0,0,0.7)] backdrop-blur-[2px] flex place-items-center justify-center overflow-hidden'>
        {children}
    </div>
  )
}

export default Modal